// import warningIcon from "@/assets/alert-triangle.svg";
// import { arrowrRight } from "@/assets/home";
import { useAptos } from "@/components/AptosContext";
import { ToastModal } from "@/components/toast";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setOpenModal } from "@/redux/slice/modalSlice";
import { IUserPositions } from "@/redux/slice/strategiesSlice";
import {
  calculateValue,
  calculateValueWithDecimals,
  getProtocolNameAndFunc,
  getTokenInfo,
  getTokenPrice,
} from "@/utils/functions";
import { ViewRequest } from "@aptos-labs/ts-sdk";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { Box, Skeleton, Stack, useToast } from "@chakra-ui/react";
import _ from "lodash";
import { memo, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { AppButton } from "..";
import TablePosition from "./TablePosition";

const moduleAddress = import.meta.env.VITE_APP_MODULE_ADDRESS;

export const Positions = memo(() => {
  const intl = useIntl();
  const aptos = useAptos();
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const dispatch = useAppDispatch();
  const { strategies } = useAppSelector((state) => state.strategies);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataPosition, setDataPosition] = useState<IUserPositions[]>([]);
  const toast = useToast();

  const handleClaimRewards = async (
    protocols: string,
    rewardsAddress: `${string}::${string}::${string}`,
  ) => {
    const protocol = getProtocolNameAndFunc(protocols);
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::${protocol.protocol}::${protocol.funcClaimRewards}`,
        functionArguments: [],
        typeArguments: [rewardsAddress],
      },
    };

    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
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
    } catch (error) {
      console.log(error);
    }
  };

  const renderContent = () => {
    if (!connected) {
      return (
        <Box className="border-gradient">
          <Box className="bg-white boxed-gradient-child bg-opacity-40 gap-8 py-8 px-4 rounded-[24px] flex flex-wrap justify-between items-center">
            <Box>
              <Box className="text-[20px] font-bold text-primary-500 leading-[30px]">
                My positions
              </Box>
              <Box className="text-[16px] font-medium text-primary-400 leading-[24px]">
                Disclaimer: Connect your wallet to see positions you committed
                via VibrantX
              </Box>
            </Box>
            <AppButton
              className="!text-white !bg-indigo-500"
              onClick={() => dispatch(setOpenModal())}
            >
              Connect Wallet
            </AppButton>
          </Box>
        </Box>
      );
    } else if (connected && loading) {
      return (
        <Stack>
          <Skeleton height={"60px"} />
          <Skeleton height={"60px"} />
          <Skeleton height={"60px"} />
          <Skeleton height={"60px"} />
          <Skeleton height={"60px"} />
        </Stack>
      );
    } else {
      return (
        <>
          <TablePosition
            dataPosition={dataPosition}
            handleClaimRewards={handleClaimRewards}
          />
          <Box className="text-primary-400 font-medium">
            You can only view the positions you have opened via VibrantX Finance
          </Box>
          {/* <Flex
            justifyContent='center'
            alignItems={"center"}
            flexDirection='column'
            gap={4}
          >
            <AppButton
              variant={"text"}
              className='!text-indigo-500 hover:!transform-none'
            >
              View all
              <SVG src={arrowrRight} />
            </AppButton>
            <AppButton className='w-max !min-w-[165px] !bg-indigo-500 !text-white !shadow-sm'>
              Export CSV
            </AppButton>
          </Flex> */}
        </>
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const positionData: IUserPositions[] = [];

      if (account?.address && strategies?.length) {
        const apiCalls = strategies.map(async (item) => {
          if (item.protocols[0]) {
            const protocolAndFunc = getProtocolNameAndFunc(item.protocols[0]);
            const payload: ViewRequest = {
              function: `${moduleAddress}::${protocolAndFunc.protocol}::${protocolAndFunc.funcUserPosition}`,
              typeArguments:
                item.protocols[0] === "Aries" ? [item.poolType] : [],
              functionArguments: [account.address],
            };

            try {
              const position = await aptos.view({ payload });

              if (position && Number(position[0]) !== 0) {
                const tokenInfo = getTokenInfo(item.positionToken);
                const amount = calculateValueWithDecimals(
                  Number(position[0]),
                  tokenInfo?.decimals,
                );
                const tokenPrice = getTokenPrice(item.positionToken);
                const value = calculateValue(amount, tokenPrice);

                const rewardsInfo = getTokenInfo(item.rewardToken[0]);
                const rewards = position && position[1]! ? position[1] : 0;
                const amountRewards = calculateValueWithDecimals(
                  Number(rewards),
                  rewardsInfo.decimals ?? 8,
                );
                const rewardsPrice = getTokenPrice(item.rewardToken[0]!);
                const valueRewards = calculateValue(
                  amountRewards,
                  rewardsPrice,
                );

                if (Number(value) > 0.01 || Number(valueRewards) > 0.01) {
                  positionData.push({
                    ...item,
                    amount,
                    value,
                    positions: position as string[],
                    rewards: valueRewards,
                  });
                }
              }
            } catch (error) {
              console.error(`Error fetching data for ${item.name}:`, error);
            }
          }
        });

        // Wait for all API calls to complete
        await Promise.all(apiCalls);

        // Update state after all calls are completed
        setDataPosition((preState) => {
          if (
            _.isEqual(
              preState.sort((a, b) =>
                a.id
                  .toLocaleLowerCase()
                  .localeCompare(b.id.toLocaleLowerCase()),
              ),
              positionData.sort((a, b) =>
                a.id
                  .toLocaleLowerCase()
                  .localeCompare(b.id.toLocaleLowerCase()),
              ),
            )
          ) {
            return preState;
          }
          return positionData;
        });
        setLoading(false);
      }
    };

    fetchData();
    const data = setInterval(fetchData, 30000);

    return () => clearInterval(data);
  }, [account?.address, strategies]);

  // useQuery({
  //   queryKey: ["getUserPositions", account?.address],
  //   queryFn: ({ queryKey }) => {
  //     const [, address] = queryKey;
  //     if (address) {
  //       return dispatch(getPositions({ address: address }));
  //     } else {
  //       return Promise.resolve(null);
  //     }
  //   },
  //   refetchOnWindowFocus: true,
  // });

  return (
    <Box className="flex flex-col gap-[60px]">
      <Box
        textAlign={"center"}
        className="!text-5xl md:!text-6xl font-semibold text-primary-500"
      >
        <span> {intl.formatMessage({ id: "homepage.positions.title1" })}</span>
        <span className="bg-text-gradient">
          {intl.formatMessage({ id: "homepage.positions.title2" })}
        </span>
        <span> {intl.formatMessage({ id: "homepage.positions.title3" })}</span>
      </Box>
      <Box className="flex flex-col gap-3">{renderContent()}</Box>
    </Box>
  );
});
