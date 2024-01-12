import alertIcon from "@/assets/alert-triangle-red.svg";
import liquidSwapIcon from "@/assets/liquidswap.svg";
import thalaIcon from "@/assets/thala-logo.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { AppButton } from "@/pages/Homepage";
import { setCloseModalUnstake, setOpenModal } from "@/redux/slice/modalSlice";
import {
  addBigNumbers,
  calculateValue,
  calculateValueWithDecimals,
  convertValueToDecimals,
  formatNumberWithDecimal,
  getProtocolNameAndFunc,
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
import * as Yup from "yup";
import { useAptos } from "../AptosContext";
import { RadioCard } from "../radio";
import { ToastModal } from "../toast";

interface FormValues {
  amount: string;
  slipPage: string;
}

const moduleAddress = import.meta.env.VITE_APP_MODULE_ADDRESS;

export const FormUnStakePool = () => {
  // const [nextStep, setNextStep] = useState<boolean>(false);
  const dataSlipPage = ["0.5", "1", "2", "5"];
  const dispatch = useAppDispatch();
  const { modalUnstake } = useAppSelector((state) => state.modal);
  const toast = useToast();

  const aptos = useAptos();
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [loading, setLoading] = useState<boolean>(true);
  const [availableBalance, setAvailableBalance] = useState<number | string>(0);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const protocol =
    modalUnstake?.strategies?.protocols &&
    modalUnstake?.strategies?.protocols[0]! &&
    getProtocolNameAndFunc(modalUnstake.strategies.protocols[0]!);

  const tokenInfo =
    modalUnstake?.strategies?.positionToken &&
    getTokenInfo(modalUnstake?.strategies?.positionToken ?? "");

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
        if (!value && !!Number(modalUnstake?.strategies?.withdrawalSwapFee)) {
          return createError({ message: "Slippage is required" });
        }
        return true;
      }
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
        modalUnstake?.strategies?.withdrawalSwapFee,
        modalUnstake?.strategies?.withdrawalFee,
        formik.values?.slipPage
      )
    ) / 100
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
          tokenInfo?.decimals ?? 6
        );
        setAvailableBalance(balance);
        setCurrentPrice(Number(tokenPrice));
        setLoading(false);
      })();
    }
  }, [account?.address, tokenInfo?.token_type?.type, protocol]);

  return (
    <>
      <Box className="text-[24px] font-medium text-primary-500 leading-[32px]">
        Unstake
      </Box>
      <Flex
        gap={3}
        justifyContent={"flex-start"}
        alignItems={"center"}
        padding={4}
        className="bg-error-25 border-error-200 border-solid border-[1px] rounded-[12px]"
      >
        <SVG className="text-error-500" src={alertIcon} />
        <Box className="text-[14px] font-normal">
          Instant withdrawal might result in slippage.
        </Box>
      </Flex>
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
                        onChange={(e: React.ChangeEvent<any>) => {
                          const amount = formatNumberWithDecimal(
                            keepNumericAndDecimal(e.target.value),
                            tokenInfo?.decimals ?? 6
                          );
                          formik.setFieldValue("amount", amount);
                        }}
                        disabled={!connected}
                        autoComplete="off"
                      />
                      <InputRightAddon className="!border-none !bg-[transparent] !p-0">
                        <Flex gap={"8px"}>
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
              <Flex flexDirection={"column"} gap={"10px"} paddingTop={"10px"}>
                {Number(modalUnstake.strategies.withdrawalSwapFee) ? (
                  <Flex justifyContent={"space-between"}>
                    <Box>Swap via:</Box>
                    <Box className="font-semibold flex gap-2 items-center">
                      {protocol &&
                      protocol.protocol.toLocaleLowerCase() === "amnis"
                        ? "Liquidswap"
                        : "Thala"}
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
                {Number(modalUnstake?.strategies?.withdrawalSwapFee) ? (
                  <Flex justifyContent={"space-between"}>
                    <Box>Max Slippage:</Box>
                    <Box className="font-semibold text-primary-500">
                      {formik.values.slipPage}%
                    </Box>
                  </Flex>
                ) : (
                  ""
                )}
                {Number(feePool) ? (
                  <Flex justifyContent={"space-between"}>
                    <Box>Fee:</Box>
                    <Box className="font-semibold text-primary-500">
                      $
                      {formatNumberWithDecimal(
                        calculateValue(
                          multiplyBigNumbers(formik.values.amount, feePool),
                          currentPrice
                        ),
                        4
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
                Unstake
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
            {Number(modalUnstake?.strategies?.withdrawalSwapFee) ? (
              <Accordion className="w-full" allowToggle>
                <AccordionItem className="border-solid border-[1px] border-primary-100 rounded-2xl">
                  <AccordionButton className=":hover:!bg-[transparent]">
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      className="text-primary-450"
                    >
                      Transaction Settings
                    </Box>
                    <Icon as={IoSettingsOutline} />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Flex flexDirection={"column"} gap={"8px"}>
                      <Flex justifyContent={"space-between"}>
                        <Box>Slippage Tolerance</Box>
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
                                  1
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
                        Your transaction will revert if the price changes
                        unfavorably by more than this percentage
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
    </>
  );
};
