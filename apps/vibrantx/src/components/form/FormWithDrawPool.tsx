// import checkCircelIcon from "@/assets/check_circle.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { AppButton } from "@/pages/Homepage";
import { setCloseModalWithdraw, setOpenModal } from "@/redux/slice/modalSlice";
import {
  addBigNumbers,
  calculateValue,
  calculateValueWithDecimals,
  convertValueToDecimals,
  formatNumberWithDecimal,
  formatToLocaleString,
  getTokenInfo,
  getTokenPrice,
  keepNumericAndDecimal,
  multiplyBigNumbers,
} from "@/utils/functions";
import { ViewRequest } from "@aptos-labs/ts-sdk";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import {
  Box,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Skeleton,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikErrors, useFormik } from "formik";
import { useEffect, useState } from "react";
// import SVG from "react-inlinesvg";
import { Strategies } from "@/services";
import { ITokenInfo } from "@/utils/utils.type";
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

export const FormWithDrawPool = ({ title = true, strategies }: prop) => {
  // const [nextStep, setNextStep] = useState<boolean>(false);
  const aptos = useAptos();
  const toast = useToast();
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { modalWithdraw } = useAppSelector((state) => state.modal);
  const tokenInfoResult = () => {
    if (strategies) {
      return (
        strategies?.positionToken &&
        getTokenInfo(strategies?.positionToken ?? "")
      );
    }
    return (
      modalWithdraw?.strategies?.positionToken &&
      getTokenInfo(modalWithdraw?.strategies?.positionToken ?? "")
    );
  };
  const tokenInfo: ITokenInfo | undefined = tokenInfoResult();

  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [loading, setLoading] = useState<boolean>(true);
  const [availableBalance, setAvailableBalance] = useState<number | string>(0);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const feePool = String(
    Number(
      addBigNumbers(
        modalWithdraw?.strategies?.withdrawalSwapFee,
        modalWithdraw?.strategies?.withdrawalFee,
      ),
    ) / 100,
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
        String(Number(availableBalance) / div),
        tokenInfo?.decimals,
      ),
    );
  };

  const withdrawPool = async (amount: number) => {
    if (!account) return [];
    const value = convertValueToDecimals(amount, tokenInfo?.decimals);
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::aries::withdraw`,
        functionArguments: [value],
        typeArguments: [tokenInfo.token_type.type],
      },
    };

    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      dispatch(setCloseModalWithdraw());
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
    if (account?.address && tokenInfo?.token_type?.type) {
      (async () => {
        const payload: ViewRequest = {
          function: `${moduleAddress}::aries::get_position`,
          typeArguments: [tokenInfo?.token_type?.type],
          functionArguments: [account.address],
        };
        const position = await aptos.view({ payload });
        const tokenPrice = getTokenPrice(tokenInfo?.token_type?.type);
        const balance = calculateValueWithDecimals(
          Number(position[0]!),
          tokenInfo?.decimals,
        );
        setAvailableBalance(balance);
        setCurrentPrice(Number(tokenPrice));
        setLoading(false);
      })();
    }
  }, [tokenInfo?.token_type?.type, account?.address]);

  return (
    <>
      {title && (
        <Box className="text-[24px] font-medium text-primary-500 leading-[32px]">
          {intl.formatMessage({ id: "modal.withdraw" })}
        </Box>
      )}
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
                            <Flex>
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
                {Number(feePool) ? (
                  <Flex
                    justifyContent={"space-between"}
                    marginTop={3}
                    className="text-neutralGray-400"
                  >
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
              </Box>
              {connected ? (
                <AppButton
                  width="full"
                  className="!bg-blue-500 !text-white"
                  isDisabled={!(formik.isValid && formik.dirty)}
                  onClick={() => withdrawPool(Number(formik.values.amount))}
                >
                  {intl.formatMessage({ id: "modal.withdraw" })}
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
