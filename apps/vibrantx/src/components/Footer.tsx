import arrowIcon from '@/assets/arrow.svg';
import logoIcon from '@/assets/vibrantx.svg';
import { InputGroupNoneOutline } from '@/components/input';
import {
  footerAboutVibrantX,
  footerResources,
  footerSupport,
} from '@/utils/constants';
import { Box, Button, Grid, GridItem, Icon } from '@chakra-ui/react';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { IoLogoDiscord } from 'react-icons/io5';
import SVG from 'react-inlinesvg';
import { useIntl } from 'react-intl';

export default function Footer() {
  const intl = useIntl();
  const renderColumns = (
    title: string,
    content: { content: string; link: string }[]
  ) => {
    return (
      <Box className='flex flex-col gap-[18px]'>
        <Box className='font-bold'>{intl.formatMessage({ id: title })}</Box>
        {content.map((item, index) => (
          <Box className='hover:cursor-pointer font-normal' key={index}>
            {intl.formatMessage({ id: item.content })}
          </Box>
        ))}
      </Box>
    );
  };
  return (
    <Box className='bg-deepGreen-100 mt-[60px] text-white text-[14px] px-[16px]'>
      <Box className='w-full max-w-[1440px] mx-auto py-[28px] xl:px-0'>
        <Grid
          templateColumns={[
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            '201px 1fr 1fr 1fr',
            '201px 1fr 1fr 1fr',
            '201px 1fr 1fr 1fr 371px',
          ]}
          className='gap-[32px] xl:gap-[64px]'
        >
          <GridItem w='100%' className='hidden md:block'>
            <Box className='flex flex-col gap-0 items-center'>
              <SVG width={201} height={95} src={logoIcon} />
              <Box className='flex gap-[16px] mx-auto'>
                <Icon
                  className='hover:cursor-pointer'
                  width={'20px'}
                  height={'20px'}
                  as={FaTwitter}
                />
                <Icon
                  className='hover:cursor-pointer'
                  width={'20px'}
                  height={'20px'}
                  as={IoLogoDiscord}
                />
                <Icon
                  className='hover:cursor-pointer'
                  width={'20px'}
                  height={'20px'}
                  as={FaGithub}
                />
              </Box>
            </Box>
          </GridItem>
          <GridItem w='100%'>
            {renderColumns('footer.resources', footerResources)}
          </GridItem>
          <GridItem w='100%'>
            {renderColumns('footer.support', footerSupport)}
          </GridItem>
          <GridItem w='100%'>
            {renderColumns('footer.about-vibrantx', footerAboutVibrantX)}
          </GridItem>
          <GridItem
            w='100%'
            className='hidden md:block col-span-2 xl:col-span-1'
          >
            <Box className='flex flex-col'>
              <Box className='font-bold'>
                {intl.formatMessage({ id: 'footer.stay-up' })}
              </Box>
              <Box>{intl.formatMessage({ id: 'footer.subscribe-to' })}</Box>
              <Box className='mt-[12px]'>
                <InputGroupNoneOutline
                  suffix={
                    <Button
                      className='!bg-transparent !rounded-full !bg-white'
                      rightIcon={<SVG src={arrowIcon} />}
                    >
                      {intl.formatMessage({ id: 'footer.subscribe' })}
                    </Button>
                  }
                />
              </Box>
            </Box>
          </GridItem>
        </Grid>
        <Box className='flex gap-[32px] flex-col md:hidden'>
          <Box className='flex flex-col w-full'>
            <Box>{intl.formatMessage({ id: 'footer.stay-up' })}</Box>
            <Box>{intl.formatMessage({ id: 'footer.subscribe-to' })}</Box>
            <Box className='mt-[12px] text-midnightNavy'>
              <InputGroupNoneOutline
                suffix={
                  <Button
                    className='!bg-transparent !rounded-full !bg-white'
                    rightIcon={<SVG src={arrowIcon} />}
                  >
                    {intl.formatMessage({ id: 'footer.subscribe' })}
                  </Button>
                }
              />
            </Box>
          </Box>
          <Box className='flex flex-col gap-0 items-center'>
            <SVG width={201} height={95} src={logoIcon} />
            <Box className='flex gap-[16px] mx-auto'>
              <Icon
                className='hover:cursor-pointer'
                width={'20px'}
                height={'20px'}
                as={FaTwitter}
              />
              <Icon
                className='hover:cursor-pointer'
                width={'20px'}
                height={'20px'}
                as={IoLogoDiscord}
              />
              <Icon
                className='hover:cursor-pointer'
                width={'20px'}
                height={'20px'}
                as={FaGithub}
              />
            </Box>
          </Box>
        </Box>
        <Box className='text-center mt-10'>
          © 2023 vibrantX. All Rights Reserved.
        </Box>
      </Box>
    </Box>
  );
}
