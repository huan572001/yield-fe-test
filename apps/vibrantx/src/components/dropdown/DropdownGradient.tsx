import {
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

interface Option {
  key: string;
  label: string;
}

interface DropdownGradientProps {
  options: Option[];
  onChange: (selectedKey: string) => void;
}

export const DropdownGradient = ({
  onChange,
  options,
}: DropdownGradientProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownValueFromURL = searchParams.get("product") || "lend";
  const [selectedKey, setSelectedKey] = useState(dropdownValueFromURL || "");

  const handleDropdownChange = (key: string) => {
    setSelectedKey(key);
    updateURLParams({ product: key });
  };

  const updateURLParams = (params: any) => {
    Object.keys(params).forEach((key) => {
      searchParams.set(key, params[key]);
    });
    setSearchParams(searchParams);
  };

  useEffect(() => {
    // Notify parent component about the change
    onChange(selectedKey);
  }, [selectedKey, onChange]);

  return (
    <Menu placement="bottom-end">
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            isActive={isOpen}
            variant="text"
            className="!h-auto !p-0"
          >
            <Box className="flex gap-2 items-center">
              <span className="!text-5xl  md:!text-6xl bg-text-gradient">
                {options.find((option) => option.key === selectedKey)?.label ||
                  ""}
              </span>
              <Icon
                as={FaAngleDown}
                className={clsx(
                  "text-primary-500 transition-transform ease-linear duration-200",
                  {
                    "rotate-180": isOpen,
                  }
                )}
                width={"32px"}
                height={"32px"}
              />
            </Box>
          </MenuButton>
          <MenuList className="border-[#EAEAEA] !rounded-[16px] p-[16px] shadow-md flex flex-col gap-3">
            {options.map((option) => (
              <MenuItem
                key={option.key}
                onClick={() => handleDropdownChange(option.key)}
                className="text-[18px] !px-3 !py-2 font-normal rounded-[8px]"
              >
                {option.label}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};
