import { Box } from "@chakra-ui/react";
import {
  aptos,
  aries,
  main_screen,
  movebit1,
  sushi,
  thala,
} from "@/assets/home";
import CartHome from "./component/CartHome";
import Introduce from "./component/Introduce";
import Offer from "./component/Offer";
import { Lending, Positions } from "../Homepage/components";
import { useIntl } from "react-intl";
import SVG from "react-inlinesvg";
import withPageTracking from "@/components/WithPageTracking";
const HomepageV2 = () => {
  const intl = useIntl();

  return (
    <Box
      backgroundImage={`url(${main_screen})`}
      bgPosition="center"
      bgRepeat={"no-repeat"}
      backgroundSize="cover"
    >
      <Introduce />
      {/* <Box className="flex lg:justify-center py-6"> */}
      <Box className=" flex items-center flex-shrink-0 sm:py-16 py-8 gap-24 ">
        <SVG src={sushi} height={40} className="flex-shrink-0" />
        <SVG src={aptos} height={40} className="flex-shrink-0" />
        <SVG src={thala} height={40} className="flex-shrink-0" />
        <SVG src={aries} height={40} className="flex-shrink-0" />
        <SVG src={sushi} height={40} className="flex-shrink-0" />
        <SVG src={aptos} height={40} className="flex-shrink-0" />
        <SVG src={thala} height={40} className="flex-shrink-0" />
        <SVG src={aries} height={40} className="flex-shrink-0" />
      </Box>
      {/* </Box> */}
      <Box className="max-w-[1215px] mx-auto xl:px-0 px-4">
        <CartHome />
        <Offer />
        <Lending />

        <Box className="mt-[80px]">
          <Positions />
        </Box>
        <div className="flex-col justify-center items-center gap-8 grid py-[120px]">
          <div className="text-center text-neutral-700 !text-5xl md:!text-6xl font-semibold ">
            {intl.formatMessage({ id: "homepage.Secured.title" })}
          </div>
          <div className="flex justify-center">
            <div className="border-gradient  min-[400px]:w-96 w-full">
              <div className=" p-6 bg-white rounded-3xl border boxed-gradient-child  border-opacity-80 flex-col justify-center items-center gap-6 flex">
                <img src={movebit1} alt="movebit" />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};
export default withPageTracking(HomepageV2);
