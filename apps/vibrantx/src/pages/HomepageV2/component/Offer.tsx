import { currency, pieChart, trendUp } from "@/assets/home";
import { Box } from "@chakra-ui/react";
import SVG from "react-inlinesvg";
import { useIntl } from "react-intl";

const Offer = () => {
  const intl = useIntl();

  return (
    <Box className="flex justify-center mt-[60px] sm:mt-[120px] ">
      <Box className="w-[1215px] ">
        <Box className="w-full">
          <Box className=" text-center text-neutral-700 !text-5xl  md:!text-6xl font-semibold">
            {intl.formatMessage({ id: "homepage.offer.title" })}
          </Box>
          <Box className="flex flex-wrap justify-center gap-7 mt-[60px]">
            <Box className="border-gradient">
              <Box className="w-96 boxed-gradient-child max-[386px]:w-auto p-6 bg-white bg-opacity-40 rounded-3xl border flex-col justify-start items-start gap-6 inline-flex">
                <Box className=" flex justify-between w-full items-center ">
                  <Box className="grow shrink basis-0 text-neutral-700 text-3xl font-bold">
                    Lending
                  </Box>
                  <SVG src={currency} />
                </Box>
                <Box className=" text-primary-400 text-base font-medium">
                  <p>Step 1: Connect wallet</p>
                  <p>
                    Step 2: On the Lending tab, choose the token and protocol
                    you want to lend.
                  </p>
                  <p>Step 3: Click the ‘Supply’ button and enter the amount.</p>
                </Box>
                {/* <Box
                  as="button"
                  className="w-24 h-11 !bg-indigo-500 rounded-full shadow text-white text-base font-semibold hover:!bg-indigo-400 cursor-pointer"
                >
                  Discover
                </Box> */}
              </Box>
            </Box>

            <Box className="border-gradient">
              <Box className="w-96 max-[386px]:w-auto p-6 boxed-gradient-child bg-white bg-opacity-40 rounded-3xl border flex-col justify-start items-start gap-6 inline-flex">
                <Box className=" flex justify-between w-full items-center">
                  <Box className="grow shrink basis-0 text-neutral-700 text-3xl font-bold">
                    Staking
                  </Box>
                  <SVG src={trendUp} />
                </Box>
                <Box className=" text-primary-400 text-base font-medium">
                  <p>Step 1: Connect wallet</p>
                  <p>
                    Step 2: On the Staking tab, choose the protocol that you
                    want to stake
                  </p>
                  <p>Step 3: Click the ‘Stake’ button and enter the amount.</p>
                </Box>
                {/* <Box
                  as="button"
                  className="w-24 h-11 bg-indigo-500 rounded-full shadow text-white text-base font-semibold hover:bg-indigo-600"
                >
                  Discover
                </Box> */}
              </Box>
            </Box>
            <Box className="border-gradient">
              <Box className="w-96 boxed-gradient-child max-[386px]:w-auto p-6 bg-white bg-opacity-40 rounded-3xl border flex-col justify-start items-start gap-6 inline-flex">
                <Box className=" flex justify-between w-full items-center">
                  <Box className="grow shrink basis-0 text-neutral-700 text-3xl font-bold">
                    Positions
                  </Box>
                  <SVG src={pieChart} />
                </Box>
                <Box className=" text-primary-400 text-base font-medium">
                  <p>Step 1: Connect Wallet</p>
                  <p>
                    Step 2: Click on the ‘Positions’ tab to go to your Portfolio
                  </p>
                  <p>
                    Step 3: Monitor your token balance, strategies and rewards.
                  </p>
                </Box>
                {/* <Box
                  as="button"
                  className="w-24 h-11 bg-indigo-500 rounded-full shadow text-white text-base font-semibold hover:bg-indigo-600"
                >
                  Discover
                </Box> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Offer;
