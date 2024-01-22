import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import clsx from "clsx";
import { useState } from "react";
import {} from "@chakra-ui/react";
const percent = [
  {
    key: 25,
    value: "25%",
  },
  {
    key: 50,
    value: "50%",
  },
  {
    key: 75,
    value: "75%",
  },
  {
    key: 100,
    value: "Max",
  },
];
interface prop {
  onChange: (prop: number) => void;
}
export const CartSider = ({ onChange }: prop) => {
  const [data, setData] = useState<number>(0);

  return (
    <Box className="pb-3">
      <Box className="text-neutralGray-600 text-sm font-medium leading-snug pb-2">
        Amount to remove
      </Box>
      <Box className="w-full  p-6 bg-white rounded-2xl border border-gray-300 flex-col justify-start items-start gap-3.5 inline-flex">
        <Box className="w-full flex items-start justify-between">
          <Box className="text-center text-neutralGray-700 text-4xl font-semibold leading-10">
            {data}%
          </Box>
          <Box className="flex gap-3">
            {percent?.map((e) => {
              return (
                <Box
                  onClick={() => {
                    setData(e.key);
                    onChange(e.key);
                  }}
                  key={e?.key}
                  className={clsx(
                    data === e.key && "border-primaryPurple-600 border",
                    "cursor-pointer h-6 px-1.5 py-1 bg-primaryPurple-200 rounded-3xl justify-center items-center gap-1 inline-flex",
                  )}
                >
                  <Box className="text-center text-primaryPurple-600 text-xs font-semibold leading-none">
                    {e?.value}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Slider
          aria-label="slider-ex-2"
          value={data}
          onChange={(e) => {
            setData(e);
            onChange(e);
          }}
        >
          <SliderTrack className="!bg-gray-300">
            <SliderFilledTrack className="!bg-primaryPurple-300" />
          </SliderTrack>
          <SliderThumb className="!border-primaryPurple-300 !border-[2px]" />
        </Slider>
      </Box>
    </Box>
  );
};
