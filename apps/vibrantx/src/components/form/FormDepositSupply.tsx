import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { AppButton } from "@/pages/Homepage";
import { setCloseModalSupply, setOpenModal } from "@/redux/slice/modalSlice";
import {
  calculateValue,
  calculateValueWithDecimals,
  convertValueToDecimals,
  formatNumberWithDecimal,
  getTokenInfo,
  getTokenPrice,
  keepNumericAndDecimal,
} from "@/utils/functions";
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
import * as Yup from "yup";
import { useAptos } from "../AptosContext";
import { ToastModal } from "../toast";

interface FormValues {
  amount: string;
}

const moduleAddress = import.meta.env.VITE_APP_MODULE_ADDRESS;

export const FormDepositSupply = () => {
  // const [nextStep, setNextStep] = useState<boolean>(false);
  const aptos = useAptos();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { modalSupply } = useAppSelector((state) => state.modal);
  const tokenInfo =
    modalSupply?.strategies?.stakeToken &&
    modalSupply?.strategies?.stakeToken![0] &&
    getTokenInfo(modalSupply?.strategies?.stakeToken![0]);

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
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<{
      amount: string;
    }>>
  ) => {
    setFieldValue(
      "amount",
      formatNumberWithDecimal(
        String(Number(availableBalance) / div),
        tokenInfo?.decimals
      )
    );
  };

  const supplyPool = async (amount: number) => {
    if (!account) return [];
    const value = convertValueToDecimals(amount, tokenInfo?.decimals);
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::aries::lend`,
        functionArguments: [value],
        typeArguments: [tokenInfo.token_type.type],
      },
    };

    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      dispatch(setCloseModalSupply());
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
          coinType: tokenInfo?.token_type?.type,
        });
        const tokenPrice = getTokenPrice(tokenInfo?.token_type?.type);
        const balance = calculateValueWithDecimals(
          result,
          tokenInfo?.decimals ?? 6
        );
        setAvailableBalance(balance);
        setCurrentPrice(Number(tokenPrice));
        setLoading(false);
      })();
    }
  }, [account?.address, tokenInfo?.token_type?.type]);

  return (
    <>
      <Box className="text-[24px] font-medium text-primary-500 leading-[32px]">
        Lend
      </Box>
      <Formik initialValues={formik.initialValues} onSubmit={formik.submitForm}>
        <Form>
          <VStack
            spacing={4}
            align="flex-start"
            className="font-medium text-primary-400"
          >
            <Box className="w-full">
              <Box>Your Asset</Box>
              <Box className="p-3 rounded-[16px] border-[1px] border-solid border-primary-300 w-full flex flex-col gap-4 bg-primary-50">
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Flex gap={1}>
                    <AppButton
                      onClick={() =>
                        handleClickMaxOrHaft(1, formik.setFieldValue)
                      }
                      className="!py-[2px] px-2  !h-auto !text-primaryPurple-600 !bg-overlay-20 hover:!bg-primaryPurple-500 hover:!text-white"
                    >
                      Max
                    </AppButton>
                    <AppButton
                      onClick={() =>
                        handleClickMaxOrHaft(2, formik.setFieldValue)
                      }
                      className="!py-[2px] px-2  !h-auto !text-primaryPurple-600 !bg-overlay-20 hover:!bg-primaryPurple-500 hover:!text-white"
                    >
                      Half
                    </AppButton>
                  </Flex>
                  <Flex alignItems={"center"} gap={1}>
                    <Box>Available: </Box>
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
                            tokenInfo?.decimals ?? 6
                          );
                          formik.setFieldValue("amount", amount);
                        }}
                      />
                      <InputRightAddon className="!border-none !bg-[transparent] !p-0">
                        <Flex gap={"8px"}>
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
                    <Flex justifyContent={"flex-end"}>
                      ~$
                      {formatNumberWithDecimal(
                        calculateValue(
                          formik.values.amount ? formik.values.amount : 0,
                          currentPrice
                        ),
                        4
                      )}
                    </Flex>
                  </FormControl>
                </Flex>
              </Box>
            </Box>
            {connected ? (
              <AppButton
                width="full"
                className="!bg-blue-500 !text-white"
                isDisabled={!(formik.isValid && formik.dirty)}
                onClick={() => supplyPool(Number(formik.values.amount))}
              >
                Supply
              </AppButton>
            ) : (
              <AppButton
                width="full"
                className="!bg-blue-500 !text-white"
                onClick={() => dispatch(setOpenModal())}
              >
                Connect Wallet
              </AppButton>
            )}
          </VStack>
        </Form>
      </Formik>
    </>
  );
};
