import { DropdownChart } from "@/components/dropdown/DropdownChart";
import { HistoryStratragis, StrategiesAPI } from "@/services";
import { formatDate, formatMonney } from "@/utils/functions";
import { Tabs, TabList, TabPanel, Tab, TabPanels } from "@chakra-ui/react";
import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
type Prop = {
  id: string;
};
const ChartTokenInflows = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 282,
        rightPriceScale: {
          visible: true,
          borderColor: "transparent",
        },
        leftPriceScale: {
          visible: true,
          borderColor: "transparent",
        },
        timeScale: {
          borderColor: "#A9A9A966",
          tickMarkFormatter: (time: string): string => {
            const date = new Date(time); // Chuyển đổi giây sang mili giây
            const month = date.toLocaleString("en", { month: "short" });
            const day = date.getDate();

            return `${month} ${day} `;
          },
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
          vertLines: { color: "transparent" },
          horzLines: { color: "#A9A9A966" },
        },
      });
      chart.timeScale().applyOptions({
        fixLeftEdge: true,
        fixRightEdge: true,
      });
      chart.priceScale("right").applyOptions({
        visible: false,
      });
      chart.priceScale("left").applyOptions({
        visible: true,
      });
      const histogramSeries = chart.addHistogramSeries({ color: "#26a69a" });

      const data = [
        { time: "2018-12-12", value: 24.11 },
        { time: "2018-12-13", value: 31.74 },
        { time: "2018-12-14", value: 11.74 },
        { time: "2018-12-15", value: 81.74 },
        { time: "2018-12-16", value: 21.74 },
        { time: "2018-12-17", value: 11.74 },
        { time: "2018-12-18", value: 31.74 },
        { time: "2018-12-19", value: 71.74 },
      ];

      histogramSeries.setData(data);

      chart.timeScale().fitContent();

      return () => {
        chart.remove();
      };
    }
  }, [chartContainerRef]);

  return (
    <div className=" bg-black-100 ">
      <div ref={chartContainerRef} className="relative z-0 bg-white">
        <div
          ref={tooltipRef}
          className="absolute  bg-white rounded-lg shadow-3xl z-50    "
        ></div>
      </div>
    </div>
  );
};
export const ChartComponent = (props: any) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [curentData, setCurentData] = useState<any[]>([]);
  const [curentTime, setCurentTime] = useState<any>();
  const colorLine = ["#655CFF", "#FA8C16", "orange", "purple"];
  const {
    data,
    colors: {
      backgroundColor = "#ffffff",
      textColor = "#667085",
      lineColor = "#667085",
      areaTopColor = "#667085",
      areaBottomColor = "#667085",
      fontSize = 10,
    } = {},
  } = props;
  useEffect(() => {
    if (chartContainerRef.current) {
      const initDataTVL: any[] = [];
      const initDataAPR: any[] = [];
      data?.forEach((element: HistoryStratragis) => {
        initDataTVL.push({
          time: Number(element.timestamp) * 1000,
          value: Number(element?.totalValueLocked),
        });
        initDataAPR.push({
          time: Number(element.timestamp) * 1000,
          value: Number(element?.apr),
        });
      });
      const handleResize = () => {
        chart.applyOptions({
          width: chartContainerRef?.current?.clientWidth,
        });
      };
      const list: any[] = [];
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 282,
        rightPriceScale: {
          visible: true,
          borderColor: "transparent",
        },
        leftPriceScale: {
          visible: true,
          borderColor: "transparent",
        },
        timeScale: {
          borderColor: "#A9A9A966",
          tickMarkFormatter: (time: string): string => {
            const date = new Date(time); // Chuyển đổi giây sang mili giây
            const month = date.toLocaleString("en", { month: "short" });
            const day = date.getDate();

            return `${month} ${day} `;
          },
          fixLeftEdge: true,
          fixRightEdge: true,
        },
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
          fontSize,
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
          vertLines: { color: "transparent" },
          horzLines: { color: "#A9A9A966" },
        },
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
              const style = tooltipRef.current?.style;
              style.display = "none";
            }
          } else {
            const tooltipStyle = tooltipRef.current?.style;
            if (tooltipStyle) {
              tooltipStyle.display = "block";
              const arrdata: any[] = [];
              list.forEach((e) => {
                const data = param.seriesData.get(e?.series);
                // if (checked[index]) {
                arrdata.push({
                  value: e?.type
                    ? Number(data.value).toFixed(2) + "%"
                    : "$" + formatMonney(data.value),
                  name: e.name,
                  color: e?.color,
                });
                // }
                const shiftedCoordinate = param.point.x;
                const shiftedCoordinateY = param.point.y;

                tooltipStyle.left = shiftedCoordinate - 100 + "px";

                tooltipStyle.top = shiftedCoordinateY + "px";
              });
              setCurentTime(formatDate(param?.time));
              setCurentData(arrdata);
            }
          }
      });
      const seriesTVL = chart.addLineSeries({
        color: colorLine[0],
        priceLineVisible: false,
        priceFormat: {
          type: "custom",
          formatter: (price: number) => {
            const monney: string = formatMonney(price);
            return monney;
          },
        },
        lastValueVisible: false,
      });
      list.push({
        name: "TVL",
        series: seriesTVL,
        color: colorLine[0],
        type: false,
      });
      seriesTVL.applyOptions({
        lineWidth: 2,
        priceScaleId: "left",
      });

      seriesTVL?.setData(initDataTVL);

      const seriesAPR = chart.addLineSeries({
        color: colorLine[1],

        priceFormat: {
          type: "custom",

          formatter: (price: number) => {
            return `${price.toFixed(2)}%`;
          },
        },
        priceLineVisible: false,
        lastValueVisible: false,
      });
      list.push({
        name: "APR",
        series: seriesAPR,
        color: colorLine[1],
        type: true,
      });
      seriesAPR.applyOptions({
        lineWidth: 2,
        priceScaleId: "right",
      });
      seriesAPR?.setData(initDataAPR);

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
    chartContainerRef,
  ]);

  return (
    <div className=" bg-black-100 ">
      <div ref={chartContainerRef} className="relative z-0 bg-white">
        <div
          ref={tooltipRef}
          className="absolute  bg-white rounded-lg shadow-3xl z-50 hidden   "
        >
          <div className="p-3">
            <div className="text-gray-400 text-xs font-medium leading-none pb-2">
              {curentTime}
            </div>
            {curentData?.map((e, index) => {
              return (
                <div key={index} className="flex gap-2 pb-1">
                  <div
                    className="text-xs font-medium leading-none"
                    style={{
                      color: e?.color,
                    }}
                  >
                    {e?.name}:
                  </div>
                  <div className="text-neutralGray-700 text-xs font-medium leading-none">
                    {e?.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
const Options = [
  {
    key: "1",
    label: "7D",
  },
  {
    key: "2",
    label: "30D",
  },
  {
    key: "3",
    label: "90D",
  },
  {
    key: "4",
    label: "6M",
  },
];
const SupplyAndBorrow = ({ id }: Prop) => {
  const [data, setData] = useState<HistoryStratragis[]>();
  const intl = useIntl();
  const filterData = (date?: string) => {
    const currentDate = new Date();
    const daysAgo = new Date(currentDate);
    daysAgo.setDate(currentDate.getDate() - Number(date ? date : "7"));
    const timestamp: number = daysAgo.getTime();
    return {
      from: timestamp / 1000,
      to: currentDate.getTime() / 1000,
    };
  };
  const getHistoryStrategy = async (date?: string) => {
    try {
      const rq = await StrategiesAPI.getHistoryStrategiesById(
        id,
        filterData(date),
      );
      if (rq.status === 200) {
        setData(rq?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      getHistoryStrategy();
    }
  }, [id]);
  return (
    <div className="lg:flex justify-between  gap-6 w-full">
      <div className="w-full bg-white rounded-3xl border border-neutral-100 ">
        <div className="pt-6 pb-8 px-8">
          <Tabs className="!p-0" isLazy={true}>
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
                <div className="text-base  leading-norma">TVL</div>
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
                px="10px"
              >
                <div className="text-base   leading-norma">
                  {intl.formatMessage({ id: "tokenpage.TokenInflow" })}
                </div>
              </Tab>
            </TabList>

            <TabPanels className="!p-0">
              <TabPanel className="!p-0 !pt-6">
                <div className="bg-white">
                  <div className="flex justify-between w-full pb-[10px]">
                    <div className="!text-neutralGray-700 text-sm font-semibold leading-snug">
                      {intl.formatMessage({ id: "tokenpage.Performance" })}
                    </div>
                    <div className="w-28">
                      <DropdownChart
                        onChange={(e) => {
                          getHistoryStrategy(e);
                        }}
                        options={Options}
                      />
                    </div>
                  </div>

                  {data && (
                    <ChartComponent
                      data={data?.sort(
                        (a, b) => parseInt(a.timestamp) - parseInt(b.timestamp),
                      )}
                    ></ChartComponent>
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                {data && <ChartTokenInflows></ChartTokenInflows>}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default SupplyAndBorrow;
