import { formatDate, formatMonney } from "@/utils/functions";
import { Select } from "@chakra-ui/react";
import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";

export const ChartComponent = (props: any) => {
  // const [checked, setChecked] = useState<string[]>([
  //   "Borrow APY",
  //   "Supply APY",
  // ]);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [curentData, setCurentData] = useState<any[]>([]);
  const [curentTime, setCurentTime] = useState<any>();
  const colorLine = ["blue", "green", "orange", "purple"];
  const {
    data,
    colors: {
      backgroundColor = "#ffffff",
      textColor = "#667085",
      lineColor = "#667085",
      areaTopColor = "#667085",
      areaBottomColor = "#667085",
    } = {},
  } = props;
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
          borderColor: "transparent",
        },
        leftPriceScale: {
          visible: true,
          borderColor: "transparent",
        },
        timeScale: {
          borderColor: "#A9A9A966",
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
          vertLines: { color: "transparent" },
          horzLines: { color: "#A9A9A966" },
        },
      });
      const defaultPecent = chart.addLineSeries({
        priceFormat: {
          type: "custom",
          formatter: (price: number) => {
            return `${price.toFixed(2)}%`;
          },
        },
        priceLineVisible: false,
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
        priceLineVisible: false,
      });
      defaultMonney.applyOptions({
        lineWidth: 1,
        priceScaleId: "left",
      });

      // defaultPecent.setData([
      //   { time: "2018-12-22", value: 1.0 },
      //   { time: "2018-12-23", value: 3.0 },
      //   { time: "2018-12-24", value: 3.0 },
      //   { time: "2018-12-25", value: 3.0 },
      //   { time: "2018-12-26", value: 3.0 },
      //   { time: "2018-12-27", value: 6.0 },
      //   { time: "2018-12-28", value: 8.0 },
      //   { time: "2018-12-30", value: 31.0 },
      //   { time: "2018-12-31", value: 41.0 },
      // ]);
      // defaultMonney.setData([
      //   { time: "2018-12-22", value: 150000 },
      //   { time: "2018-12-23", value: 350000 },
      //   { time: "2018-12-24", value: 210000 },
      //   { time: "2018-12-25", value: 550000 },
      //   { time: "2018-12-26", value: 100000 },
      //   { time: "2018-12-27", value: 490000 },
      //   { time: "2018-12-28", value: 370000 },
      //   { time: "2018-12-29", value: 800000 },
      //   { time: "2018-12-30", value: 720000 },
      //   { time: "2018-12-31", value: 600100 },
      // ]);
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
            priceLineVisible: false,
          });
        } else {
          series = chart.addLineSeries({
            color: colorLine[index],
            priceLineVisible: false,
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
                // if (checked[index]) {
                arrdata.push({
                  value: e?.type
                    ? data.value + "%"
                    : "$" + formatMonney(data.value),
                  name: initialData[index].name,
                  color: e?.color,
                });
                // }
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
    chartContainerRef,
  ]);

  return (
    <div className=" bg-black-100 ">
      <div ref={chartContainerRef} className="relative ">
        <div
          ref={tooltipRef}
          className="absolute w-44 bg-white rounded-lg shadow-3xl z-50    "
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
    </div>
  );
};

const SupplyAndBorrow = () => {
  // const dispatch = useDispatch();
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
    <div className="lg:flex justify-between  gap-6 w-full">
      <div className="w-full bg-white rounded-3xl border border-neutral-100 ">
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
                {Options?.map((e, index) => {
                  return (
                    <option key={index} value={e?.value}>
                      {e?.label}
                    </option>
                  );
                })}
              </Select>
            </div>
          </div>
          <ChartComponent data={initialData}></ChartComponent>
        </div>
      </div>
    </div>
  );
};
export default SupplyAndBorrow;
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
];
