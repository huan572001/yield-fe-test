import { Box } from "@chakra-ui/react";
import { useIntl } from "react-intl";
import SupplyAndBorrow from "./component/SupplyAndBorrow";
import Info from "./component/Info";
import { useEffect, useState } from "react";
import withPageTracking from "@/components/WithPageTracking";

const Tokenpage = () => {
  const intl = useIntl();
  const [data, setData] = useState<any[]>();
  useEffect(() => {
    setData([
      {
        title: "Supply Info",
        subTitle:
          "Earn yields with your crypto capital without any active management.",
        data: [
          {
            name: "Total Supplied",
            value: "193.27K",
          },
          {
            name: "Supply APY",
            value: "11.12%",
            active: true,
          },
          {
            name: "Supply Caps",
            value: "600K",
          },
        ],
      },
      {
        title: "Liquidation info",
        subTitle: "Earn staking rewards with your APT with east!",
        data: [
          {
            name: "Total Supplied",
            value: "193.27K",
          },
          {
            name: "Supply APY",
            value: "11.12%",
            active: true,
          },
          {
            name: "Supply Caps",
            value: "600K",
          },
        ],
      },
    ]);
  }, []);
  return (
    <Box className="flex flex-col gap-[32px]">
      <div className=" text-slate-900 text-2xl font-bold leading-loose">
        {intl.formatMessage({ id: "tokenpage.title" })}
      </div>
      <div className="lg:flex justify-between gap-5 w-full">
        <div className="w-full lg:w-2/3 bg-white rounded-[20px] ">
          <div className="py-6 px-11 grid grid-cols-1 min-[600px]:grid-cols-2 min-[700px]:flex justify-between gap-5">
            <div className="text-[26px] font-bold  leading-[42px] grid gap-5">
              <div className="text-gray-400 ">ETH Supplied</div>
              <div className="text-black">193.27K ETH</div>
            </div>
            <div className="text-[26px] font-bold  leading-[42px] grid gap-5">
              <div className="text-gray-400 ">Liquidity Available</div>
              <div className="text-black">93.37K ETH</div>
            </div>
            <div className="text-[26px] font-bold  leading-[42px] grid gap-5">
              <div className="text-gray-400 ">Utilization</div>
              <div className="text-black">53.12%</div>
            </div>
          </div>
        </div>
        <div className="flex gap-12 lg:justify-between lg:w-1/3 mt-5">
          <div className="text-[26px] font-bold  leading-[42px] grid gap-5">
            <div className="text-gray-400 ">Oracle Price</div>
            <div className="text-black">$93.27</div>
          </div>
          <div className="text-[26px] font-bold  leading-[42px] grid gap-5">
            <div className="text-gray-400 ">Supply APY</div>
            <div className="text-tealGreenColor">11.27%</div>
          </div>
        </div>
      </div>
      <SupplyAndBorrow />
      <div className="grid gap-[32px]">
        {data?.map((e, index) => {
          return (
            <Info
              title={e?.title}
              subTitle={e?.subTitle}
              data={e?.data}
              key={index}
            />
          );
        })}
      </div>
    </Box>
  );
};
export default withPageTracking(Tokenpage);
