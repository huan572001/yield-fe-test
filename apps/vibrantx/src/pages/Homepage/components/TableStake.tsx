import iconToken from "@/common/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  setOpenModalStake,
  setOpenModalUnstake,
} from "@/redux/slice/modalSlice";
import { STRATEGY_TYPE, columnsLending } from "@/utils/constants";
import {
  formatLargeNumber,
  getDecimalAndLogoUrl,
  getProtocolNameAndFunc,
} from "@/utils/functions";
import { Box, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import clsx from "clsx";
import { AppButton, StyledTableContainer, TableHome } from "..";

export const TableStake = () => {
  const dispatch = useAppDispatch();
  const { strategies } = useAppSelector((state) => state.strategies);
  return (
    <StyledTableContainer className='mt-[38px] bg-white bg-opacity-40'>
      <TableHome variant='simple'>
        <Thead>
          <Tr>
            {columnsLending.map((column) => (
              <Th
                className={clsx({
                  "!text-end":
                    column.key === "total_supply" ||
                    column.key === "max_ltv" ||
                    column.key === "supply_apy",
                  "!text-center": column.key !== "asset",
                })}
                key={column.key}
              >
                {column.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {strategies
            .filter((ele) => ele.strategyType === STRATEGY_TYPE.STAKING)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((strategies) => {
              const tokenInfo = getDecimalAndLogoUrl(strategies.name);
              return (
                <Tr key={strategies.id}>
                  <Td className='flex gap-2 items-center'>
                    <img
                      width={32}
                      height={32}
                      src={tokenInfo?.logo_url ?? ""}
                      className='rounded-full'
                    />
                    {strategies.displayName}
                  </Td>
                  <Td className='!text-right'>
                    {formatLargeNumber(strategies.totalValueLocked)}
                  </Td>
                  <Td className='flex gap-2 items-center justify-center'>
                    <img
                      width={32}
                      height={32}
                      src={
                        iconToken[strategies.protocols[0]!.toLocaleLowerCase()]
                      }
                      className='rounded-full'
                    />
                    {
                      getProtocolNameAndFunc(strategies.protocols[0]!)
                        .protocolDisplayName
                    }
                  </Td>
                  <Td className='!text-right'>50%</Td>
                  <Td className='!text-center'>Low</Td>
                  <Td className='!text-right'>
                    {Number(strategies.apr).toFixed(2)}%
                  </Td>
                  <Td className='!text-right'>
                    <Box className=' flex gap-4'>
                      <AppButton
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(
                            setOpenModalStake({
                              isOpen: true,
                              strategies: strategies,
                            })
                          );
                        }}
                        className='!bg-blue-200 !text-blue-500'
                      >
                        Stake
                      </AppButton>
                      <AppButton
                        className='!text-primary-400 !bg-white !border !border-primary-300 shadow-sm'
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(
                            setOpenModalUnstake({
                              isOpen: true,
                              strategies: strategies,
                            })
                          );
                        }}
                      >
                        Unstake
                      </AppButton>
                    </Box>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </TableHome>
    </StyledTableContainer>
  );
};
