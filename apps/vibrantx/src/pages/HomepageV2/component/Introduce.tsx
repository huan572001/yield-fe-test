import { dataIPhone1, dataIPhone2, iPhone, main_screen } from "@/assets/home";
import { Logo } from "@/components/Icon";
import { ButtonConnectWalletV2 } from "@/components/button";
import { Box } from "@chakra-ui/react";
import SVG from "react-inlinesvg";
import { useIntl } from "react-intl";
import { BoxTextGradient } from "../Homepage.styled";
const Introduce = () => {
  const intl = useIntl();
  return (
    <Box
      className='w-full h-full'
      backgroundImage={`url(${main_screen})`}
      willChange={"scroll-position"}
      backgroundSize={"cover"}
      backgroundRepeat={"no-repeat"}
      backgroundPosition={"center"}
    >
      <Box className='sm:pt-[205px] pt-[132px]'>
        <h1 className='px-4 grid gap-1'>
          <Box className='text-center text-neutral-700 !text-5xl  md:!text-6xl font-semibold font-poppins !leading-[62.4px]'>
            {intl.formatMessage({ id: "homepage.introduce.title1" })}
          </Box>
          <Box className=' flex gap-2 justify-center flex-wrap !text-5xl  md:!text-6xl font-semibold font-poppins !leading-[62.4px]'>
            <BoxTextGradient>
              {intl.formatMessage({ id: "homepage.introduce.title2" })}
            </BoxTextGradient>
            <Box className='text-neutral-700 '>
              {intl.formatMessage({ id: "homepage.introduce.title3" })}
            </Box>
            <BoxTextGradient>
              {intl.formatMessage({ id: "homepage.introduce.title4" })}
            </BoxTextGradient>
          </Box>

          <Box className='max-w-[550px] text-center text-neutral-700 text-base font-medium pt-4  mx-auto'>
            {intl.formatMessage({ id: "homepage.introduce.sub-title" })}
          </Box>
        </h1>
      </Box>
      <Box className='flex md:hidden mx-auto justify-center mt-8 z-50'>
        <ButtonConnectWalletV2 />
      </Box>
      <Box className='pt-80 md:pt-[400px]'>
        <Box className='relative'>
          <Box className='flex  justify-center z-30 absolute bottom-0 w-full'>
            <Box className='relative'>
              <SVG src={iPhone} className='w-full h-full' />
              <SVG src={dataIPhone1} className='absolute bottom-20 left-10 ' />
              <SVG src={dataIPhone2} className='absolute bottom-0 right-10' />
            </Box>
          </Box>
          <Logo className='absolute bottom-0 z-10 w-full h-auto' />
        </Box>
      </Box>
    </Box>
  );
};
export default Introduce;
