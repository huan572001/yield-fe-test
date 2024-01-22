import { homepageBgColer, movebit1 } from "@/assets/home";
import withPageTracking from "@/components/WithPageTracking";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import { Lending, Positions } from "../Homepage/components";
import CartHome from "./component/CartHome";
import Introduce from "./component/Introduce";
import Logo from "./component/Logo";
import Offer from "./component/Offer";
import Questions from "./component/Questions";

const HomepageV2 = () => {
  const intl = useIntl();
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      if (location.search) {
        const search = location.search.split("=")[1];
        const target = window.document.getElementById(search);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 100);
  }, []);
  return (
    <Box
      backgroundImage={`url(${homepageBgColer})`}
      willChange={"scroll-position"}
      backgroundSize={"cover"}
      backgroundRepeat={"no-repeat"}
      backgroundPosition={"center"}
    >
      <Helmet>
        <title>VibrantX</title>
        <meta
          name="description"
          content="One stop shop for discovering and accessing all exciting DeFi opportunities on Aptos."
        />
        <meta
          name="keywords"
          content="coin, vibrantx,aptos, APT,Lending coin, Staking coin"
        ></meta>
      </Helmet>
      <Introduce />
      {/* <Box className="flex lg:justify-center py-6"> */}
      <Logo />
      {/* </Box> */}
      <Box className="max-w-[1215px] mx-auto xl:px-0 px-4">
        <CartHome />
        <Offer />
        <Box id="Staking">
          <Lending />
        </Box>

        <Box className="pt-[80px]" id="Positions">
          <Positions />
        </Box>
        <div className="flex-col justify-center items-center gap-8 grid py-[120px]">
          <div className="text-center text-neutral-700 !text-5xl md:!text-6xl font-semibold ">
            {intl.formatMessage({ id: "homepage.Secured.title" })}
          </div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://docs.vibrantx.finance/audit"
            className="flex justify-center"
          >
            <div className="border-gradient  min-[400px]:w-96 w-full">
              <div className=" p-6 bg-white rounded-3xl border boxed-gradient-child  border-opacity-80 flex-col justify-center items-center gap-6 flex">
                <img src={movebit1} alt="movebit" />
              </div>
            </div>
          </a>
        </div>
        <Questions />
      </Box>
    </Box>
  );
};
export default withPageTracking(HomepageV2);
