// import warningIcon from "@/assets/alert-triangle.svg";
// import { arrowrRight } from "@/assets/home";
import iconToken from "@/common/icons";
import { useAptos } from "@/components/AptosContext";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setOpenModal } from "@/redux/slice/modalSlice";
import { Strategies } from "@/services";
import { columnsPositions } from "@/utils/constants";
import {
  calculateValue,
  calculateValueWithDecimals,
  formatLargeNumber,
  formatNumberWithDecimal,
  getDecimalAndLogoUrl,
  getProtocolNameAndFunc,
  getTokenInfo,
  getTokenPrice,
} from "@/utils/functions";
import { MoveValue, ViewRequest } from "@aptos-labs/ts-sdk";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import {
  Box,
  Skeleton,
  Stack,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import { useIntl } from "react-intl";
import { AppButton, StyledTableContainer, TableHome, TrTable } from "..";
import { ToastModal } from "@/components/toast";

interface IDataPosition extends Strategies {
  amount: string | number;
  value: string;
  positions: MoveValue[];
  rewards: string;
}

const moduleAddress = import.meta.env.VITE_APP_MODULE_ADDRESS;

export const Positions = () => {
  const intl = useIntl();
  const aptos = useAptos();
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const dispatch = useAppDispatch();
  const { strategies } = useAppSelector((state) => state.strategies);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataPosition, setDataPosition] = useState<IDataPosition[]>([]);
  const toast = useToast();

  const handleClaimRewards = async (
    protocols: string,
    rewardsAddress: `${string}::${string}::${string}`
  ) => {
    const protocol = getProtocolNameAndFunc(protocols);
    console.log(
      `${moduleAddress}::${protocol.protocol}::${protocol.funcClaimRewards}`,
      rewardsAddress
    );
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
    } catch (error: any) {
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
          <StyledTableContainer className="mt-[38px] bg-white bg-opacity-40">
            <TableHome variant="simple">
              <Thead>
                <Tr>
                  {columnsPositions.map((column) => (
                    <Th
                      className={clsx({
                        "!text-end":
                          column.key === "amount" ||
                          column.key === "apr" ||
                          column.key === "value" ||
                          column.key === "rewards",
                      })}
                      key={column.key}
                    >
                      {column.label}
                    </Th>
                  ))}
                  <Th className="flex gap-1 justify-center">
                    <Box>Action</Box>
                    {/* <Tooltip
                      hasArrow
                      label='Blocked rewards due to VPN or US/region restrictions.'
                      bg='white'
                      color='primary.500'
                      placement='top'
                      maxWidth='160px'
                      padding={"8px 12px"}
                      className='!text-center !rounded-[8px]'
                    >
                      <Box>
                        <SVG src={warningIcon} />
                      </Box>
                    </Tooltip> */}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataPosition
                  .sort(
                    (a, b) =>
                      a.name.localeCompare(b.name, "en", {
                        sensitivity: "base",
                      }) &&
                      a.protocols[0]!.localeCompare(b.protocols[0]!) &&
                      a.strategyType.localeCompare(b.strategyType)
                  )
                  .map((ele) => {
                    const tokenInfo = getDecimalAndLogoUrl(ele.name);
                    return (
                      <TrTable key={ele.id}>
                        <Td>
                          <Box className="flex gap-2 items-center">
                            <img
                              src={tokenInfo?.logo_url ?? ""}
                              className="w-8 h-8 rounded-full"
                            />
                            {ele.displayName}
                          </Box>
                        </Td>
                        <Td>
                          <Tag
                            className={clsx("!px-3 !py-1 !rounded-full", {
                              "!bg-[#FEF9F5] !text-[#F2994A]":
                                ele.strategyType === "Lending",
                              "!bg-[#F1FCF6] !text-[#219653]":
                                ele.strategyType === "Staking",
                            })}
                          >
                            {ele.strategyType}
                          </Tag>
                        </Td>
                        <Td>
                          <Box className="flex gap-2 items-center">
                            <SVG
                              width={32}
                              height={32}
                              src={
                                iconToken[ele.protocols[0]!.toLocaleLowerCase()]
                              }
                            />
                            {
                              getProtocolNameAndFunc(ele.protocols[0]!)
                                .protocolDisplayName
                            }
                          </Box>
                        </Td>
                        <Td className="!text-right">
                          {Number(ele.amount).toFixed(2)}
                        </Td>
                        <Td className="!text-right">
                          ${Number(ele.value).toFixed(2)}
                        </Td>
                        <Td className="!text-right">
                          {Number(ele.apr).toFixed(2)}%
                        </Td>
                        <Td className="!text-right">
                          {Number(ele.rewards)
                            ? `$${formatLargeNumber(
                                formatNumberWithDecimal(ele.rewards, 2)
                              )}`
                            : "-"}
                        </Td>
                        <Td className="!text-center">
                          <AppButton
                            onClick={() => {
                              handleClaimRewards(
                                ele.protocols[0]!,
                                ele.positionToken
                              );
                            }}
                            className={clsx("!bg-blue-200 !text-blue-500", {
                              disabled:
                                ele.strategyType === "Staking" ||
                                (ele.positions && ele.positions[1]! === "0"),
                            })}
                            isDisabled={
                              ele.strategyType === "Staking" ||
                              (ele.positions && ele.positions[1]! === "0")
                            }
                          >
                            Claim
                          </AppButton>
                        </Td>
                      </TrTable>
                    );
                  })}
              </Tbody>
            </TableHome>
          </StyledTableContainer>
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
      const positionData: IDataPosition[] = [];

      if (account?.address && strategies?.length) {
        const apiCalls = strategies.map(async (item) => {
          if (item.protocols[0]) {
            const functionsView = (protocol: string) => {
              switch (protocol.toLocaleLowerCase()) {
                case "amnis":
                  return `${moduleAddress}::amnis::get_users_position` as `${string}::${string}::${string}`;
                case "aries":
                  return `${moduleAddress}::aries::get_position` as `${string}::${string}::${string}`;
                case "thala-lsd":
                  return `${moduleAddress}::thala_lsd::get_users_position` as `${string}::${string}::${string}`;
                default:
                  return `${moduleAddress}::amnis::get_users_position` as `${string}::${string}::${string}`;
              }
            };
            const payload: ViewRequest = {
              function: functionsView(item.protocols[0]),
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
                  tokenInfo?.decimals
                );
                const tokenPrice = getTokenPrice(item.positionToken);
                const value = calculateValue(amount, tokenPrice);

                const rewardsInfo = getTokenInfo(item.rewardToken[0]);
                const rewards = position && position[1]! ? position[1] : 0;
                const amountRewards = calculateValueWithDecimals(
                  Number(rewards),
                  rewardsInfo.decimals ?? 8
                );
                const rewardsPrice = getTokenPrice(item.rewardToken[0]!);
                const ValueRewards = calculateValue(
                  amountRewards,
                  rewardsPrice
                );

                positionData.push({
                  ...item,
                  amount,
                  value,
                  positions: position,
                  rewards: ValueRewards,
                });
              }
            } catch (error) {
              console.error(`Error fetching data for ${item.name}:`, error);
            }
          }
        });

        // Wait for all API calls to complete
        await Promise.all(apiCalls);

        // Update state after all calls are completed
        setDataPosition(positionData);
        setLoading(false);
      }
    };

    fetchData();
  }, [account?.address, strategies?.length]);

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
};
