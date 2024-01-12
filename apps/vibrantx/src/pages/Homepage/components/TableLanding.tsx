import { arrowrRight, chevronDown, chevronUp } from "@/assets/home";
import iconToken from "@/common/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  setOpenModalStake,
  setOpenModalSupply,
  setOpenModalUnstake,
  setOpenModalWithdraw,
} from "@/redux/slice/modalSlice";
import { STRATEGY_TYPE, columnsLending } from "@/utils/constants";
import {
  formatLargeNumber,
  getDecimalAndLogoUrl,
  getProtocolNameAndFunc,
} from "@/utils/functions";
import { Box, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";
import { 
  // useNavigate, 
  useSearchParams } from "react-router-dom";
import {
  AppButton,
  BorderGradientTable,
  StyledTableContainer,
  TableHome,
  TrTable,
} from "..";

const Column = ({ strategies, tokenInfo, hiddenRow, dispatch }: any) => {
  const [show, setShow] = useState<boolean>(false);
  // const navigate = useNavigate();

  return (
    <>
      <TrTable
      //  onClick={() => navigate(`/tokenpage/${strategies.id}`)}
       >
        <Td
          className={clsx(
            hiddenRow.indexOf(columnsLending[0].key) !== -1 && "hidden"
          )}
        >
          <div className='flex gap-2 items-center'>
            <img
              className='w-8 h-8 rounded-full'
              src={tokenInfo?.logo_url ?? ""}
            />
            {strategies.displayName}
          </div>
        </Td>
        <Td
          className={clsx(
            hiddenRow.indexOf(columnsLending[1].key) !== -1 && "hidden"
          )}
        >
          <Box className='flex gap-2 items-center '>
            <SVG
              width={32}
              height={32}
              src={iconToken[strategies.protocols[0]!.toLocaleLowerCase()]}
            />
            {
              getProtocolNameAndFunc(strategies.protocols[0]!)
                .protocolDisplayName
            }
          </Box>
        </Td>
        <Td
          className={clsx(
            hiddenRow.indexOf(columnsLending[2].key) !== -1 && "hidden"
          )}
        >
          Low
        </Td>
        <Td
          className={clsx(
            "!text-right",
            hiddenRow.indexOf(columnsLending[3].key) !== -1 && "hidden"
          )}
        >
          {formatLargeNumber(strategies.totalValueLocked)}
        </Td>

        <Td
          className={clsx(
            "!text-right",
            hiddenRow.indexOf(columnsLending[4].key) !== -1 && "hidden"
          )}
        >
          {strategies.ariesDetail?.maximumLtv
            ? `${strategies.ariesDetail?.maximumLtv}%`
            : "-"}
        </Td>

        <Td className={clsx("!text-right sticky right-0 z-50")}>
          {Number(strategies.apr).toFixed(2)}%
        </Td>
        <Td className='!text-right !max-w-[226px]'>
          {hiddenRow.indexOf(columnsLending[6].key) !== -1 ? (
            <Box
              onClick={(e) => {
                e.stopPropagation();
                setShow(!show);
              }}
              className='accordion-header'
            >
              {show ? (
                <SVG width={24} height={24} src={chevronUp} />
              ) : (
                <SVG width={24} height={24} src={chevronDown} />
              )}
            </Box>
          ) : (
            <>
              {strategies?.strategyType === STRATEGY_TYPE.LENDING ? (
                <Box className=' flex gap-4'>
                  <AppButton
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        setOpenModalSupply({
                          isOpen: true,
                          strategies: strategies,
                        })
                      );
                    }}
                    className='!bg-blue-200 !text-blue-500'
                  >
                    Supply
                  </AppButton>
                  <AppButton
                    className='!text-primary-400 !bg-white !border !border-primary-300 shadow-sm'
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        setOpenModalWithdraw({
                          isOpen: true,
                          strategies: strategies,
                        })
                      );
                    }}
                  >
                    Withdraw
                  </AppButton>
                </Box>
              ) : (
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
              )}
            </>
          )}
        </Td>
      </TrTable>
      <Tr>
        <Td
          colSpan={columnsLending.length - hiddenRow?.length + 1}
          className={clsx("min-[950px]:hidden !py-0")}
        >
          <Box
            className={clsx(
              show && "accordion-content-in ",
              "accordion-content-out"
            )}
          >
            <Box className='py-3  flex flex-wrap justify-between !text-sm sm:!text-lg w-full gap-3 items-center '>
              <Box
                className={clsx(
                  "!text-right flex",
                  hiddenRow.indexOf(columnsLending[1].key) === -1 && "hidden"
                )}
              >
                <div className='text-zinc-500 text-sm font-medium'>
                  {columnsLending[1].label}{" "}
                </div>
                {"   "}
                <div className=' text-neutral-700 text-sm font-semibold '>
                  {formatLargeNumber(strategies.totalValueLocked)}
                </div>
              </Box>
              <Box
                className={clsx(
                  "flex gap-2 items-center justify-center",
                  hiddenRow.indexOf(columnsLending[2].key) === -1 && "hidden"
                )}
              >
                <div className='text-zinc-500 text-sm font-medium'>
                  {columnsLending[2].label}{" "}
                </div>
                <div className='text-neutral-700 text-sm font-semibold flex items-center gap-1'>
                  {iconToken[strategies.protocols[0]!.toLocaleLowerCase()] && (
                    <SVG
                      width={40}
                      height={40}
                      src={
                        iconToken[strategies.protocols[0]!.toLocaleLowerCase()]
                      }
                    />
                  )}
                  <div className='!text-neutral-700'>
                    {strategies.protocols[0]!}
                  </div>
                </div>
              </Box>
              <Box
                className={clsx(
                  "!text-right flex gap-1",
                  hiddenRow.indexOf(columnsLending[3].key) === -1 && "hidden"
                )}
              >
                <div className='text-zinc-500 text-sm font-medium'>
                  {columnsLending[3].label}{" "}
                </div>{" "}
                <div className='text-neutral-700 text-sm font-semibold'>
                  50%
                </div>
              </Box>
              <Box
                className={clsx(
                  "!text-right flex gap-1",
                  hiddenRow.indexOf(columnsLending[4].key) === -1 && "hidden"
                )}
              >
                <div className='text-zinc-500 text-sm font-medium'>
                  {columnsLending[4].label}{" "}
                </div>{" "}
                <div className='text-neutral-700 text-sm font-semibold'>
                  Low
                </div>
              </Box>
              {strategies?.strategyType === STRATEGY_TYPE.LENDING ? (
                <Box className=' flex gap-4 justify-between sm:mx-0 mx-auto'>
                  <AppButton
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        setOpenModalSupply({
                          isOpen: true,
                          strategies: strategies,
                        })
                      );
                    }}
                    className='!bg-blue-200 !text-blue-500 w-[140px] '
                  >
                    Supply
                  </AppButton>
                  <AppButton
                    className='!text-primary-400 !bg-white !border !border-primary-300 shadow-sm w-[140px] '
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        setOpenModalSupply({
                          isOpen: true,
                          strategies: strategies,
                        })
                      );
                    }}
                  >
                    Withdraw
                  </AppButton>
                </Box>
              ) : (
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
                    className='!bg-blue-200 !text-blue-500 w-[140px] '
                  >
                    Stake
                  </AppButton>
                  <AppButton
                    className='!text-primary-400 !bg-white !border !border-primary-300 shadow-sm w-[140px] '
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
              )}
            </Box>
          </Box>
        </Td>
      </Tr>
    </>
  );
};

export const TableLanding = () => {
  const dispatch = useAppDispatch();
  const { strategies } = useAppSelector((state) => state.strategies);
  const [hiddenRow, setHiddenRow] = useState<string[]>([]);
  const tableRef = useRef(null);
  const [searchParams] = useSearchParams();
  const product = searchParams.get("product") || "Earn";
  useEffect(() => {
    const observer = new ResizeObserver(handleResize);
    if (tableRef.current) {
      observer.observe(tableRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [tableRef]);

  const handleResize = (entries: any) => {
    entries.forEach((entry: any) => {
      const { width } = entry.contentRect;
      if (tableRef.current) {
        if (width < 900) {
          let row = Math.round(width / (900 / (columnsLending.length - 2)));

          let tmp = [];
          for (let i = row - 1; i < columnsLending.length; i++) {
            if (!columnsLending[i].hidden) {
              tmp.push(columnsLending[i].key);
            }
          }
          setHiddenRow(tmp);
        } else {
          setHiddenRow([]);
        }
      }
    });
  };

  return (
    <BorderGradientTable className='mt-[38px]'>
      <StyledTableContainer className=' bg-white bg-opacity-40 ' ref={tableRef}>
        <TableHome variant='simple' className=' gradient-table '>
          <Thead>
            <Tr>
              {columnsLending.map((column, index) => {
                return (
                  <Th
                    className={clsx({
                      "!text-end":
                        column.key === "total_supply" ||
                        column.key === "max_ltv" ||
                        column.key === "supply_apy",

                      hidden:
                        hiddenRow.indexOf(column.key) !== -1 &&
                        index !== columnsLending.length - 1,
                    })}
                    key={column.key}
                  >
                    {column.label}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {strategies
              .filter((ele) =>
                product !== "Earn" ? ele.strategyType === product : ele
              )
              .sort((a, b) => b.name.localeCompare(a.name))
              .map((strategies) => {
                const tokenInfo = getDecimalAndLogoUrl(strategies.name);

                return (
                  <Column
                    strategies={strategies}
                    tokenInfo={tokenInfo}
                    hiddenRow={hiddenRow}
                    dispatch={dispatch}
                    key={strategies.id}
                  />
                );
              })}
          </Tbody>
        </TableHome>
      </StyledTableContainer>
      {strategies?.length > 5 && (
        <Box className='flex gap-1 pt-3 justify-center items-center'>
          <span className=' text-indigo-500 text-base font-bold'>View all</span>
          <SVG width={24} height={24} src={arrowrRight} />
        </Box>
      )}
    </BorderGradientTable>
  );
};
