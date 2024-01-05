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
                  Earn yields with your crypto capital without any active
                  management
                </Box>
                <Box
                  as="button"
                  className="w-24 h-11 bg-indigo-500 rounded-full shadow text-white text-base font-semibold hover:bg-indigo-600"
                >
                  Discover
                </Box>
              </Box>
            </Box>

            <Box className="border-gradient">
              <Box className="w-96 max-[386px]:w-auto p-6 boxed-gradient-child bg-white bg-opacity-40 rounded-3xl border flex-col justify-start items-start gap-6 inline-flex">
                <Box className=" flex justify-between w-full items-center">
                  <Box className="grow shrink basis-0 text-neutral-700 text-3xl font-bold">
                    Positions
                  </Box>
                  <SVG src={trendUp} />
                </Box>
                <Box className=" text-primary-400 text-base font-medium">
                  Earn staking rewards with your APT with
                  <br />
                  ease!
                </Box>
                <Box
                  as="button"
                  className="w-24 h-11 bg-indigo-500 rounded-full shadow text-white text-base font-semibold hover:bg-indigo-600"
                >
                  Discover
                </Box>
              </Box>
            </Box>
            <Box className="border-gradient">
              <Box className="w-96 boxed-gradient-child max-[386px]:w-auto p-6 bg-white bg-opacity-40 rounded-3xl border flex-col justify-start items-start gap-6 inline-flex">
                <Box className=" flex justify-between w-full items-center">
                  <Box className="grow shrink basis-0 text-neutral-700 text-3xl font-bold">
                    Staking
                  </Box>
                  <SVG src={pieChart} />
                </Box>
                <Box className=" text-primary-400 text-base font-medium">
                  Connect your wallet to see positions you committed via
                  VibrantX
                </Box>
                <Box
                  as="button"
                  className="w-24 h-11 bg-indigo-500 rounded-full shadow text-white text-base font-semibold hover:bg-indigo-600"
                >
                  Discover
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Offer;
