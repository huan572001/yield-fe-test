import logoIcon from "@/assets/LogoNew.svg";
import discord from "@/assets/Discord.svg";
import telegram from "@/assets/Telegram.svg";
import twitter from "@/assets/Twitter.svg";
import { Box } from "@chakra-ui/react";
import SVG from "react-inlinesvg";
import { medium } from "@/assets/home";

export default function Footer() {
  return (
    <Box className="  py-[60px] bg-gradient-to-r from-violet-500 via-cyan-600 to-blue-600 flex items-center">
      <Box className="w-[1215px] mx-auto  px-4 xl:px-0 flex justify-between flex-wrap items-center">
        <div className="grid  md:grid-cols-10 gap-4 w-full items-center justify-center">
          <div className="md:col-span-2 flex w-full justify-center md:justify-start">
            <SVG src={logoIcon} height={40} fill="white" />
          </div>
          <div className="md:col-span-6 flex justify-center sm:justify-around flex-wrap gap-4 items-center">
            <a
              target="_blank"
              href="https://docs.vibrantx.finance/"
              className="text-white text-base font-medium " rel="noreferrer"
            >
              About us
            </a>
            {/* <div className="text-white text-base font-medium ">
              Business Enquiries
            </div> */}
            {/* <div className="text-white text-base font-medium ">
              Customer Support
            </div> */}
            <a
              target="_blank"
              href="https://docs.vibrantx.finance/terms-of-service"
              className="text-white text-base font-medium " rel="noreferrer"
            >
              Terms & Conditions
            </a>
            <a
              target="_blank"
              href="https://docs.vibrantx.finance/"
              className="text-white text-base font-medium " rel="noreferrer"
            >
              Docs
            </a>
            {/* <div className="text-white text-base font-medium ">Press Kit</div> */}
          </div>
          <Box className="flex gap-2 md:col-span-2 justify-center md:justify-end">
            <a target="_blank" href="https://discord.gg/h8sWcV2G" rel="noreferrer">
              <SVG
                className="hover:cursor-pointer"
                src={discord}
                width={24}
                height={24}
              />
            </a>
            <a target="_blank" href="https://t.me/vibrantx_finance" rel="noreferrer">
              <SVG
                className="hover:cursor-pointer"
                src={telegram}
                width={24}
                height={24}
              />
            </a>
            <a target="_blank" href="https://twitter.com/VibrantXFinance" rel="noreferrer">
              <SVG
                className="hover:cursor-pointer"
                src={twitter}
                width={24}
                height={24}
              />
            </a>{" "}
            <a target="_blank" href="https://medium.com/@VibrantxFinance" rel="noreferrer">
              <SVG
                className="hover:cursor-pointer"
                src={medium}
                width={24}
                height={24}
              />
            </a>
          </Box>
        </div>
      </Box>
    </Box>
  );
}
