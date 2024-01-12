import { Box } from "@chakra-ui/react";
import { GradientCart } from "../Homepage.styled";

const CartHome = () => {
  return (
    <Box>
      <Box className=" flex  justify-center ">
        <Box className="w-[1215px] ">
          <Box className="xl:px-0 px-4">
            <GradientCart className="w-full px-8 py-6 rounded-3xl border">
              <Box className="flex flex-wrap justify-around gap-12">
                <Box>
                  <Box className=" text-center text-white text-4xl font-medium ">
                    $120.99M
                  </Box>
                  <Box className=" text-center text-white text-sm font-medium">
                    Total APT Trading Volume
                  </Box>
                </Box>
                <Box>
                  <Box className=" text-center text-white text-4xl font-medium ">
                    400M+
                  </Box>
                  <Box className=" text-center text-white text-sm font-medium">
                    Total APT Transactions
                  </Box>
                </Box>
                <Box>
                  <Box className=" text-center text-white text-4xl font-medium ">
                    -
                  </Box>
                  <Box className=" text-center text-white text-sm font-medium">
                    Rewards Distributed
                  </Box>
                </Box>
              </Box>
            </GradientCart>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default CartHome;
