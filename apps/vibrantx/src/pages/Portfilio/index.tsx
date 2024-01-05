import { Box, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { homepageBgColer, main_screen } from "@/assets/home";

import { useIntl } from "react-intl";
import { TextGradient } from "./index.style";

export const Portfilio = () => {
  const intl = useIntl();

  return (
    <Box
      className="bg-cover bg-center bg-no-repeat h-[100vh]"
      style={{
        backgroundImage: `url(${homepageBgColer})`,
      }}
    >
      <Box
        className=" w-full h-full bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url(${main_screen})`,
        }}
      >
        <Box className="grid justify-center md:pt-[307px] pt-36 gap-4 xl:px-0 px-4">
          <TextGradient>
            {intl.formatMessage({ id: "portfolio.title" })}
          </TextGradient>
          <Box className="text-primary-450 text-base font-medium text-center ">
            {intl.formatMessage({ id: "portfolio.sub-title" })}
          </Box>
          <InputGroup className="min-[436px]:!w-[400px] mx-auto">
            <Input
              placeholder="Your Email"
              className="!rounded-l-[100px] !border-gray-300 !border-r-0 !border  !bg-white  text-base"
            />
            <InputRightAddon className="!rounded-r-[100px] bg-neutral-100 border-gray-300 !border-l-0 !border">
              <p className="text-base font-semibold text-primary-500">
                {intl.formatMessage({ id: "portfolio.button.submit" })}{" "}
              </p>
            </InputRightAddon>
          </InputGroup>
        </Box>
      </Box>
    </Box>
  );
};
