import { AppButton } from "@/pages/Homepage";
import { setOpenModal } from "@/redux/slice/modalSlice";
import { formatDate, formatMonney } from "@/utils/functions";
import {
  Box,
  Checkbox,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
} from "@chakra-ui/react";
import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export const ChartComponent = (props: any) => {
  const [checked, setChecked] = useState<string[]>([
    "Borrow APY",
    "Supply APY",
  ]);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [curentData, setCurentData] = useState<any[]>([]);
  const [curentTime, setCurentTime] = useState<any>();
  const colorLine = ["blue", "green", "orange", "purple"];
  const {
    data,
    colors: {
      backgroundColor = "#131722",
      textColor = "#d1d4dc",
      lineColor = "#d1d4dc",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
  } = props;
  const handleCheckboxChange = (value: any) => {
    // Xử lý sự thay đổi của checkbox
    if (checked.includes(value)) {
      setChecked(checked.filter((item) => item !== value));
    } else {
      setChecked([...checked, value]);
    }
  };
  useEffect(() => {
    if (chartContainerRef.current) {
      const handleResize = () => {
        chart.applyOptions({
          width: chartContainerRef?.current?.clientWidth,
        });
      };
      let list: any[] = [];
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 305,
        rightPriceScale: {
          visible: true,
          borderColor: "rgba(197, 203, 206, 1)",
        },
        leftPriceScale: {
          visible: true,
          borderColor: "rgba(197, 203, 206, 1)",
        },
        timeScale: {
          tickMarkFormatter: (time: string): string => {
            const dateObject = new Date(time);
            const day = dateObject.getDate().toString().padStart(2, "0");
            const month = (dateObject.getMonth() + 1)
              .toString()
              .padStart(2, "0");

            return `${day}/${month}`;
          },
        },
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        crosshair: {
          // hide the horizontal crosshair line
          horzLine: {
            visible: false,
            labelVisible: false,
          },
          // hide the vertical crosshair label
          vertLine: {
            labelVisible: false,
          },
        },
        grid: {
          vertLines: { color: "#444" },
          horzLines: { color: "#444" },
        },
      });
      const defaultPecent = chart.addLineSeries({
        priceFormat: {
          type: "custom",
          formatter: (price: number) => {
            return `${price.toFixed(2)}%`;
          },
        },
      });
      const defaultMonney = chart.addLineSeries({
        priceFormat: {
          type: "custom",
          formatter: (price: number) => {
            // chỗ này em viết hàm để trả ra giá trị tượng ứng với K, M ,B, T nhé
            let monney = formatMonney(price);
            return monney;
          },
        },
      });
      defaultMonney.applyOptions({
        lineWidth: 1,
        priceScaleId: "left",
      });

      defaultPecent.setData([
        { time: "2018-12-22", value: 1.0 },
        { time: "2018-12-23", value: 3.0 },
        { time: "2018-12-24", value: 3.0 },
        { time: "2018-12-25", value: 3.0 },
        { time: "2018-12-26", value: 3.0 },
        { time: "2018-12-27", value: 6.0 },
        { time: "2018-12-28", value: 8.0 },
        { time: "2018-12-30", value: 31.0 },
        { time: "2018-12-31", value: 41.0 },
      ]);
      defaultMonney.setData([
        { time: "2018-12-22", value: 150000 },
        { time: "2018-12-23", value: 350000 },
        { time: "2018-12-24", value: 210000 },
        { time: "2018-12-25", value: 550000 },
        { time: "2018-12-26", value: 100000 },
        { time: "2018-12-27", value: 490000 },
        { time: "2018-12-28", value: 370000 },
        { time: "2018-12-29", value: 800000 },
        { time: "2018-12-30", value: 720000 },
        { time: "2018-12-31", value: 600100 },
      ]);
      defaultPecent.applyOptions({
        visible: false,
      });
      defaultMonney.applyOptions({
        visible: false,
      });
      data?.forEach((element: any, index: number) => {
        const initData = element?.data?.map((e: any) => ({
          time: e.time,
          value: e?.value ? e?.value : e?.monney,
        }));
        let series = null;
        if (element?.data?.[0].value) {
          series = chart.addLineSeries({
            color: colorLine[index],
            priceFormat: {
              type: "custom",
              formatter: (price: number) => {
                return `${price.toFixed(2)}%`;
              },
            },
          });
        } else {
          series = chart.addLineSeries({
            color: colorLine[index],
          });
        }
        if (series) {
          list.push({
            series: series,
            color: colorLine[index],
            type: element?.data?.[0].value ? true : false,
          });
          if (element?.data?.[0]?.value) {
            series.applyOptions({
              lineWidth: 1,
              priceScaleId: "right",
            });
          } else {
            series.applyOptions({
              lineWidth: 1,
              priceScaleId: "left",
            });
          }
          series?.setData(initData);
          series.applyOptions({
            visible: checked.includes(initialData[index].name),
          });
        }
      });

      chart.priceScale("right").applyOptions({
        visible: true,
      });
      chart.priceScale("left").applyOptions({
        visible: true,
      });
      chart.subscribeCrosshairMove((param: any) => {
        if (chartContainerRef.current)
          if (
            param.point === undefined ||
            !param.time ||
            param.point.x < 0 ||
            param.point.x > chartContainerRef?.current?.clientWidth ||
            param.point.y < 0 ||
            param.point.y > chartContainerRef?.current?.clientHeight
          ) {
            if (tooltipRef.current?.style) {
              let style = tooltipRef.current?.style;
              style.display = "none";
            }
          } else {
            const tooltipStyle = tooltipRef.current?.style;
            if (tooltipStyle) {
              tooltipStyle.display = "block";
              let arrdata: any[] = [];
              list.forEach((e, index) => {
                const data = param.seriesData.get(e?.series);
                if (checked[index]) {
                  arrdata.push({
                    value: e?.type
                      ? data.value + "%"
                      : "$" + formatMonney(data.value),
                    name: initialData[index].name,
                    color: e?.color,
                  });
                }
                const shiftedCoordinate = param.point.x;
                const shiftedCoordinateY = param.point.y;

                tooltipStyle.left = shiftedCoordinate - 130 + "px";
                tooltipStyle.top = shiftedCoordinateY + "px";
              });
              setCurentTime(formatDate(param?.time));
              setCurentData(arrdata);
            }
          }
      });
      chart.timeScale().fitContent();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);

        chart.remove();
      };
    }
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
    checked,
    chartContainerRef,
  ]);

  return (
    <div className=" bg-black-100 h-[355px]">
      <div ref={chartContainerRef} className="relative ">
        <div
          ref={tooltipRef}
          className="absolute w-44 rounded-sm z-50 bg-black-10 opacity-90 text-white"
        >
          <div className="p-3">
            <div>{curentTime}</div>
            {curentData?.map((e, index) => {
              return (
                <div key={index} className="flex justify-between">
                  <div
                    style={{
                      color: e?.color,
                    }}
                  >
                    {e?.name}
                  </div>
                  <div>{e?.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="ml-16 py-3 text-white flex gap-4 z-40">
        {initialData?.map((e: any, index: number) => {
          return (
            <Checkbox
              value={e?.name}
              colorScheme={colorLine[index]}
              isChecked={checked.includes(e?.name)}
              onChange={() => handleCheckboxChange(e?.name)}
              key={index}
              defaultChecked={checked.includes(e?.name)}
            >
              {e?.name}
            </Checkbox>
          );
        })}
      </div>
    </div>
  );
};

const initialData = [
  {
    name: "Supply TVL",
    data: [
      { time: "2018-12-22", monney: 10000000 },
      { time: "2018-12-23", monney: 30000000 },
      { time: "2018-12-24", monney: 20000000 },
      { time: "2018-12-25", monney: 50000000 },
      { time: "2018-12-26", monney: 10000000 },
      { time: "2018-12-27", monney: 40000000 },
      { time: "2018-12-28", monney: 30000000 },
      { time: "2018-12-29", monney: 80000000 },
      { time: "2018-12-30", monney: 70000000 },
      { time: "2018-12-31", monney: 60000000 },
    ],
  },
  {
    name: "Supply APY",
    data: [
      { time: "2018-12-22", value: 1.0 },
      { time: "2018-12-23", value: 3.0 },
      { time: "2018-12-24", value: 3.0 },
      { time: "2018-12-25", value: 3.0 },
      { time: "2018-12-26", value: 3.0 },
      { time: "2018-12-27", value: 6.0 },
      { time: "2018-12-28", value: 8.0 },
      { time: "2018-12-29", value: 8.0 },
      { time: "2018-12-30", value: 31.0 },
      { time: "2018-12-31", value: 41.0 },
    ],
  },
  {
    name: "Borrow TVL",
    data: [
      { time: "2018-12-22", monney: 15000000 },
      { time: "2018-12-23", monney: 35000000 },
      { time: "2018-12-24", monney: 21000000 },
      { time: "2018-12-25", monney: 55000000 },
      { time: "2018-12-26", monney: 10000000 },
      { time: "2018-12-27", monney: 49000000 },
      { time: "2018-12-28", monney: 37000000 },
      { time: "2018-12-29", monney: 80000000 },
      { time: "2018-12-30", monney: 72000000 },
      { time: "2018-12-31", monney: 60010000 },
    ],
  },
  {
    name: "Borrow APY",
    data: [
      { time: "2018-12-22", value: 3.0 },
      { time: "2018-12-23", value: 5.0 },
      { time: "2018-12-24", value: 5.0 },
      { time: "2018-12-25", value: 5.0 },
      { time: "2018-12-26", value: 5.0 },
      { time: "2018-12-27", value: 8.0 },
      { time: "2018-12-28", value: 10.0 },
      { time: "2018-12-29", value: 23.0 },
      { time: "2018-12-30", value: 43.0 },
      { time: "2018-12-31", value: 13.0 },
    ],
  },
];

const SupplyAndBorrow = () => {
  const dispatch = useDispatch();
  const Options = [
    {
      value: "1",
      label: "Period 7D",
    },
    {
      value: "2",
      label: "Period 30D",
    },
    {
      value: "3",
      label: "Period 90D",
    },
    {
      value: "4",
      label: "Period 6M",
    },
  ];
  return (
    <div className="lg:flex justify-between items-center gap-5 w-full">
      <div className="w-full lg:w-2/3 bg-white rounded-[20px] ">
        <div className="py-4 px-8">
          <div className="flex justify-between w-full pb-5">
            <div className="text-slate-900 text-2xl font-bold leading-[42px]">
              Supply & Borrow
            </div>
            <div className="w-28">
              <Select
                icon={<></>}
                className="!bg-paleSilver !text-midnightNavy !text-sm !font-semibold !pr-4"
                defaultValue={"1"}
              >
                {Options?.map((e) => {
                  return <option value={e?.value}>{e?.label}</option>;
                })}
              </Select>
            </div>
          </div>
          <ChartComponent data={initialData}></ChartComponent>
        </div>
      </div>
      <div className=" lg:w-1/3 h-96 mt-5 bg-white rounded-[20px] border-deepGreen-100 border-2 ">
        <div className=" grid gap-5 px-5 py-6 ">
          <Box className="flex justify-between">
            <Text className="text-black text-2xl font-semibold">
              USE MARKET
            </Text>
            <AppButton className="!text-white uppercase !h-9 !rounded-full">
              SUPPLY
            </AppButton>
          </Box>
          <Box className=" w-full h-[0px] border border-black"></Box>
          <Box
            // onClick={handleBoxClick}
            className="px-[14px] py-[18px] rounded-[12px] bg-gray-200 hover:bg-gray-300 text-[16px] text-gray-400"
          >
            <Box className="flex justify-between ">
              <Text className="font-bold">You Supply</Text>
              <Text>~$0.00</Text>
            </Box>
            <InputGroup>
              <InputLeftAddon className="!border-none !bg-[transparent] text-[20px] font-semibold">
                {/* {modalSupply.assets} */}
              </InputLeftAddon>
              <Input
                style={{
                  direction: "rtl",
                  textAlign: "right",
                  unicodeBidi: "plaintext",
                }}
                placeholder="0"
                className="!outline-none !border-none !rounded-full hover:!border-none  focus-visible:!border-none focus-visible:!shadow-none "
                type="number"
              />
            </InputGroup>
            <Box className="flex justify-between items-center">
              <Box>Available: 0</Box>
              <Box className="flex gap-[15px]">
                <Box className="rounded-full flex items-center hover:cursor-pointer bg-gray-500 px-[20px] text-black py-[4px] text-[18px]">
                  Half
                </Box>
                <Box className="rounded-full flex items-center hover:cursor-pointer bg-gray-500 px-[20px] text-black py-[4px] text-[18px]">
                  Max
                </Box>
              </Box>
            </Box>
          </Box>
          <AppButton
            className="!text-white uppercase w-full !h-14"
            onClick={() => dispatch(setOpenModal())}
          >
            CONNECT WALLET
          </AppButton>
          <div className="flex justify-between">
            <Text className=" text-gray-400 font-bold">
              Transaction Settings
            </Text>
            <Text
              className=" text-gray-400 font-bold cursor-pointer"
              onClick={
                () => {}
                // dispatch(
                //   setOpenModalSettings({
                //     isOpen: true,
                //     assets: modalSupply.assets,
                //   })
                // )
              }
            >
              Settings
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SupplyAndBorrow;
