import { arrowrRight, chevronDown, chevronUp } from "@/assets/home";
import iconToken from "@/common/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  setOpenModalSupply,
  setOpenModalWithdraw,
} from "@/redux/slice/modalSlice";
import { STRATEGY_TYPE, columnsLending } from "@/utils/constants";
import { formatLargeNumber, getDecimalAndLogoUrl } from "@/utils/functions";
import { Box, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";
import { useNavigate } from "react-router-dom";
import { AppButton, StyledTableContainer, TableHome } from "..";

const Column = ({ strategies, tokenInfo, hiddenRow, dispatch }: any) => {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <Tr onClick={() => navigate(`/tokenpage/${strategies.id}`)}>
        <Td
          className={clsx(
            "flex gap-2 items-center",
            hiddenRow.indexOf(columnsLending[0].key) !== -1 && "hidden"
          )}
        >
          <img
            className='w-10 h-10 rounded-full'
            src={tokenInfo?.logo_url ?? ""}
          />
          {strategies.displayName}
        </Td>
        <Td
          className={clsx(
            "!text-right",
            hiddenRow.indexOf(columnsLending[1].key) !== -1 && "hidden"
          )}
        >
          {formatLargeNumber(strategies.totalValueLocked)}
        </Td>
        <Td
          className={clsx(
            "flex gap-2 items-center justify-center",
            hiddenRow.indexOf(columnsLending[2].key) !== -1 && "hidden"
          )}
        >
          <SVG
            width={40}
            height={40}
            src={iconToken[strategies.protocols[0]!.toLocaleLowerCase()]}
          />
          {strategies.protocols[0]!}
        </Td>
        <Td
          className={clsx(
            "!text-right",
            hiddenRow.indexOf(columnsLending[3].key) !== -1 && "hidden"
          )}
        >
          {strategies.ariesDetail?.maximumLtv}%
        </Td>
        <Td
          className={clsx(
            "!text-right",
            hiddenRow.indexOf(columnsLending[4].key) !== -1 && "hidden"
          )}
        >
          Low
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
                <SVG width={24} height={24} src={chevronDown} />
              ) : (
                <SVG width={24} height={24} src={chevronUp} />
              )}
            </Box>
          ) : (
            <Box className=' flex gap-4 justify-between'>
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
          )}
        </Td>
      </Tr>
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
                  {columnsLending[1].label}
                </div>{" "}
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
                </div>{" "}
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
    <Box>
      <StyledTableContainer
        className='mt-[38px] bg-white bg-opacity-40'
        ref={tableRef}
      >
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
                      "!text-center": column.key !== "asset",

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
              .filter((ele) => ele.strategyType === STRATEGY_TYPE.LENDING)
              .map((strategies) => {
                const tokenInfo = getDecimalAndLogoUrl(strategies.displayName);

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
    </Box>
  );
};
