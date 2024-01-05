import checkCircelIcon from "@/assets/check_circle.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { AppButton } from "@/pages/Homepage";
import { setCloseModalStake, setOpenModal } from "@/redux/slice/modalSlice";
import { StrategiesAPI } from "@/services";
import {
  calculateValue,
  calculateValueWithDecimals,
  convertValueToDecimals,
  getDecimalAndLogoUrl,
  getProtocolName,
} from "@/utils/functions";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightAddon,
  Skeleton,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik, FormikErrors } from "formik";
import { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import { useAptos } from "../AptosContext";

const moduleAddress = import.meta.env.VITE_APP_MODULE_ADDRESS;

export const FormStakePool = () => {
  const [nextStep, setNextStep] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { modalStake } = useAppSelector((state) => state.modal);
  const tokenInfo = getDecimalAndLogoUrl(modalStake.strategies.name ?? "");
  const toast = useToast();

  const aptos = useAptos();
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [loading, setLoading] = useState<boolean>(true);
  const [availableBalance, setAvailableBalance] = useState<number | string>(0);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

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
    setFieldValue("amount", Number(availableBalance) / div);
  };

  const StakePool = async (amount: number) => {
    if (!account) return [];
    const tokenInfo = getDecimalAndLogoUrl(modalStake.strategies.displayName);
    const value = convertValueToDecimals(amount, tokenInfo?.decimals ?? 6);
    const protocol = getProtocolName(modalStake.strategies.protocols[0]!);
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::${protocol}::stake`,
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
        position: "bottom-right",
        render: () => (
          <Box color='white' p={4} className='bg-indigo-400 text-white'>
            <Box>Transaction created.</Box>
            <a
              href={`https://explorer.aptoslabs.com/txn/${result.version}?network=mainnet`}
              target='_blank'
            >
              View transaction
            </a>
          </Box>
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
    if (account?.address && modalStake.strategies.displayName) {
      (async () => {
        const result = await aptos.getAccountCoinAmount({
          accountAddress: account.address,
          coinType: modalStake.strategies.poolType,
        });
        const tokenInfo = getDecimalAndLogoUrl(
          modalStake.strategies.displayName
        );
        const { data } = await StrategiesAPI.getPriceFromCoingeckoId(
          tokenInfo?.coingecko_id ?? ""
        );
        const balance = calculateValueWithDecimals(
          result,
          tokenInfo?.decimals ?? 6
        );
        setAvailableBalance(balance);
        setCurrentPrice(data[0]!?.current_price);
        setLoading(false);
      })();
    }
  }, [modalStake.strategies.poolType, modalStake.strategies.name]);

  return (
    <>
      <Box className='text-[24px] font-medium text-primary-500 leading-[32px]'>
        {nextStep ? (
          <Flex alignItems={"center"} gap={"4px"}>
            <SVG src={checkCircelIcon} /> <Box>Your Withdraw Preview</Box>
          </Flex>
        ) : (
          "Withdraw"
        )}
      </Box>
      <Formik
        initialValues={{
          amount: "",
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({
          handleSubmit,
          errors,
          touched,
          values,
          setFieldValue,
          dirty,
          isValid,
        }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align='flex-start'>
              <Box className='w-full'>
                <Box>Your Asset</Box>
                {nextStep ? (
                  <Flex
                    gap={"8px"}
                    flexDirection={"column"}
                    className='text-primary-450'
                  >
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Box className='text-primary-500 text-[24px] font-medium'>
                        {values.amount} {modalStake.strategies.displayName}
                      </Box>
                      <img className='w-5 h-5' src={tokenInfo?.logo_url} />
                    </Flex>
                    <Box>
                      ~$
                      {calculateValue(
                        values.amount ? values.amount : 0,
                        currentPrice
                      )}
                    </Box>
                    <Flex justifyContent={"space-between"}>
                      <Box>Stake APY</Box>
                      <Box>{modalStake.strategies.apr}%</Box>
                    </Flex>
                  </Flex>
                ) : (
                  <Box className='p-3 rounded-[16px] border-[1px] border-solid border-primary-300 w-full flex flex-col gap-4'>
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Flex gap={1}>
                        <AppButton
                          onClick={() => handleClickMaxOrHaft(1, setFieldValue)}
                          className='!py-[2px] px-2  !h-auto !text-white !bg-indigo-500 bg-opacity-60'
                        >
                          Max
                        </AppButton>
                        <AppButton
                          onClick={() => handleClickMaxOrHaft(2, setFieldValue)}
                          className='!py-[2px] px-2  !h-auto !text-white !bg-indigo-500 bg-opacity-60'
                        >
                          Half
                        </AppButton>
                      </Flex>
                      <Flex alignItems={"center"} gap={1}>
                        <Box>Available: </Box>
                        {loading ? (
                          <Skeleton height={"10px"} width={"20px"} />
                        ) : (
                          <Box>{availableBalance}</Box>
                        )}
                      </Flex>
                    </Flex>
                    <Flex alignItems={"center"} gap={"8px"}>
                      <FormControl
                        isInvalid={!!errors?.amount && touched?.amount}
                      >
                        <InputGroup>
                          <Field
                            as={Input}
                            id='amount'
                            name='amount'
                            type='text'
                            className='!text-[24px] !text-primary-500 !outline-none !border-none !rounded-full hover:!border-none  focus-visible:!border-none focus-visible:!shadow-none !shadow-none'
                            value={values.amount}
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
                          />
                          <InputRightAddon className='!border-none !bg-[transparent] !p-0'>
                            <Flex gap={"8px"}>
                              <img
                                src={tokenInfo?.logo_url ?? ""}
                                className='w-5 h-5'
                              />
                              <Box className='font-medium text-primary-500'>
                                {modalStake.strategies.displayName}
                              </Box>
                            </Flex>
                          </InputRightAddon>
                        </InputGroup>
                        <FormErrorMessage>{errors.amount}</FormErrorMessage>
                        <Flex justifyContent={"flex-end"}>
                          ~$
                          {calculateValue(
                            values.amount ? values.amount : 0,
                            currentPrice
                          )}
                        </Flex>
                      </FormControl>
                    </Flex>
                  </Box>
                )}
              </Box>
              {nextStep ? (
                <Flex gap={"8px"} width={"100%"}>
                  <AppButton
                    width='full'
                    className='!bg-blue-500 !text-white'
                    onClick={() => StakePool(Number(values.amount))}
                  >
                    Supply
                  </AppButton>
                  <AppButton
                    width='full'
                    className='!border-blue-500 border-solid border-[1px] !text-blue-500 !bg-white'
                    onClick={() => dispatch(setCloseModalStake())}
                  >
                    Cancel
                  </AppButton>
                </Flex>
              ) : connected ? (
                <AppButton
                  width='full'
                  className='!bg-blue-500 !text-white'
                  isDisabled={!(isValid && dirty)}
                  onClick={() => setNextStep(true)}
                >
                  Stake
                </AppButton>
              ) : (
                <AppButton
                  width='full'
                  className='!bg-blue-500 !text-white'
                  onClick={() => dispatch(setOpenModal())}
                >
                  Connect Wallet
                </AppButton>
              )}
            </VStack>
          </form>
        )}
      </Formik>
    </>
  );
};
