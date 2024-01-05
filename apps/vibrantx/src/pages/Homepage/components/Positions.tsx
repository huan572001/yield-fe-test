import iconToken from "@/common/icons";
import { useAptos } from "@/components/AptosContext";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setOpenModal } from "@/redux/slice/modalSlice";
import { Strategies, StrategiesAPI } from "@/services";
import { columnsPositions } from "@/utils/constants";
import {
  calculateValue,
  calculateValueWithDecimals,
  getDecimalAndLogoUrl,
} from "@/utils/functions";
import { ViewRequest } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  Box,
  Skeleton,
  Stack,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import { useIntl } from "react-intl";
import { AppButton, StyledTableContainer, TableHome } from "..";

interface IDataPosition extends Strategies {
  amount: string | number;
  value: string;
}

const moduleAddress = import.meta.env.VITE_APP_MODULE_ADDRESS;

export const Positions = () => {
  const intl = useIntl();
  const aptos = useAptos();
  const { account, connected } = useWallet();
  const dispatch = useAppDispatch();
  const { strategies } = useAppSelector((state) => state.strategies);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataPosition, setDataPosition] = useState<IDataPosition[]>([]);

  const renderContent = () => {
    if (!connected) {
      return (
        <Box className='border-gradient'>
          <Box className='bg-white boxed-gradient-child bg-opacity-40 gap-8 py-8 px-4 rounded-[24px] flex flex-wrap justify-between items-center'>
            <Box>
              <Box className='text-[20px] font-bold text-primary-500 leading-[30px]'>
                My positions
              </Box>
              <Box className='text-[16px] font-medium text-primary-400 leading-[24px]'>
                Disclaimer: Connect your wallet to see positions you committed
                via VibrantX
              </Box>
            </Box>
            <AppButton
              className='!text-white !bg-indigo-500'
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
        <StyledTableContainer className='mt-[38px] bg-white bg-opacity-40'>
          <TableHome variant='simple'>
            <Thead>
              <Tr>
                {columnsPositions.map((column) => (
                  <Th
                    className={clsx({
                      "!text-end":
                        column.key === "amount" || column.key === "apr",
                      "!text-center": column.key !== "collateral",
                    })}
                    key={column.key}
                  >
                    {column.label}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {dataPosition.map((ele) => {
                const tokenInfo = getDecimalAndLogoUrl(ele.displayName);
                return (
                  <Tr key={ele.id}>
                    <Td className='flex gap-2 items-center'>
                      <img
                        src={tokenInfo?.logo_url ?? ""}
                        className='w-10 h-10'
                      />
                      {ele.displayName}
                    </Td>
                    <Td className='!text-center'>
                      {/* {formatLargeNumber(ele.totalValueLocked)} */}
                      Lending
                    </Td>
                    <Td className='flex gap-2 items-center justify-center'>
                      <SVG
                        width={40}
                        height={40}
                        src={iconToken[ele.protocols[0]!.toLocaleLowerCase()]}
                      />
                      {ele.protocols[0]!}
                    </Td>
                    <Td className='!text-right'>
                      {Number(ele.amount).toFixed(2)}
                    </Td>
                    <Td className='!text-center'>
                      ${Number(ele.value).toFixed(2)}
                    </Td>
                    <Td className='!text-right'>
                      {Number(ele.apr).toFixed(2)}%
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </TableHome>
        </StyledTableContainer>
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const positionData: IDataPosition[] = [];
      if (account?.address) {
        const totalIterations = strategies.length;
        for (const [index, item] of strategies.entries()) {
          const isLastIteration = index === totalIterations - 1;
          if (
            item.protocols[0]! &&
            (item.protocols[0]! === "Amnis" || item.protocols[0]! === "Aries")
          ) {
            const functionsView = (protocol: string) => {
              switch (protocol) {
                case "Amnis":
                  return `${moduleAddress}::amnis::get_users_position` as `${string}::${string}::${string}`;
                case "Aries":
                  return `${moduleAddress}::aries::get_position` as `${string}::${string}::${string}`;
                case "Thala-lsd":
                  return `${moduleAddress}::thala_lsd::get_users_position` as `${string}::${string}::${string}`;
                default:
                  return `${moduleAddress}::amnis::get_users_position` as `${string}::${string}::${string}`;
              }
            };

            const payload: ViewRequest = {
              function: functionsView(item.protocols[0]!),
              typeArguments:
                item.protocols[0]! === "Aries" ? [item.poolType] : [],
              functionArguments: [account.address],
            };

            try {
              const position = await aptos.view({ payload });

              if (position && Number(position[0]!) !== 0) {
                const tokenInfo = getDecimalAndLogoUrl(item.name);
                const amount = calculateValueWithDecimals(
                  Number(position[0]!),
                  tokenInfo?.decimals ?? 6
                );
                const { data } = await StrategiesAPI.getPriceFromCoingeckoId(
                  tokenInfo?.coingecko_id ?? ""
                );
                const value = calculateValue(amount, data[0]!?.current_price);

                positionData.push({ ...item, amount: amount, value: value });
              }
            } catch (error) {}
          }
          if (isLastIteration) {
            setDataPosition(positionData);
            setLoading(false);
          }
        }
      }
    };

    fetchData();
  }, [account?.address]);

  return (
    <Box className='flex flex-col gap-[60px]'>
      <Box
        textAlign={"center"}
        className='!text-5xl md:!text-6xl font-semibold text-primary-500'
      >
        <span> {intl.formatMessage({ id: "homepage.positions.title1" })}</span>
        <span className='bg-text-gradient'>
          {intl.formatMessage({ id: "homepage.positions.title2" })}
        </span>
        <span> {intl.formatMessage({ id: "homepage.positions.title3" })}</span>
      </Box>
      {renderContent()}
    </Box>
  );
};
