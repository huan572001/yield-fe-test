import { Box, Tabs, TabList, TabPanel, Tab, TabPanels } from "@chakra-ui/react";
import SupplyAndBorrow from "./component/SupplyAndBorrow";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import withPageTracking from "@/components/WithPageTracking";
import { Strategies, StrategiesAPI } from "@/services";
import BG from "@/assets/bg-tokenPage.svg";
// import { formatLargeNumber } from "@/utils/functions";
import {
  FormDepositSupply,
  FormStakePool,
  FormUnStakePool,
  FormWithDrawPool,
} from "@/components/form";
import { ITokenInfo } from "@/utils/utils.type";
import {
  calculateValueWithDecimals,
  formatLargeNumber,
  getTokenInfo,
  getTokenPrice,
} from "@/utils/functions";
import { useAptos } from "@/components/AptosContext";
import { STRATEGY_TYPE } from "@/utils/constants";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Loading from "@/components/Loading";
import { useIntl } from "react-intl";
import clsx from "clsx";

type dataSupplyInfo = {
  name?: string;
  value?: string;
  monney?: string;
};

const Tokenpage = () => {
  const { account, connected } = useWallet();
  const [availableBalance, setAvailableBalance] = useState<number | string>(0);
  const aptos = useAptos();
  const [data, setData] = useState<Strategies>();
  const [loading, setLoading] = useState<boolean>(true);
  const [price, setPrice] = useState<string | number>(0);
  const [tokenInfo, setTokenInfo] = useState<ITokenInfo | undefined>();
  const [tokenInfoStake, setTokenInfoStake] = useState<
    ITokenInfo | undefined
  >();
  const param = useParams();
  const intl = useIntl();
  const dataSupplyInfo = (): dataSupplyInfo[] => {
    return [
      {
        name: intl.formatMessage({ id: "tokenpage.TotalSupplied" }),
        value: formatLargeNumber(data?.totalValueLocked || "0"),
        monney: `$${formatLargeNumber(
          Number(data?.totalValueLocked) * Number(price) || "0",
        )}`,
      },
      {
        name: intl.formatMessage({ id: "tokenpage.SupplyAPY" }),
        value: `${data?.apr}%`,
        monney: "$3.8% 30d avg.",
      },
      {
        name: intl.formatMessage({ id: "tokenpage.SupplyCaps" }),
        value: formatLargeNumber(data?.ariesDetail?.depositLimit || "0"),
        monney: `$${formatLargeNumber(
          Number(data?.ariesDetail?.depositLimit) * Number(price),
        )}`,
      },
      {
        name: intl.formatMessage({ id: "tokenpage.Utilization" }),
        value: `${data?.ariesDetail?.optionalUtilization}%`,
      },
      {
        name: intl.formatMessage({ id: "tokenpage.MaxLTV" }),
        value: `${data?.ariesDetail?.maximumLtv}%`,
      },
      {
        name: intl.formatMessage({ id: "tokenpage.Oracle" }),
        value: `$${formatLargeNumber(price)}`,
      },
    ];
  };
  const getStrategiesById = async (id: string) => {
    try {
      const rq = await StrategiesAPI.getStrategiesById(id);
      if (rq.status === 200) {
        setData(rq.data);
        setTokenInfo(
          rq.data?.positionToken && getTokenInfo(rq.data?.positionToken ?? ""),
        );
        setTokenInfoStake(
          rq.data?.stakeToken &&
            rq.data?.stakeToken![0] &&
            getTokenInfo(rq.data?.stakeToken![0]),
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStrategiesById(param?.id || "");
  }, [param]);
  useEffect(() => {
    if (account?.address && tokenInfo?.token_type?.type) {
      (async () => {
        const result = await aptos.getAccountCoinAmount({
          accountAddress: account.address,
          coinType: tokenInfo.token_type.type,
        });
        const tokenPrice = getTokenPrice(tokenInfo.token_type.type);
        const balance = calculateValueWithDecimals(result, tokenInfo?.decimals);
        setAvailableBalance(balance);
        setPrice(Number(tokenPrice));
      })();
    }
  }, [account?.address, tokenInfo?.token_type?.type]);

  return loading ? (
    <Loading />
  ) : (
    <Box className="w-full h-full relative">
      <Box
        className="w-full h-[1000px]   absolute z-0 top-0"
        backgroundImage={`url(${BG})`}
        willChange={"scroll-position"}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"center"}
      ></Box>
      <Box className="max-w-[1215px] pt-[172px] xl:px-0 px-4 mx-auto grid pb-10  gap-6 z-10 relative">
        <Box className="flex items-center gap-2 ">
          <img src={tokenInfoStake?.logo_url ?? ""} className="w-8 h-8" />
          <p className="text-neutralGray-700 text-2xl font-semibold font-poppins leading-loose">
            {data?.displayName} {intl.formatMessage({ id: "tokenpage.title" })}
          </p>
        </Box>
        <div className="flex gap-6">
          <div className="w-[60%] ">
            <div className="w-full  bg-white rounded-2xl border border-neutral-100 pl-8 pr-20 py-6 mb-6">
              <div className="flex justify-between items-start flex-wrap">
                <div className="  grid gap-1">
                  <div className="text-neutralGray-500 text-sm font-medium leading-snug">
                    {data?.displayName}{" "}
                    {intl.formatMessage({ id: "tokenpage.Supplied" })}
                  </div>
                  <div className="text-neutralGray-700 text-xl font-semibold leading-7 font-poppins">
                    {formatLargeNumber(data?.totalValueLocked || "0")}{" "}
                    {data?.displayName}
                  </div>
                  <div className="text-neutralGray-500 text-sm font-medium ">
                    $
                    {formatLargeNumber(
                      Number(data?.totalValueLocked) * Number(price) || "0",
                    )}
                  </div>
                </div>
                <div className="flex items-center h-[72px]">
                  <div className="h-7 w-px  border border-gray-200 "></div>
                </div>
                {data?.strategyType === STRATEGY_TYPE.LENDING ? (
                  <>
                    <div className="  grid gap-1">
                      <div className="text-neutralGray-500 text-sm font-medium leading-snug">
                        {intl.formatMessage({ id: "tokenpage.Liquidity" })}
                      </div>
                      <div className="text-neutralGray-700 text-xl font-semibold leading-7 font-poppins">
                        400.97K {data?.displayName}
                      </div>
                      <div className="text-neutralGray-500 text-sm font-medium  leading-normal">
                        $30M
                      </div>
                    </div>
                    <div className="flex items-center h-[72px]">
                      <div className="h-7 w-px  border border-gray-200 "></div>
                    </div>
                    <div className=" h-full">
                      <div className=" grid gap-1 ">
                        <div className="text-neutralGray-500 text-sm font-medium leading-snug ">
                          {intl.formatMessage({ id: "tokenpage.Oracle" })}
                        </div>

                        <div className="text-neutralGray-700 text-xl font-semibold leading-7 font-poppins">
                          ${formatLargeNumber(price)}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="  grid gap-1">
                      <div className="text-neutralGray-500 text-sm font-medium">
                        APR
                      </div>
                      <div className="text-neutralGray-700 text-xl font-semibold leading-7 font-poppins">
                        {Number(data?.apr).toFixed(2)}%
                      </div>
                      <div className="text-neutralGray-500 text-sm font-medium  leading-normal">
                        3.8% 30d avg.
                      </div>
                    </div>
                    <div className="flex items-center h-[72px]">
                      <div className="h-7 w-px  border border-gray-200 "></div>
                    </div>
                    <div className="  grid gap-1">
                      <div className="text-neutralGray-500 text-sm font-medium leading-snug">
                        {intl.formatMessage({ id: "tokenpage.Stakers" })}
                      </div>

                      <div className="text-neutralGray-700 text-xl font-semibold leading-7 font-poppins">
                        86,178
                      </div>
                      {/* <div className="text-gray-500 text-base font-medium  leading-normal">
                    $80
                  </div> */}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="w-full gap-6 mb-6">
              <SupplyAndBorrow id={data?.id || ""} />
            </div>
            {data?.strategyType === STRATEGY_TYPE.LENDING && (
              <div className="  w-full grid gap-4 bg-white rounded-2xl border border-neutral-100  px-8 py-6 mb-20">
                <div className="text-slate-700 text-sm font-semibold leading-snug">
                  {intl.formatMessage({ id: "tokenpage.info.title" })}
                </div>
                <div className="grid grid-cols-11 justify-between w-full gap-4">
                  {dataSupplyInfo()?.map((e, index) => {
                    return (
                      <div
                        className={clsx(
                          (index + 1) % 3 === 0 ? "col-span-3" : "col-span-4",
                        )}
                        key={index}
                      >
                        <div className="text-neutralGray-500 text-sm font-medium leading-snug pb-1 ">
                          {e?.name}
                        </div>
                        <div className="text-neutralGray-700 text-xl font-semibold  leading-7">
                          {e?.value}
                        </div>
                        {e?.monney ? (
                          <div className="text-neutralGray-500 text-sm font-medium  leading-snug ">
                            {e?.monney}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="w-[40%]">
            <Box className="w-full bg-white rounded-2xl border border-neutral-100 pl-8 pr-20 py-6 mb-6">
              <div className="  grid gap-1">
                <div className="text-neutralGray-500 text-sm font-medium leading-snug">
                  {intl.formatMessage({ id: "tokenpage.MySupplied" })}
                </div>
                {connected && Number(availableBalance) > 0 ? (
                  <>
                    <div className=" flex gap-1 text-neutralGray-700 text-xl font-semibold leading-7 font-poppins">
                      <Box>
                        {Number(formatLargeNumber(availableBalance)).toFixed(5)}
                      </Box>{" "}
                      {data?.displayName}
                    </div>
                    <div className="text-neutralGray-500 text-base font-medium  leading-normal">
                      ${(Number(availableBalance) * Number(price)).toFixed(2)}
                    </div>
                  </>
                ) : (
                  <div className="text-neutral-700 text-xl font-semibold leading-7  font-poppins">
                    --
                  </div>
                )}
              </div>
            </Box>
            <Box className="w-full  bg-white rounded-2xl border border-neutral-100 p-6">
              <Tabs className="!p-0">
                <TabList>
                  <Tab
                    _selected={{
                      color: "#5B53E6",
                      borderBlockEnd: "2px",
                      fontWeight: 600,
                    }}
                    color="#667085"
                    width={120}
                    fontWeight={500}
                  >
                    <div className="text-base   leading-norma">
                      {data?.strategyType === STRATEGY_TYPE.LENDING
                        ? "Lend"
                        : "Stake"}
                    </div>
                  </Tab>
                  <Tab
                    _selected={{
                      color: "#5B53E6",
                      borderBlockEnd: "2px",
                      fontWeight: 600,
                    }}
                    color="#667085"
                    width={120}
                    fontWeight={500}
                  >
                    <div className="text-base  leading-norma">
                      {data?.strategyType === STRATEGY_TYPE.LENDING
                        ? "Withdraw"
                        : "Unstake"}
                    </div>
                  </Tab>
                </TabList>

                <TabPanels className="!p-0">
                  <TabPanel className="!p-0 !pt-3">
                    {data?.strategyType === STRATEGY_TYPE.LENDING ? (
                      <FormDepositSupply title={false} strategies={data} />
                    ) : (
                      <FormStakePool title={false} strategies={data} />
                    )}
                  </TabPanel>
                  <TabPanel className="!p-0 !pt-3">
                    {data?.strategyType === STRATEGY_TYPE.LENDING ? (
                      <FormWithDrawPool title={false} strategies={data} />
                    ) : (
                      <FormUnStakePool title={false} strategies={data} />
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </div>
        </div>
      </Box>
    </Box>
  );
};
export default withPageTracking(Tokenpage);
