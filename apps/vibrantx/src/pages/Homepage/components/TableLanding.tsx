import { chevronDown, chevronUp } from "@/assets/home";
import lightningIcon from "@/assets/lightning.svg";
import iconToken from "@/common/icons";
import { Asset } from "@/components/table";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  setOpenModalAddLiquidity,
  setOpenModalStake,
  setOpenModalSupply,
} from "@/redux/slice/modalSlice";
import { Strategies } from "@/services";
import { STRATEGY_TYPE, columnsLending } from "@/utils/constants";
import {
  findMaxAPRIds,
  formatLargeNumber,
  getProtocolNameAndFunc,
  getTokenInfo,
} from "@/utils/functions";
import { ITokenInfo } from "@/utils/utils.type";
import { Box, Flex, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  AppButton,
  BorderGradientTable,
  StyledTableContainer,
  TableHome,
  TrTable,
} from "..";
type HandleResize = (entries: ResizeObserverEntry[]) => void;
interface ResizeObserverEntry {
  contentRect: {
    width: number;
    // Các thuộc tính khác nếu cần thiết
  };
}
type ColumnProps = {
  strategies: Strategies;
  tokenInfo: ITokenInfo;
  hiddenRow: string[];
};

const Column = ({ strategies, tokenInfo, hiddenRow }: ColumnProps) => {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <>
      <TrTable
        onClick={() => {
          navigate(`/tokenpage/${strategies.id}`);
        }}
      >
        <Td
          className={clsx(
            hiddenRow.indexOf(columnsLending[0].key) !== -1 && "hidden",
          )}
        >
          {Asset(strategies, tokenInfo)}
        </Td>
        <Td
          className={clsx(
            hiddenRow.indexOf(columnsLending[1].key) !== -1 && "hidden",
          )}
        >
          <Box className="flex gap-2 items-center ">
            <img
              src={iconToken[strategies.protocols[0]!.toLocaleLowerCase()]}
              alt=""
              className="w-8 h-8"
            />
            {
              getProtocolNameAndFunc(strategies.protocols[0]!)
                .protocolDisplayName
            }
          </Box>
        </Td>
        <Td
          className={clsx(
            hiddenRow.indexOf(columnsLending[2].key) !== -1 && "hidden",
          )}
        >
          Low
        </Td>
        <Td
          className={clsx(
            "!text-right",
            hiddenRow.indexOf(columnsLending[3].key) !== -1 && "hidden",
          )}
        >
          {formatLargeNumber(strategies.totalValueLocked)}
        </Td>

        <Td
          className={clsx(
            "!text-right",
            hiddenRow.indexOf(columnsLending[4].key) !== -1 && "hidden",
          )}
        >
          {strategies.ariesDetail?.maximumLtv
            ? `${strategies.ariesDetail?.maximumLtv}%`
            : "--"}
        </Td>

        <Td className={clsx("!text-right sticky right-0 z-50")}>
          <Flex justifyContent={"flex-end"} alignItems={"center"} gap={1}>
            {[
              ...findMaxAPRIds().maxLendingIds,
              ...findMaxAPRIds().maxStakingIds,
            ].includes(strategies.id) ? (
              <SVG src={lightningIcon} />
            ) : (
              ""
            )}
            {Number(strategies.apr).toFixed(2)}%
          </Flex>
        </Td>
        <Td className="!text-right !max-w-[226px]">
          {hiddenRow.indexOf(columnsLending[6].key) !== -1 ? (
            <Box
              onClick={(e) => {
                e.stopPropagation();
                setShow(!show);
              }}
              className="accordion-header"
            >
              {show ? (
                <SVG width={24} height={24} src={chevronUp} />
              ) : (
                <SVG width={24} height={24} src={chevronDown} />
              )}
            </Box>
          ) : (
            <>
              {strategies?.strategyType === STRATEGY_TYPE.LENDING ||
              strategies?.strategyType === STRATEGY_TYPE.LIQUIDITY ? (
                <AppButton
                  onClick={(e) => {
                    e.stopPropagation();
                    if (strategies?.strategyType === STRATEGY_TYPE.LIQUIDITY) {
                      return dispatch(
                        setOpenModalAddLiquidity({
                          isOpen: true,
                          strategies: strategies,
                        }),
                      );
                    }
                    dispatch(
                      setOpenModalSupply({
                        isOpen: true,
                        strategies: strategies,
                      }),
                    );
                  }}
                  className="!bg-blue-200 !text-blue-500 w-[122px] h-[36px]"
                >
                  Supply
                </AppButton>
              ) : (
                <AppButton
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      setOpenModalStake({
                        isOpen: true,
                        strategies: strategies,
                      }),
                    );
                  }}
                  className="!bg-blue-200 !text-blue-500 w-[122px] h-[36px]"
                >
                  Stake
                </AppButton>
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
              "accordion-content-out",
            )}
          >
            <Box className="py-3  flex flex-wrap justify-between !text-sm sm:!text-lg w-full gap-3 items-center ">
              <Box
                className={clsx(
                  "!text-right flex gap-1",
                  hiddenRow.indexOf(columnsLending[3].key) === -1 && "hidden",
                )}
              >
                <div className="text-zinc-500 text-sm font-medium">
                  {columnsLending[3].label}{" "}
                </div>{" "}
                <div className="text-neutral-700 text-sm font-semibold">
                  {formatLargeNumber(strategies.totalValueLocked)}
                </div>
              </Box>
              <Box
                className={clsx(
                  "!text-right flex gap-1 items-center",
                  hiddenRow.indexOf(columnsLending[1].key) === -1 && "hidden",
                )}
              >
                <div className="text-zinc-500 text-sm font-medium">
                  {columnsLending[1].label}{" "}
                </div>
                <div className=" text-neutral-700 text-sm font-semibold ">
                  <Box className="flex gap-2 items-center ">
                    <SVG
                      width={32}
                      height={32}
                      src={
                        iconToken[strategies.protocols[0]!.toLocaleLowerCase()]
                      }
                    />
                    {
                      getProtocolNameAndFunc(strategies.protocols[0]!)
                        .protocolDisplayName
                    }
                  </Box>
                </div>
              </Box>
              <Box
                className={clsx(
                  "!text-right flex gap-1",
                  hiddenRow.indexOf(columnsLending[4].key) === -1 && "hidden",
                )}
              >
                <div className="text-zinc-500 text-sm font-medium">
                  {columnsLending[4].label}{" "}
                </div>{" "}
                <div className="text-neutral-700 text-sm font-semibold">
                  {strategies.ariesDetail?.maximumLtv
                    ? `${strategies.ariesDetail?.maximumLtv}%`
                    : "-"}
                </div>
              </Box>
              <Box
                className={clsx(
                  "flex gap-2 items-center justify-center",
                  hiddenRow.indexOf(columnsLending[2].key) === -1 && "hidden",
                )}
              >
                <div className="text-zinc-500 text-sm font-medium">
                  {columnsLending[2].label}{" "}
                </div>
                <div className="text-neutral-700 text-sm font-semibold flex items-center gap-1">
                  Low
                </div>
              </Box>

              {strategies?.strategyType === STRATEGY_TYPE.LENDING ||
              strategies?.strategyType === STRATEGY_TYPE.LIQUIDITY ? (
                <Box className=" flex justify-between sm:mx-0 mx-auto">
                  <AppButton
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        setOpenModalSupply({
                          isOpen: true,
                          strategies: strategies,
                        }),
                      );
                    }}
                    className="!bg-blue-200 !text-blue-500 w-[122px] h-[36px] "
                  >
                    Supply
                  </AppButton>
                </Box>
              ) : (
                <Box className=" flex gap-4">
                  <AppButton
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        setOpenModalStake({
                          isOpen: true,
                          strategies: strategies,
                        }),
                      );
                    }}
                    className="!bg-blue-200 !text-blue-500 w-[122px] h-[36px] "
                  >
                    Stake
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

  const handleResize: HandleResize = (entries) => {
    entries.forEach((entry) => {
      const { width } = entry.contentRect;
      if (tableRef.current) {
        if (width < 900) {
          const row = Math.round(width / (900 / (columnsLending.length - 2)));

          const tmp = [];
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
    <BorderGradientTable className="mt-[38px]">
      <StyledTableContainer className=" bg-white bg-opacity-40 " ref={tableRef}>
        <TableHome variant="simple" className=" gradient-table ">
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
              .filter((ele) => {
                if (product !== "Earn" && product !== "Positions") {
                  return ele.strategyType === product;
                } else {
                  return ele;
                }
              })
              .sort((a, b) => b.name.localeCompare(a.name))
              .map((strategies) => {
                const tokenInfo = getTokenInfo(strategies.stakeToken![0]);
                return (
                  <Column
                    strategies={strategies}
                    tokenInfo={tokenInfo}
                    hiddenRow={hiddenRow}
                    key={strategies.id}
                  />
                );
              })}
          </Tbody>
        </TableHome>
      </StyledTableContainer>
      {/* {strategies?.length > 5 && (
        <Box className="flex gap-1 pt-3 justify-center items-center">
          <span className=" text-indigo-500 text-base font-bold">View all</span>
          <SVG width={24} height={24} src={arrowrRight} />
        </Box>
      )} */}
    </BorderGradientTable>
  );
};
