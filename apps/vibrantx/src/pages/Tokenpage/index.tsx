import { Box } from "@chakra-ui/react";
import { useIntl } from "react-intl";
import SupplyAndBorrow from "./component/SupplyAndBorrow";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import withPageTracking from "@/components/WithPageTracking";
import { StrategiesAPI } from "@/services";
// import { formatLargeNumber } from "@/utils/functions";
import { main_screen } from "@/assets/home";
import SVG from "react-inlinesvg";
import { apt } from "@/assets/tokenPage";
import { FormDepositSupply } from "@/components/form";

// import { ViewRequest } from "@aptos-labs/ts-sdk";
// import { useAptos } from "@/components/AptosContext";
// const moduleAddress = import.meta.env.VITE_APP_MODULE_ADDRESS;
const Tokenpage = () => {
  const intl = useIntl();
  // const aptos = useAptos();
  const [data, setData] = useState<any>();
  // const [dataTest, setDataTest] = useState<any>();
  console.log(data);

  const param = useParams();
  const data1 = [
    {
      name: "Total Supplied",
      value: "500K",
      monney: "$40M",
    },
    {
      name: "Supply APY",
      value: "4%",
      monney: "$3.8% 30d avg.",
    },
    {
      name: "Supply Caps",
      value: "1M",
      monney: "$80M",
    },
    {
      name: "Utilization",
      value: "65%",
    },
    {
      name: "Max LTV",
      value: "60%",
    },
    {
      name: "Oracle Price",
      value: "500K",
    },
  ];

  const getStrategiesById = async (id: any) => {
    try {
      const rq = await StrategiesAPI.getStrategiesById(id);
      if (rq.status === 200) {
        setData(rq.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStrategiesById(param?.id);
  }, [param]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const payload: ViewRequest = {
  //       function:
  //         `${moduleAddress}::amnis::get_users_position` as `${string}::${string}::${string}`,
  //       typeArguments: data.protocols[0]! === "Aries" ? [data.poolType] : [],
  //       functionArguments: [account.address],
  //     };

  //     try {
  //       const position = await aptos.view({ payload });
  //     } catch (error) {}
  //   };

  //   fetchData();
  // }, []);

  return (
    <Box
      className="w-full h-full pt-[172px] "
      backgroundImage={`url(${main_screen})`}
      willChange={"scroll-position"}
      backgroundSize={"cover"}
      backgroundRepeat={"no-repeat"}
      backgroundPosition={"center"}
    >
      <Box className="max-w-[1215px] xl:px-0 px-4 mx-auto grid  gap-6">
        <Box className="flex items-center gap-2 ">
          <SVG src={apt} width={32} height={32} />
          <p className="text-neutralGray-700 text-2xl font-semibold font-poppins leading-loose">
            {intl.formatMessage({ id: "tokenpage.title" })}
          </p>
        </Box>
        <div className="flex gap-6">
          <div className="w-[60%] ">
            <div className="w-full  bg-white rounded-3xl border border-neutral-100 pl-8 pr-20 py-6 mb-6">
              <div className="flex justify-between items-center flex-wrap">
                <div className="  grid gap-1">
                  <div className="text-neutralGray-500 text-sm font-medium leading-snug">
                    APT Supplied
                  </div>
                  <div className="text-neutralGray-700 text-xl font-semibold leading-7">
                    400.97K APT
                  </div>
                  <div className="text-gray-500 text-base font-medium  leading-normal">
                    $40M
                  </div>
                </div>
                <div className="h-7 w-px  border border-gray-200 "></div>
                <div className="  grid gap-1">
                  <div className="text-neutralGray-500 text-sm font-medium leading-snug">
                    Liquidity Available
                  </div>
                  <div className="text-neutralGray-700 text-xl font-semibold leading-7">
                    400.97K APT
                  </div>
                  <div className="text-gray-500 text-base font-medium  leading-normal">
                    $30M
                  </div>
                </div>
                <div className="h-7 w-px  border border-gray-200 "></div>
                <div className="  grid gap-1">
                  <div className="text-neutralGray-500 text-sm font-medium leading-snug">
                    My Supplied
                  </div>

                  <div className="text-neutralGray-700 text-xl font-semibold leading-7">
                    23 APT
                  </div>
                  <div className="text-gray-500 text-base font-medium  leading-normal">
                    $80
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full gap-6 mb-6">
              <SupplyAndBorrow />
            </div>
            <div className="  w-full grid gap-4 bg-white rounded-3xl border border-neutral-100  px-8 py-6 mb-20">
              <div className="text-slate-700 text-sm font-semibold leading-snug">
                Supply Info
              </div>
              <div className="grid grid-cols-3 justify-between w-full gap-4">
                {data1?.map((e, index) => {
                  return (
                    <div className="" key={index}>
                      <div className="text-gray-500 text-sm font-medium leading-snug pb-1">
                        {e?.name}
                      </div>
                      <div className="text-slate-700 text-xl font-semibold  leading-7">
                        {e?.value}
                      </div>
                      {e?.monney ? (
                        <div className="text-gray-500 text-sm font-medium  leading-snug">
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
          </div>
          <div className="w-[40%]">
            <Box className="w-full bg-white rounded-3xl border border-neutral-100 pl-8 pr-20 py-6 mb-6">
              <div className="  grid gap-1">
                <div className="text-neutralGray-500 text-sm font-medium leading-snug">
                  My Supplied
                </div>
                <div className="text-neutralGray-700 text-xl font-semibold leading-7">
                  23 APT
                </div>
                <div className="text-gray-500 text-base font-medium  leading-normal">
                  $80
                </div>
              </div>
            </Box>
            <Box className="w-full  bg-white rounded-3xl border border-neutral-100 p-6">
              <FormDepositSupply />
            </Box>
          </div>
        </div>
      </Box>
    </Box>
  );
};
export default withPageTracking(Tokenpage);
