import { Box, Icon } from "@chakra-ui/react";
import clsx from "clsx";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface Option {
  key: string;
  label: string;
}

interface DropdownGradientProps {
  options: Option[];
  onChange: (selectedKey: string) => void;
}
const options = [
  {
    key: "7",
    label: "7D",
  },
  {
    key: "30",
    label: "30D",
  },
  {
    key: "60",
    label: "60D",
  },
  {
    key: "180",
    label: "6M",
  },
];
const optionsValue = [
  {
    key: "7",
    label: "7 Days",
  },
  {
    key: "30",
    label: "30 Days",
  },
  {
    key: "60",
    label: "60 Days",
  },
  {
    key: "180",
    label: "6 Months",
  },
];
export const DropdownChart = ({ onChange }: DropdownGradientProps) => {
  const [selectedKey, setSelectedKey] = useState(options[0]?.key || "");
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (key: string) => {
    setIsOpen(false);
    onChange(key);
    setSelectedKey(key);
  };

  return (
    <>
      <Box
        onClick={() => setIsOpen(!isOpen)}
        className="hover:scale-95 border-neutralGray-300 hover:bg-gray-600 cursor-pointer flex justify-center items-center border !text-[14px] !bg-white !px-4 !rounded-md h-8"
      >
        <Box className="flex gap-2 items-center">
          <div className="flex gap-[2px]">
            <span className="text-gray-500 text-xs font-medium leading-none">
              Period:
            </span>
            <span className="text-neutralGray-700 text-xs font-semibold leading-none">
              {options.find((option) => option.key === selectedKey)?.label ||
                ""}
            </span>
          </div>

          <Icon
            as={FaAngleDown}
            className={clsx(" transition-transform ease-linear duration-200", {
              "rotate-180": isOpen,
            })}
          />
        </Box>
      </Box>

      {isOpen && (
        <Box>
          <Box className="absolute z-40 bg-white rounded-lg shadow-3xl w-[110px] mt-1">
            {optionsValue.map((option) => {
              return (
                <Box
                  key={option.key}
                  onClick={() => {
                    handleItemClick(option.key);
                  }}
                  className=" cursor-pointer rounded hover:bg-neutralGray-50 m-1 h-8 flex items-center px-3 z-50"
                >
                  <div className="text-neutralGray-700 text-sm font-normal\ leading-snug">
                    {option.label}
                  </div>
                </Box>
              );
            })}
          </Box>
          <div
            onClick={() => setIsOpen(false)}
            className="w-full h-full fixed top-0 left-0 z-30"
          ></div>
        </Box>
      )}
    </>
  );
};
