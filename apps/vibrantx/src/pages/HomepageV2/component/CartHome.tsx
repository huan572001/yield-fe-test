import { Box } from "@chakra-ui/react";

const CartHome = () => {
  return (
    <Box>
      <Box className=" flex  justify-center ">
        <Box className="w-[1215px] ">
          <Box className="xl:px-0 px-4">
            <Box className="w-full px-8 py-6 opacity-60 bg-gradient-to-r from-indigo-500 via-cyan-600 to-sky-600 rounded-3xl border border-indigo-400 border-opacity-80 backdrop-blur-2xl ">
              <Box className="flex flex-wrap justify-around gap-6">
                <Box>
                  <Box className=" text-center text-white text-4xl font-medium ">
                    $2.13B
                  </Box>
                  <Box className=" text-center text-white text-sm font-medium">
                    Total APT Trading Volume
                  </Box>
                </Box>
                <Box>
                  <Box className=" text-center text-white text-4xl font-medium ">
                    $2.13B
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
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default CartHome;
