import { chevronDown } from "@/assets/home";
import { BoxTextGradient } from "../Homepage.styled";
import { Box } from "@chakra-ui/react";
import SVG from "react-inlinesvg";
const Lending = () => {
  return (
    <Box className="mt-[120px] grid gap-[60px]">
      <div className="justify-center items-center gap-4 grid">
        <div className="justify-start items-center gap-3 flex">
          <div className="text-center text-neutral-700 text-6xl font-semibold ">
            I want to
          </div>
          <div className=" justify-start items-center gap-1 flex">
            <BoxTextGradient className="text-center  text-6xl font-bold leading-10">
              Lend
            </BoxTextGradient>
            <SVG src={chevronDown} />
          </div>
          <div className="text-center text-neutral-700 text-6xl font-semibold  leading-10">
            with VibrantX
          </div>
        </div>
        <div className=" text-center text-zinc-500 text-xl font-medium  leading-loose">
          Earn yields with your crypto capital without any active management
        </div>
      </div>
      <Box>Table</Box>
    </Box>
  );
};
export default Lending;
