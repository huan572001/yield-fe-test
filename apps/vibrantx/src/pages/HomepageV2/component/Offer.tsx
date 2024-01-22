import { currency, pieChart, trendUp } from "@/assets/home";
import { Box } from "@chakra-ui/react";
import { useIntl } from "react-intl";
import { CartOfferData } from "@/services";
import { CardFlip } from "@/components/card";

const dataCart: CartOfferData[] = [
  {
    title: <>Lending</>,
    body: (
      <>Earn yields with your crypto capital without any active management</>
    ),
    bodyHover: (
      <>
        <p>Step 1: Connect wallet</p>
        <p>
          Step 2: On the Lending tab, choose the token and protocol you want to
          lend.
        </p>
        <p>Step 3: Click the ‘Supply’ button and enter the amount.</p>
      </>
    ),
    icon: currency,
  },
  {
    title: <>Staking</>,
    body: <>Earn staking rewards with your APT with ease!</>,
    bodyHover: (
      <>
        <p>Step 1: Connect wallet</p>
        <p>
          Step 2: On the Staking tab, choose the protocol that you want to stake
        </p>
        <p>Step 3: Click the ‘Stake’ button and enter the amount.</p>
      </>
    ),
    icon: trendUp,
  },
  {
    title: <>Positions</>,
    body: <>Connect your wallet to see positions you committed via VibrantX</>,
    bodyHover: (
      <>
        <p>Step 1: Connect Wallet</p>
        <p>Step 2: Click on the ‘Positions’ tab to go to your Portfolio</p>
        <p>Step 3: Monitor your token balance, strategies and rewards.</p>
      </>
    ),
    icon: pieChart,
  },
];
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
            {dataCart?.map((e: CartOfferData, index) => {
              return <CardFlip key={index} data={e} />;
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Offer;
