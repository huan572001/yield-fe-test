import alertIcon from "@/assets/alert-triangle-red.svg";
import liquidSwapIcon from "@/assets/liquidswap.svg";
import thalaIcon from "@/assets/thala-logo.svg";
import { cached } from "@/assets/tokenPage";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { AppButton } from "@/pages/Homepage";
import { setCloseModalUnstake, setOpenModal } from "@/redux/slice/modalSlice";
import { Strategies } from "@/services";
import {
  addBigNumbers,
  calculateValue,
  calculateValueWithDecimals,
  convertValueToDecimals,
  formatNumberWithDecimal,
  formatToLocaleString,
  getProtocolNameAndFunc,
  getTokenInfo,
  getTokenPrice,
  keepNumericAndDecimal,
  multiplyBigNumbers,
} from "@/utils/functions";
import { ITokenInfo } from "@/utils/utils.type";
import { ViewRequest } from "@aptos-labs/ts-sdk";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  FormControl,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  Skeleton,
  VStack,
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikErrors, useFormik } from "formik";
import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import SVG from "react-inlinesvg";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import { useAptos } from "../AptosContext";
import { CartSider } from "../card";
import { RadioCard } from "../radio";
import { ToastModal } from "../toast";

interface FormValues {
  amount: string;
  slipPage: string;
}

interface prop {
  title?: boolean;
  strategies?: Strategies;
}
const moduleAddress = import.meta.env.VITE_APP_MODULE_ADDRESS;

export const FormUnStakePool = ({ title = true, strategies }: prop) => {
  // const [nextStep, setNextStep] = useState<boolean>(false);
  const dataSlipPage = ["0.5", "1", "2", "5"];
  const toast = useToast();
  const aptos = useAptos();
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { modalUnstake } = useAppSelector((state) => state.modal);

  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [loading, setLoading] = useState<boolean>(true);
  const [availableBalance, setAvailableBalance] = useState<number | string>(0);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [dataStrategies, setDataStrategies] = useState<
    Strategies | undefined
  >();
  const protocolResult = () => {
    if (strategies) {
      return (
        strategies?.protocols &&
        strategies?.protocols[0] &&
        getProtocolNameAndFunc(strategies.protocols[0]!)
      );
    }
    return (
      modalUnstake?.strategies?.protocols &&
      modalUnstake?.strategies?.protocols[0] &&
      getProtocolNameAndFunc(modalUnstake.strategies.protocols[0]!)
    );
  };
  const protocol = protocolResult();

  const tokenInfoResult = () => {
    if (strategies) {
      return (
        strategies?.positionToken &&
        getTokenInfo(strategies?.positionToken ?? "")
      );
    }
    return (
      modalUnstake?.strategies?.positionToken &&
      getTokenInfo(modalUnstake?.strategies?.positionToken ?? "")
    );
  };
  const tokenInfo: ITokenInfo | undefined = tokenInfoResult();

  const getSlipPageWithProtocol = () => {
    if (protocol) {
      switch (protocol.protocol.toLocaleLowerCase()) {
        case "amnis":
          return "2";
        case "thala_lsd":
          return "0.5";
        default:
          return "1";
      }
    }
  };

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
    // slipPage: Yup.string().required("Slippage is required"),
    slipPage: Yup.string().test(
      "validateSlippage",
      (value, { createError }) => {
        if (!value && !!Number(dataStrategies?.withdrawalSwapFee)) {
          return createError({ message: "Slippage is required" });
        }
        return true;
      },
    ),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      amount: "",
      slipPage: getSlipPageWithProtocol() ?? "1",
    },
    onSubmit: () => {},
    validationSchema: validationSchema,
  });

  const feePool = String(
    Number(
      addBigNumbers(
        dataStrategies?.withdrawalSwapFee || "",
        dataStrategies?.withdrawalFee || "",
        formik.values?.slipPage,
      ),
    ) / 100,
  );

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "slipPage",
    defaultValue: getSlipPageWithProtocol(),
    onChange: (value) => formik.setFieldValue("slipPage", value),
  });
  const group = getRootProps();

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
        String(Number(availableBalance) / div),
        tokenInfo?.decimals,
      ),
    );
  };

  const unstakePool = async (amount: number) => {
    if (!account || !protocol) return [];
    const value = convertValueToDecimals(amount, tokenInfo?.decimals);
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::${protocol.protocol}::${protocol.funcUnstake}`,
        functionArguments: [value, Number(formik.values.slipPage) * 100],
        typeArguments: [],
      },
    };

    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      dispatch(setCloseModalUnstake());
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
    if (strategies) {
      setDataStrategies(strategies);
    } else {
      setDataStrategies(modalUnstake?.strategies);
    }
  }, [strategies]);

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
        setAvailableBalance(balance);
        setCurrentPrice(Number(tokenPrice));
        setLoading(false);
      })();
    }
  }, [account?.address, tokenInfo?.token_type?.type, protocol]);

  return (
    <>
      {title && (
        <Box className="text-[24px] font-medium text-primary-500 leading-[32px]">
          {intl.formatMessage({ id: "modal.unstake" })}
        </Box>
      )}

      <Flex
        gap={3}
        justifyContent={"flex-start"}
        alignItems={"center"}
        padding={4}
        className="bg-yellow-50 border-amber-200 border-solid border-[1px] rounded-[12px] my-3"
      >
        <SVG className="!stroke-amber-600 stroke-[1px]" src={alertIcon} />
        <Box className="text-[14px] font-normal text-amber-600">
          {intl.formatMessage({ id: "modal.instant_withdrawal" })}
        </Box>
      </Flex>
      <Box>
        <CartSider
          onChange={(e) => handleClickMaxOrHaft(100 / e, formik.setFieldValue)}
        />
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
              <Box className="w-full">
                <Box className="text-neutralGray-600">
                  {intl.formatMessage({ id: "modal.your_asset" })}
                </Box>
                <Box className="p-3 rounded-[16px] border-[1px] border-solid border-primary-300 w-full flex flex-col gap-4 bg-primary-50">
                  <Flex justifyContent={"end"} alignItems={"center"}>
                    <Flex
                      alignItems={"center"}
                      gap={1}
                      className="text-neutralGray-400"
                    >
                      <Box>{intl.formatMessage({ id: "modal.available" })}</Box>
                      {!connected ? (
                        "-"
                      ) : loading ? (
                        <Skeleton height={"10px"} width={"20px"} />
                      ) : (
                        <Box>{availableBalance}</Box>
                      )}
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
                          className="!text-[24px] !text-neutralGray-700 !outline-none !border-none !rounded-full hover:!border-none  focus-visible:!border-none focus-visible:!shadow-none !shadow-none"
                          value={formik.values.amount}
                          onChange={(e: React.ChangeEvent<any>) => {
                            const amount = formatNumberWithDecimal(
                              keepNumericAndDecimal(e.target.value),
                              tokenInfo?.decimals ?? 6,
                            );
                            formik.setFieldValue("amount", amount);
                          }}
                          disabled={!connected}
                          autoComplete="off"
                        />
                        <InputRightAddon className="!border-none !bg-[transparent] !p-0">
                          <Flex gap={"4px"} alignItems="center">
                            <Flex justifyContent={"flex-end"}>
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
                              {tokenInfo?.symbol}
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
                <Flex
                  flexDirection={"column"}
                  gap={"10px"}
                  paddingTop={"10px"}
                  className="text-neutralGray-500"
                >
                  {Number(dataStrategies?.withdrawalSwapFee || "") ? (
                    <Flex justifyContent={"space-between"}>
                      <Box>{intl.formatMessage({ id: "modal.swap_via" })}</Box>
                      <Box className="font-semibold flex gap-2 items-center">
                        {protocol &&
                        protocol.protocol.toLocaleLowerCase() === "amnis"
                          ? intl.formatMessage({ id: "modal.liquidswap" })
                          : intl.formatMessage({ id: "modal.thala" })}
                        <SVG
                          src={
                            protocol &&
                            protocol.protocol.toLocaleLowerCase() === "amnis"
                              ? liquidSwapIcon
                              : thalaIcon
                          }
                          width={"24px"}
                          height={"24px"}
                        />
                      </Box>
                    </Flex>
                  ) : (
                    ""
                  )}
                  {Number(dataStrategies?.withdrawalSwapFee) ? (
                    <Flex justifyContent={"space-between"}>
                      <Box>
                        {intl.formatMessage({ id: "modal.max_slippage" })}
                      </Box>
                      <Box className="flex items-center gap-0.5">
                        <Box className="font-semibold text-primary-500">
                          {formik.values.slipPage}%
                        </Box>
                        <SVG src={cached} />
                      </Box>
                    </Flex>
                  ) : (
                    ""
                  )}
                  {Number(feePool) ? (
                    <Flex justifyContent={"space-between"}>
                      <Box>{intl.formatMessage({ id: "modal.fee" })}</Box>
                      <Box className="font-semibold text-primary-500">
                        $
                        {formatToLocaleString(
                          calculateValue(
                            multiplyBigNumbers(formik.values.amount, feePool),
                            currentPrice,
                          ),
                          4,
                        )}
                      </Box>
                    </Flex>
                  ) : (
                    ""
                  )}
                </Flex>
              </Box>
              {connected ? (
                <AppButton
                  width="full"
                  className="!bg-blue-500 !text-white"
                  isDisabled={!(formik.isValid && formik.dirty)}
                  onClick={() => unstakePool(Number(formik.values.amount))}
                >
                  {intl.formatMessage({ id: "modal.unstake" })}
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
              {Number(dataStrategies?.withdrawalSwapFee) ? (
                <Accordion className="w-full" allowToggle>
                  <AccordionItem className="border-solid border-[1px] border-primary-100 rounded-2xl">
                    <AccordionButton className=":hover:!bg-[transparent]">
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        className="text-primary-450"
                      >
                        {intl.formatMessage({
                          id: "modal.transaction_settings",
                        })}
                      </Box>
                      <Icon as={IoSettingsOutline} />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Flex flexDirection={"column"} gap={"8px"}>
                        <Flex justifyContent={"space-between"}>
                          <Box>
                            {intl.formatMessage({
                              id: "modal.slippage_tolerance",
                            })}
                          </Box>
                          <Box className="font-semibold text-primary-500">
                            {formik.values.slipPage}%
                          </Box>
                        </Flex>
                        <Box
                          bg="primary.50"
                          borderRadius="8px"
                          p={1}
                          className="h-auto flex gap-2"
                        >
                          <HStack {...group}>
                            {dataSlipPage.map((value) => {
                              const radio = getRadioProps({ value });
                              return (
                                <RadioCard key={value} {...radio}>
                                  {value}%
                                </RadioCard>
                              );
                            })}
                          </HStack>
                          <Divider
                            orientation="vertical"
                            height={"auto"}
                            bgColor={"primary.300"}
                            borderLeft={"1px"}
                          />
                          <FormControl
                            isInvalid={
                              !!formik.errors?.slipPage &&
                              formik.touched?.slipPage
                            }
                          >
                            <InputGroup className="!bg-primary-100 !rounded-lg !px-4 ">
                              <Field
                                as={Input}
                                id="slipPage"
                                name="slipPage"
                                type="text"
                                className="!text-[14px] !text-primary-500 !outline-none !border-none !rounded-full hover:!border-none  focus-visible:!border-none focus-visible:!shadow-none !shadow-none"
                                value={formik.values.slipPage}
                                onChange={(e: React.ChangeEvent<any>) => {
                                  const slipPage = formatNumberWithDecimal(
                                    keepNumericAndDecimal(e.target.value),
                                    1,
                                  );
                                  formik.setFieldValue("slipPage", slipPage);
                                }}
                                disabled={!connected}
                                autoComplete="off"
                              />
                              <InputRightAddon className="!border-none !bg-[transparent] !p-0">
                                %
                              </InputRightAddon>
                            </InputGroup>
                          </FormControl>
                        </Box>
                        {formik.errors.slipPage && (
                          <span className="text-primaryRed text-[12px]">
                            {formik.errors.slipPage}
                          </span>
                        )}
                        <Box className="text-primary-400">
                          {intl.formatMessage({ id: "modal.your_transaction" })}
                        </Box>
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ) : (
                ""
              )}
            </VStack>
          </Form>
        </Formik>
      </Box>
    </>
  );
};
