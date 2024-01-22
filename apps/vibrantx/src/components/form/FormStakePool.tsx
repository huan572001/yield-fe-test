import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { AppButton } from "@/pages/Homepage";
import { setCloseModalStake, setOpenModal } from "@/redux/slice/modalSlice";
import { Strategies } from "@/services";
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
import { useIntl } from "react-intl";
import * as Yup from "yup";
import { useAptos } from "../AptosContext";
import { ToastModal } from "../toast";

interface FormValues {
  amount: string;
}
interface prop {
  title?: boolean;
  strategies?: Strategies;
}
const moduleAddress = import.meta.env.VITE_APP_MODULE_ADDRESS;

export const FormStakePool = ({ title = true, strategies }: prop) => {
  // const [nextStep, setNextStep] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const aptos = useAptos();
  const intl = useIntl();
  const { modalStake } = useAppSelector((state) => state.modal);

  const tokenInfoResult = () => {
    if (strategies) {
      return (
        strategies?.stakeToken &&
        strategies?.stakeToken![0] &&
        getTokenInfo(strategies?.stakeToken![0] ?? "")
      );
    }
    return (
      modalStake?.strategies?.stakeToken &&
      modalStake?.strategies?.stakeToken![0] &&
      getTokenInfo(modalStake?.strategies?.stakeToken![0] ?? "")
    );
  };
  const tokenInfo: ITokenInfo | undefined = tokenInfoResult();
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [loading, setLoading] = useState<boolean>(true);
  const [availableBalance, setAvailableBalance] = useState<number | string>(0);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

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
        div === 1 && Number(availableBalance) > 0.01
          ? String(Number(availableBalance) / div - 0.01)
          : String(Number(availableBalance) / div),
        tokenInfo?.decimals,
      ),
    );
  };
  const StakePool = async (amount: number) => {
    if (!account) return [];
    const value = convertValueToDecimals(amount, tokenInfo?.decimals);
    const protocol = getProtocolNameAndFunc(
      modalStake.strategies.protocols[0]!,
    );
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::${protocol.protocol}::stake`,
        functionArguments: [value],
      },
    };

    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      dispatch(setCloseModalStake());
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
        const result = await aptos.getAccountCoinAmount({
          accountAddress: account.address,
          coinType: tokenInfo.token_type.type,
        });
        const tokenPrice = getTokenPrice(tokenInfo.token_type.type);
        const balance = calculateValueWithDecimals(result, tokenInfo?.decimals);
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
          {intl.formatMessage({ id: "modal.stake" })}
        </Box>
      )}
      <Box>
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
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
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
                          {intl.formatMessage({ id: "modal.available" })}
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
                              {modalStake.strategies.displayName}
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
              {connected ? (
                <AppButton
                  width="full"
                  className="!bg-blue-500 !text-white"
                  isDisabled={!(formik.isValid && formik.dirty)}
                  onClick={() => StakePool(Number(formik.values.amount))}
                >
                  {intl.formatMessage({ id: "modal.stake" })}
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
