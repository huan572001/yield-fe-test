import iconToken from "@/common/icons";
import { Strategies } from "@/services";
import { STRATEGY_TYPE, columnsPositions } from "@/utils/constants";
import {
  formatLargeNumber,
  formatNumberWithDecimal,
  formatToLocaleString,
  getProtocolNameAndFunc,
  getTokenInfo,
} from "@/utils/functions";

import { chevronDown, chevronUp, claim, dot, minus } from "@/assets/home";
import { CustomSVG } from "@/components/Icon";
import { Asset } from "@/components/table";
import {
  setOpenModalAddLiquidity,
  setOpenModalRemoveLiquidity,
  setOpenModalStake,
  setOpenModalSupply,
  setOpenModalUnstake,
  setOpenModalWithdraw,
} from "@/redux/slice/modalSlice";
import { IUserPositions } from "@/redux/slice/strategiesSlice";
import { ITokenInfo } from "@/utils/utils.type";
import { Box, Tag, Tbody, Td, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StyledTableContainer, TableHome, TrTable } from "..";

type HandleResize = (entries: ResizeObserverEntry[]) => void;
interface ResizeObserverEntry {
  contentRect: {
    width: number;
    // Các thuộc tính khác nếu cần thiết
  };
}

type TableProp = {
  dataPosition: IUserPositions[];
  handleClaimRewards: (
    protocols: string,
    rewardsAddress: `${string}::${string}::${string}`,
  ) => void;
};

type ColumnProps = {
  strategies: IUserPositions;
  tokenInfo: ITokenInfo;
  hiddenRow: string[];
  handleClaimRewards: (
    protocols: string,
    rewardsAddress: `${string}::${string}::${string}`,
  ) => void;
};

type ActionProp = {
  strategies: IUserPositions;
  handleClaimRewards: (
    protocols: string,
    rewardsAddress: `${string}::${string}::${string}`,
  ) => void;
};

const Rewards = (strategies: IUserPositions) => {
  return (
    <Box className="flex justify-end">
      <Tooltip
        hasArrow
        label={
          <Box>
            <span className="text-neutralGray-500 text-xs font-medium  leading-none">
              Claimable rewards:{" "}
            </span>
            <span className="text-neutralGray-700 text-xs font-semibold leading-none">
              {Number(strategies.rewards)
                ? `$${formatLargeNumber(
                    formatNumberWithDecimal(strategies.rewards, 2),
                  )}`
                : "-"}
              <br />
            </span>
            {/* <span className="text-neutralGray-500 text-xs font-medium leading-none">
              Pending rewards:{" "}
            </span>
            <span className="text-neutralGray-700 text-xs font-semibold leading-none">
              0
            </span> */}
          </Box>
        }
        placement="left"
        bg="white"
        textColor="gray.500"
        px={3}
        py={2}
        rounded="base"
        boxShadow="lg"
      >
        <Box className="border-b border-dotted border-neutral-700 w-auto">
          {Number(strategies.rewards)
            ? `$${formatLargeNumber(
                formatNumberWithDecimal(strategies.rewards, 2),
              )}`
            : "-"}
        </Box>
      </Tooltip>
    </Box>
  );
};
const Amount = (strategies: IUserPositions) => {
  return (
    <Box className="flex justify-end">
      <Tooltip
        hasArrow
        label={
          <Box>
            <span className="text-neutralGray-500 text-xs font-medium  leading-none">
              Deposit:{" "}
            </span>
            <span className="text-neutralGray-700 text-xs font-semibold leading-none">
              {formatToLocaleString(strategies.amount, 4)}
              <br />
            </span>
            {/* <span className="text-neutralGray-500 text-xs font-medium leading-none">
              Auto compound reward:{" "}
            </span>
            <span className="text-neutralGray-700 text-xs font-semibold leading-none">
              0
            </span> */}
          </Box>
        }
        placement="left"
        bg="white"
        textColor="gray.500"
        px={3}
        py={2}
        rounded="base"
        boxShadow="lg"
      >
        <Box className="border-b border-dotted border-neutral-700 w-auto">
          {formatToLocaleString(strategies.amount, 2)}
        </Box>
      </Tooltip>
    </Box>
  );
};
const Action = ({ strategies, handleClaimRewards }: ActionProp) => {
  const dispatch = useDispatch();
  const TooltipAction = (child: ReactNode, label: string) => {
    return (
      <Tooltip
        hasArrow
        label={label}
        placement="top"
        bg="white"
        textColor="gray.500"
        px={3}
        py={2}
        rounded="base"
        boxShadow="lg"
      >
        <motion.div whileHover={{ scale: 1.2 }}>{child}</motion.div>
      </Tooltip>
    );
  };
  return (
    <Box className="flex justify-center gap-2">
      {TooltipAction(
        <SVG
          src={dot}
          onClick={(e) => {
            e.stopPropagation();
            switch (strategies.strategyType) {
              case STRATEGY_TYPE.STAKING:
                return dispatch(
                  setOpenModalStake({
                    isOpen: true,
                    strategies: strategies,
                  }),
                );

              case STRATEGY_TYPE.LENDING:
                return dispatch(
                  setOpenModalSupply({
                    isOpen: true,
                    strategies: strategies,
                  }),
                );
              case STRATEGY_TYPE.LIQUIDITY:
                return dispatch(
                  setOpenModalAddLiquidity({
                    isOpen: true,
                    strategies: strategies,
                  }),
                );
              default:
                break;
            }
          }}
        />,
        strategies.strategyType === STRATEGY_TYPE.STAKING ? "Stake" : "Supply",
      )}

      {TooltipAction(
        <SVG
          src={minus}
          onClick={(e) => {
            e.stopPropagation();
            switch (strategies.strategyType) {
              case STRATEGY_TYPE.STAKING:
                return dispatch(
                  setOpenModalUnstake({
                    isOpen: true,
                    strategies: strategies,
                  }),
                );

              case STRATEGY_TYPE.LENDING:
                return dispatch(
                  setOpenModalWithdraw({
                    isOpen: true,
                    strategies: strategies,
                  }),
                );
              case STRATEGY_TYPE.LIQUIDITY:
                return dispatch(
                  setOpenModalRemoveLiquidity({
                    isOpen: true,
                    strategies: strategies,
                  }),
                );
              default:
                break;
            }
            // if (strategies.strategyType === STRATEGY_TYPE.STAKING) {
            //   dispatch(
            //     setOpenModalUnstake({
            //       isOpen: true,
            //       strategies: strategies,
            //     })
            //   );
            // } else {
            //   dispatch(
            //     setOpenModalWithdraw({
            //       isOpen: true,
            //       strategies: strategies,
            //     })
            //   );
            // }
          }}
        />,
        strategies.strategyType === STRATEGY_TYPE.STAKING
          ? "Unstake"
          : "Withdraw",
      )}
      {TooltipAction(
        <CustomSVG
          src={claim}
          disabled={
            strategies.strategyType === STRATEGY_TYPE.STAKING ||
            (strategies.positions && strategies.positions[1]! === "0")
          }
          onClick={(e: any) => {
            e.stopPropagation();
            handleClaimRewards(
              strategies.protocols[0]!,
              strategies.positionToken,
            );
          }}
        />,
        "Claim",
      )}
    </Box>
  );
};
const Column = ({
  strategies,
  tokenInfo,
  hiddenRow,
  handleClaimRewards,
}: ColumnProps) => {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const icon = iconToken[strategies.protocols[0]!.toLocaleLowerCase()];

  return (
    <>
      <TrTable
        onClick={() => {
          navigate(`/tokenpage/${strategies.id}`);
        }}
      >
        <Td
          className={clsx(
            hiddenRow.indexOf(columnsPositions[0].key) !== -1 && "hidden",
          )}
        >
          {Asset(strategies, tokenInfo)}
        </Td>
        <Td
          className={clsx(
            hiddenRow.indexOf(columnsPositions[1].key) !== -1 && "hidden",
          )}
        >
          <Tag
            className={clsx("!px-3 !py-1 !rounded-full", {
              "!bg-[#FEF9F5] !text-[#F2994A]":
                strategies.strategyType === STRATEGY_TYPE.LENDING,
              "!bg-[#F1FCF6] !text-[#219653]":
                strategies.strategyType === STRATEGY_TYPE.STAKING,
              "!bg-[#E6F4FF] !text-[#0958D9]":
                strategies.strategyType === STRATEGY_TYPE.LIQUIDITY,
            })}
          >
            {strategies.strategyType}
          </Tag>
        </Td>
        <Td
          className={clsx(
            hiddenRow.indexOf(columnsPositions[2].key) !== -1 && "hidden",
          )}
        >
          <Box className="flex gap-2 items-center">
            <img
              className="w-8 h-8"
              src={iconToken[strategies.protocols[0]!.toLocaleLowerCase()]}
              alt="logo"
            />
            {
              getProtocolNameAndFunc(strategies.protocols[0]!)
                .protocolDisplayName
            }
          </Box>
        </Td>
        <Td
          className={clsx(
            "!text-right",
            hiddenRow.indexOf(columnsPositions[3].key) !== -1 && "hidden",
          )}
        >
          {Amount(strategies)}
        </Td>

        <Td
          className={clsx(
            "!text-right",
            hiddenRow.indexOf(columnsPositions[4].key) !== -1 && "hidden",
          )}
        >
          ${formatToLocaleString(strategies.value, 2)}
        </Td>
        <Td className={clsx("!text-right sticky right-0 z-50")}>
          {Number(strategies.apr).toFixed(2)}%
        </Td>
        <Td
          className={clsx(
            "!text-right",
            hiddenRow.indexOf(columnsPositions[6].key) !== -1 && "hidden",
          )}
        >
          {Rewards(strategies)}
        </Td>
        <Td className={clsx("!text-center ")}>
          {hiddenRow.indexOf(columnsPositions[7].key) !== -1 ? (
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
            <Action
              strategies={strategies}
              handleClaimRewards={handleClaimRewards}
            />
          )}
        </Td>
      </TrTable>
      <Tr>
        <Td
          colSpan={columnsPositions.length - hiddenRow?.length + 1}
          className={clsx("min-[1050px]:hidden !py-0")}
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
                  hiddenRow.indexOf(columnsPositions[1].key) === -1 && "hidden",
                )}
              >
                <div className="text-zinc-500 text-sm font-medium">
                  {columnsPositions[1].label}
                </div>{" "}
                <div className="text-neutral-700 text-sm font-semibold">
                  <Tag
                    className={clsx("!px-3 !py-1 !rounded-full", {
                      "!bg-[#FEF9F5] !text-[#F2994A]":
                        strategies.strategyType === STRATEGY_TYPE.LENDING,
                      "!bg-[#F1FCF6] !text-[#219653]":
                        strategies.strategyType === STRATEGY_TYPE.STAKING,
                      "!bg-[#E6F4FF] !text-[#0958D9]":
                        strategies.strategyType === STRATEGY_TYPE.LIQUIDITY,
                    })}
                  >
                    {strategies.strategyType}
                  </Tag>
                </div>
              </Box>
              <Box
                className={clsx(
                  "!text-right flex gap-1 items-center",
                  hiddenRow.indexOf(columnsPositions[2].key) === -1 && "hidden",
                )}
              >
                <div className="text-zinc-500 text-sm font-medium">
                  {columnsPositions[2].label}
                </div>{" "}
                <div className="text-neutral-700 text-sm font-semibold">
                  <Box className="flex gap-2 items-center w-[100px]">
                    <img
                      className="w-6 h-6"
                      src={
                        // iconToken[strategies.protocols[0]!.toLocaleLowerCase()]
                        icon
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
                  hiddenRow.indexOf(columnsPositions[3].key) === -1 && "hidden",
                )}
              >
                <div className="text-zinc-500 text-sm font-medium">
                  {columnsPositions[3].label}{" "}
                </div>{" "}
                <div className="text-neutral-700 text-sm font-semibold">
                  <Box className="flex gap-2 items-center">
                    {Amount(strategies)}
                  </Box>
                </div>
              </Box>
              <Box
                className={clsx(
                  "flex gap-2 items-center justify-center",
                  hiddenRow.indexOf(columnsPositions[4].key) === -1 && "hidden",
                )}
              >
                <div className="text-zinc-500 text-sm font-medium">
                  {columnsPositions[4].label}{" "}
                </div>{" "}
                <div className="text-neutral-700 text-sm font-semibold">
                  ${formatToLocaleString(strategies.value, 2)}
                </div>
              </Box>
              <Box
                className={clsx(
                  "flex gap-2 items-center justify-center",
                  hiddenRow.indexOf(columnsPositions[6].key) === -1 && "hidden",
                )}
              >
                <div className="text-zinc-500 text-sm font-medium">
                  {columnsPositions[6].label}{" "}
                </div>{" "}
                <div className="text-neutral-700 text-sm font-semibold">
                  {Rewards(strategies)}
                </div>
              </Box>
              <Box className=" flex justify-between sm:mx-0 mx-auto">
                <Action
                  strategies={strategies}
                  handleClaimRewards={handleClaimRewards}
                />
              </Box>
            </Box>
          </Box>
        </Td>
      </Tr>
    </>
  );
};
const TablePosition = ({ dataPosition, handleClaimRewards }: TableProp) => {
  const [hiddenRow, setHiddenRow] = useState<string[]>([]);
  const tableRef = useRef(null);
  // const { userPositions } = useAppSelector((state) => state.strategies);

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
        if (width < 1000) {
          const row: number = Math.round(
            width / (1000 / (columnsPositions.length - 2)),
          );

          const tmp = [];
          for (let i = row - 1; i < columnsPositions.length; i++) {
            if (!columnsPositions[i].hidden) {
              tmp.push(columnsPositions[i].key);
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
    <StyledTableContainer
      className="mt-[38px] bg-white bg-opacity-40"
      ref={tableRef}
    >
      <TableHome variant="simple">
        <Thead>
          <Tr>
            {columnsPositions.map((column, index) => (
              <Th
                className={clsx({
                  "!text-end":
                    column.key === "amount" ||
                    column.key === "apr" ||
                    column.key === "value" ||
                    column.key === "rewards",
                  "!text-center": column.key === "action",
                  hidden:
                    hiddenRow.indexOf(column.key) !== -1 &&
                    index !== columnsPositions.length,
                })}
                key={column.key}
              >
                {column.label}
              </Th>
            ))}
            {/* <Th className="flex gap-1 justify-center">
                <Box>Action</Box> */}
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
            {/* </Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {dataPosition
            .sort(
              (a: Strategies, b: Strategies) =>
                (a.strategyType
                  .toLocaleLowerCase()
                  .localeCompare(b.strategyType.toLocaleLowerCase()) &&
                  a.name
                    .toLocaleLowerCase()
                    .localeCompare(b.name.toLocaleLowerCase(), "en", {
                      sensitivity: "base",
                    })) ||
                a?.protocols[0]!.toLocaleLowerCase().localeCompare(
                  b?.protocols[0]!.toLocaleLowerCase(),
                ),
            )
            .map((ele: IUserPositions) => {
              const tokenInfo = getTokenInfo(ele.stakeToken[0]);
              return (
                <Column
                  strategies={ele}
                  tokenInfo={tokenInfo}
                  hiddenRow={hiddenRow}
                  handleClaimRewards={handleClaimRewards}
                  key={ele.id}
                />
              );
            })}
        </Tbody>
      </TableHome>
    </StyledTableContainer>
  );
};
export default TablePosition;
