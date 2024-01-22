import alertIcon from "@/assets/alert-triangle-red.svg";
import arrowDown from "@/assets/arrow-down.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { AppButton } from "@/pages/Homepage";
import {
  setCloseModalRemoveLiquidity,
  setOpenModal,
} from "@/redux/slice/modalSlice";
import { Strategies, StrategiesAPI } from "@/services";
import {
  calculateValue,
  calculateValueWithDecimals,
  convertValueToDecimals,
  formatNumberWithDecimal,
  formatToLocaleString,
  getProtocolNameAndFunc,
  getTokenInfo,
  getTokenPrice,
  keepNumericAndDecimal,
} from "@/utils/functions";
import { ITokenInfo } from "@/utils/utils.type";
import { ViewRequest } from "@aptos-labs/ts-sdk";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import {
  Box,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightAddon,
  Skeleton,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikErrors, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import { useAptos } from "../AptosContext";
import { CartSider } from "../card";
import { ToastModal } from "../toast";

interface FormValues {
  amount: string;
}
interface prop {
  title?: boolean;
  strategies?: Strategies;
}
const moduleAddress = import.meta.env.VITE_APP_MODULE_ADDRESS;

export const FormRemoveLiquidity = ({ title = true, strategies }: prop) => {
  const [nextStep, setNextStep] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const aptos = useAptos();
  const intl = useIntl();
  const { modalRemoveLiquidity } = useAppSelector((state) => state.modal);

  const tokenInfoResult = () => {
    if (strategies) {
      return (
        strategies?.positionToken && getTokenInfo(strategies?.positionToken)
      );
    }
    return (
      modalRemoveLiquidity?.strategies?.positionToken &&
      getTokenInfo(modalRemoveLiquidity?.strategies?.positionToken)
    );
  };

  const protocolResult = () => {
    if (strategies) {
      return (
        strategies?.protocols &&
        strategies?.protocols[0] &&
        getProtocolNameAndFunc(strategies.protocols[0]!)
      );
    }
    return (
      modalRemoveLiquidity?.strategies?.protocols &&
      modalRemoveLiquidity?.strategies?.protocols[0] &&
      getProtocolNameAndFunc(modalRemoveLiquidity.strategies.protocols[0]!)
    );
  };
  const protocol = protocolResult();

  const tokenInfo: ITokenInfo | undefined = tokenInfoResult();
  const inputToken =
    modalRemoveLiquidity?.strategies?.poolType &&
    getTokenInfo(modalRemoveLiquidity?.strategies?.poolType);
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [loading, setLoading] = useState<boolean>(true);
  const [availableBalance, setAvailableBalance] = useState<number | string>(0);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [dailyWithdraw, setDailyWithdraw] = useState<string>("");
  const [withdrawn, setWithdrawn] = useState<string>("");
  const [withdrawable, setWithdrawable] = useState<string>("");
  const inputTokenPrice = getTokenPrice(
    modalRemoveLiquidity?.strategies?.poolType ?? "",
  );

  const validationSchema = Yup.object().shape({
    amount: Yup.string()
      .required("Amount is required")
      .test("validateAmount", (value, { createError }) => {
        if (Number(value) <= 0) {
          return createError({ message: "Amount must be greater than 0" });
        } else if (Number(value) > Number(availableBalance)) {
          return createError({ message: "Account has insufficient funds" });
        }

        return true;
      }),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      amount: "",
    },
    onSubmit: () => {},
    validationSchema: validationSchema,
  });
  const handleClickMaxOrHaft = (
    div: number,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined,
    ) => Promise<void | FormikErrors<{
      amount: string;
    }>>,
  ) => {
    setFieldValue(
      "amount",
      formatNumberWithDecimal(
        div === 1
          ? String(Number(withdrawable) / div)
          : String(Number(withdrawable) / div),
        tokenInfo?.decimals,
      ),
    );
  };

  const removeLiquidityPool = async (amount: number) => {
    if (!account) return [];
    const value = convertValueToDecimals(amount, tokenInfo?.decimals);
    const protocol = getProtocolNameAndFunc(
      modalRemoveLiquidity.strategies.protocols[0]!,
    );
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::${protocol.protocol}::${protocol.funcUnstake}`,
        functionArguments: [value],
      },
    };

    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      dispatch(setCloseModalRemoveLiquidity());
      const result = await aptos.waitForTransaction({
        transactionHash: response.hash,
      });
      toast({
        position: "top-right",
        render: () => (
          <ToastModal
            toast={toast}
            title="Transaction created."
            content="View transaction"
            link={`https://explorer.aptoslabs.com/txn/${result.version}?network=mainnet`}
          />
        ),
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (account?.address && tokenInfo?.token_type?.type && protocol) {
      (async () => {
        const payload: ViewRequest = {
          function: `${moduleAddress}::${protocol.protocol}::${protocol.funcUserPosition}`,
          typeArguments: [],
          functionArguments: [account.address],
        };
        const position = await aptos.view({ payload });
        const tokenPrice = getTokenPrice(tokenInfo.token_type.type ?? "");
        const balance = calculateValueWithDecimals(
          Number(position[0]!),
          tokenInfo?.decimals ?? 6,
        );
        const { data } = await StrategiesAPI.getWithdrawInfo(account?.address);
        setDailyWithdraw(
          formatNumberWithDecimal(
            calculateValueWithDecimals(
              data.data.withdraw_limit,
              tokenInfo?.decimals ?? 6,
            ),
            tokenInfo?.decimals,
          ),
        );
        setWithdrawn(
          formatNumberWithDecimal(
            calculateValueWithDecimals(
              data.data.withdraw_amount,
              tokenInfo?.decimals ?? 6,
            ),
            tokenInfo?.decimals,
          ),
        );
        setWithdrawable(
          formatNumberWithDecimal(
            String(
              Number(
                calculateValueWithDecimals(
                  data.data.withdraw_limit,
                  tokenInfo?.decimals ?? 6,
                ),
              ) -
                Number(
                  calculateValueWithDecimals(
                    data.data.withdraw_amount,
                    tokenInfo?.decimals ?? 6,
                  ),
                ),
            ),
            tokenInfo?.decimals,
          ),
        );
        setAvailableBalance(balance);
        setCurrentPrice(Number(tokenPrice));
        setLoading(false);
      })();
    }
  }, [account?.address, tokenInfo?.token_type?.type]);

  return (
    <>
      {title && (
        <Box className="text-[24px] font-medium text-primary-500 leading-[32px]">
          {intl.formatMessage({
            id: nextStep ? "modal.confirm_withdraw" : "modal.withdraw",
          })}
        </Box>
      )}
      {nextStep ? (
        ""
      ) : (
        <Flex
          gap={3}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          padding={4}
          className="bg-yellow-50 border-amber-200 border-solid border-[1px] rounded-[12px] my-3"
        >
          <img
            className="w-5 h-5 !stroke-amber-600 stroke-[1px]"
            src={alertIcon}
          />
          <Box className="text-[14px] font-normal text-amber-600">
            {intl.formatMessage({ id: "modal.warning_add_liquidity" })}
          </Box>
        </Flex>
      )}
      <Box>
        {nextStep ? (
          ""
        ) : (
          <>
            <Grid
              templateColumns="repeat(3, 1fr)"
              className="text-neutralGray-500 font-medium"
              marginBottom={4}
            >
              <GridItem
                position={"relative"}
                _after={{
                  content: '""',
                  position: "absolute",
                  width: "1px",
                  height: "29px",
                  backgroundColor: "#EAECF0",
                  right: "0",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <Flex justifyContent={"start"}>
                  <Box>
                    <Box>
                      {intl.formatMessage({ id: "modal.daily_withdraw" })}
                    </Box>
                    <Box className="text-neutralGray-700 font-bold">
                      {dailyWithdraw}
                    </Box>
                  </Box>
                </Flex>
              </GridItem>
              <GridItem
                position={"relative"}
                _after={{
                  content: '""',
                  position: "absolute",
                  width: "1px",
                  height: "29px",
                  backgroundColor: "#EAECF0",
                  right: "0",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <Flex justifyContent={"center"}>
                  <Box>
                    <Box>{intl.formatMessage({ id: "modal.withdrawn" })}</Box>
                    <Box className="text-neutralGray-700 font-bold">
                      {withdrawn}
                    </Box>
                  </Box>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex justifyContent={"center"}>
                  <Box>
                    <Box>
                      {intl.formatMessage({ id: "modal.withdrawable" })}
                    </Box>
                    <Box className="text-neutralGray-700 font-bold">
                      {withdrawable}
                    </Box>
                  </Box>
                </Flex>
              </GridItem>
            </Grid>
            <CartSider
              onChange={(e) =>
                handleClickMaxOrHaft(100 / e, formik.setFieldValue)
              }
            />
          </>
        )}
        <Formik
          initialValues={formik.initialValues}
          onSubmit={formik.submitForm}
        >
          <Form>
            <VStack
              spacing={4}
              align="flex-start"
              className="font-medium text-primary-400"
            >
              {nextStep ? (
                <Flex
                  gap={3}
                  flexDirection={"column"}
                  className="w-full relative"
                >
                  <Box
                    className="bg-neutralGray-50 border-neutralGray-200 border-solid border-[1px] w-full rounded-[16px]"
                    padding={4}
                  >
                    <Box className="mb-1">
                      {intl.formatMessage({ id: "modal.input_amount" })}
                    </Box>
                    <Flex gap={"4px"} alignItems={"center"}>
                      <img
                        src={tokenInfo?.logo_url ?? ""}
                        className="w-5 h-5"
                      />
                      <Box className="font-medium text-primary-500">
                        {`${formik.values.amount} ${tokenInfo?.official_symbol}`}
                      </Box>
                      <Flex
                        justifyContent={"flex-end"}
                        className="text-neutralGray-400"
                      >
                        ~$
                        {formatToLocaleString(
                          calculateValue(
                            formik.values.amount ? formik.values.amount : 0,
                            currentPrice,
                          ),
                          4,
                        )}
                      </Flex>
                    </Flex>
                  </Box>
                  <Box className="absolute top-[50%] translate-y-[-50%] left-[calc(50%-32px)]">
                    <img src={arrowDown} alt="arrow" />
                  </Box>
                  <Box
                    className="bg-neutralGray-50 border-neutralGray-200 border-solid border-[1px] w-full rounded-[16px]"
                    padding={4}
                  >
                    <Box className="mb-1">
                      {intl.formatMessage({ id: "modal.output_amount" })}
                    </Box>
                    <Flex gap={"4px"} alignItems={"center"}>
                      <img src={inputToken?.logo_url} className="w-5 h-5" />
                      <Box className="font-medium text-primary-500">
                        {`${formatToLocaleString(
                          Number(
                            calculateValue(
                              formik.values.amount ? formik.values.amount : 0,
                              currentPrice,
                            ),
                          ) / Number(inputTokenPrice),
                          4,
                        )} ${inputToken?.official_symbol}`}
                      </Box>
                      <Flex
                        justifyContent={"flex-end"}
                        className="text-neutralGray-400"
                      >
                        ~$
                        {formatToLocaleString(
                          calculateValue(
                            formik.values.amount ? formik.values.amount : 0,
                            currentPrice,
                          ),
                          4,
                        )}
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              ) : (
                <Box className="w-full">
                  <Box className="text-neutralGray-600">
                    {intl.formatMessage({ id: "modal.your_asset" })}
                  </Box>
                  <Box className="p-3 rounded-[16px] border-[1px] border-solid border-primary-300 w-full flex flex-col gap-4 bg-primary-50">
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Flex gap={1}>
                        <AppButton
                          onClick={() =>
                            handleClickMaxOrHaft(1, formik.setFieldValue)
                          }
                          className="!py-[2px] px-2  !h-auto !text-primary-600 !bg-blue-200"
                        >
                          Max
                        </AppButton>
                        <AppButton
                          onClick={() =>
                            handleClickMaxOrHaft(2, formik.setFieldValue)
                          }
                          className="!py-[2px] px-2  !h-auto !text-primary-600 !bg-blue-200"
                        >
                          Half
                        </AppButton>
                      </Flex>
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Flex
                          alignItems={"center"}
                          gap={1}
                          className="text-neutralGray-400"
                        >
                          <Box>
                            {intl.formatMessage({
                              id: "modal.total_available",
                            })}
                          </Box>
                          {!connected ? (
                            "-"
                          ) : loading ? (
                            <Skeleton height={"10px"} width={"20px"} />
                          ) : (
                            <Box>{availableBalance}</Box>
                          )}
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex alignItems={"center"} gap={"8px"}>
                      <FormControl
                        isInvalid={
                          !!formik.errors?.amount && formik.touched?.amount
                        }
                      >
                        <InputGroup>
                          <Field
                            as={Input}
                            id="amount"
                            name="amount"
                            type="text"
                            placeholder="0"
                            className="!text-[24px] !text-primary-500 !outline-none !border-none !rounded-full hover:!border-none  focus-visible:!border-none focus-visible:!shadow-none !shadow-none"
                            value={formik.values.amount}
                            disabled={!connected}
                            validate={(value: string) => {
                              let error;

                              if (Number(value) > Number(availableBalance)) {
                                error = "account has insufficient funds";
                              } else if (Number(value) <= 0) {
                                error = "amount invalid";
                              }

                              return error;
                            }}
                            autoComplete="off"
                            onChange={(e: React.ChangeEvent<any>) => {
                              const amount = formatNumberWithDecimal(
                                keepNumericAndDecimal(e.target.value),
                                tokenInfo?.decimals ?? 6,
                              );
                              formik.setFieldValue("amount", amount);
                            }}
                          />
                          <InputRightAddon className="!border-none !bg-[transparent] !p-0">
                            <Flex gap={"4px"}>
                              <Flex
                                justifyContent={"flex-end"}
                                className="text-neutralGray-400"
                              >
                                ~$
                                {formatToLocaleString(
                                  calculateValue(
                                    formik.values.amount
                                      ? formik.values.amount
                                      : 0,
                                    currentPrice,
                                  ),
                                  4,
                                )}
                              </Flex>
                              <img
                                src={tokenInfo?.logo_url ?? ""}
                                className="w-5 h-5"
                              />
                              <Box className="font-medium text-primary-500">
                                {tokenInfo?.official_symbol}
                              </Box>
                            </Flex>
                          </InputRightAddon>
                        </InputGroup>
                        {formik.errors.amount && (
                          <span className="text-primaryRed text-[12px]">
                            {formik.errors.amount}
                          </span>
                        )}
                      </FormControl>
                    </Flex>
                  </Box>
                </Box>
              )}
              {nextStep ? (
                <Flex flexDirection={"column"} gap={4} className="w-full">
                  <Flex justifyContent={"space-between"} className="w-full">
                    <Box>
                      {intl.formatMessage({ id: "modal.exchange_rate" })}
                    </Box>
                    <Box className="font-semibold text-primary-500">{`1 ${tokenInfo?.official_symbol} = ${formatToLocaleString(
                      Number(currentPrice) / Number(inputTokenPrice),
                      4,
                    )} ${inputToken?.official_symbol}`}</Box>
                  </Flex>
                  <Flex justifyContent={"space-between"} className="w-full">
                    <Box>{intl.formatMessage({ id: "modal.apr" })}</Box>
                    <Box className="font-semibold text-primary-500">
                      {formatToLocaleString(
                        modalRemoveLiquidity?.strategies?.apr ?? "",
                        2,
                      )}
                      %
                    </Box>
                  </Flex>
                </Flex>
              ) : (
                ""
              )}
              {nextStep ? (
                <AppButton
                  width="full"
                  className="!bg-blue-500 !text-white"
                  isDisabled={!(formik.isValid && formik.dirty)}
                  onClick={() =>
                    removeLiquidityPool(Number(formik.values.amount))
                  }
                >
                  {intl.formatMessage({ id: "modal.confirm" })}
                </AppButton>
              ) : connected ? (
                <AppButton
                  width="full"
                  className="!bg-blue-500 !text-white"
                  isDisabled={!(formik.isValid && formik.dirty)}
                  onClick={() => setNextStep(true)}
                >
                  {intl.formatMessage({ id: "modal.supply" })}
                </AppButton>
              ) : (
                <AppButton
                  width="full"
                  className="!bg-blue-500 !text-white"
                  onClick={() => dispatch(setOpenModal())}
                >
                  {intl.formatMessage({ id: "modal.connect_wallet" })}
                </AppButton>
              )}
            </VStack>
          </Form>
        </Formik>
      </Box>
    </>
  );
};
