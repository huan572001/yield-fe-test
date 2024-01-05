import { BoxTextGradient } from "../Homepage.styled";
import { Box } from "@chakra-ui/react";

const Positions = () => {
  return (
    <Box className="mt-[120px] grid gap-[60px] justify-center">
      <div className="justify-start items-center gap-3 flex">
        <div className="text-center text-neutral-700 text-6xl font-semibold ">
          Track your
        </div>
        <div className=" justify-start items-center gap-1 flex">
          <BoxTextGradient className="text-center  text-6xl font-bold">
            Positions
          </BoxTextGradient>
        </div>
        <div className="text-center text-neutral-700 text-6xl font-semibold  leading-10">
          in one place
        </div>
      </div>
    </Box>
  );
};
export default Positions;
