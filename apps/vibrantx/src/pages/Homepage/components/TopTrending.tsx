import totalMarketIcon from '@/assets/total_market_cap.svg';
import totalVolumeIcon from '@/assets/total_volume.svg';
import {
  Box,
  Button,
  Flex,
  Icon,
  SimpleGrid,
  Switch,
  Text,
} from '@chakra-ui/react';
import { FaCaretDown, FaChevronRight } from 'react-icons/fa';
import SVG from 'react-inlinesvg';

export const TopTrending = () => {
  return (
    <Box className='pt-[38px]'>
      <Box className='flex justify-between items-start'>
        <Text className='text-midnightNavy text-[24px] font-bold'>
          Cryptocurrency Prices by Market Cap
        </Text>
        <Box className='text-midnightBlue text-[14px] font-semibold flex gap-2 items-center'>
          <Text>Highlights</Text>
          <Switch
            colorScheme='deepGreen'
            size='lg'
            onChange={(e) => console.log(e)}
          />
        </Box>
      </Box>
      <Text>
        The global cryptocurrency market cap today is $1.73 Trillion, a
        <span>
          <span className='text-primaryRed'>
            {' '}
            <Icon as={FaCaretDown} /> 0.4%
          </span>{' '}
          change in the last 24 hours.
        </span>
        <span>
          <Button className='!p-2' variant='text'>
            Read more
          </Button>
        </span>
      </Text>
      <SimpleGrid minChildWidth='300px' spacing='40px' marginTop={'36px'}>
        <Box className='flex flex-col gap-2 '>
          <Box className=' bg-white p-[16px] rounded-[8px] flex gap-3 shadow-md'>
            <Box className='flex-1 w-[50%]'>
              <Text className='text-[18px] text-midnightNavy font-bold'>
                $1,730,810,156,481
              </Text>
              <Flex justifyContent='space-between'>
                <Text className='text-steelBlue font-semibold text-[14px]'>
                  Market
                </Text>
                <Box className='text-primaryRed'>
                  <Icon as={FaCaretDown} />
                </Box>
              </Flex>
              <Flex justifyContent='space-between'>
                <Text className='text-steelBlue font-semibold text-[14px]'>
                  Capitalization
                </Text>
                <Text className='text-primaryRed'>0.4%</Text>
              </Flex>
            </Box>
            <Box className='flex-1 w-[auto]'>
              <SVG width={120} src={totalMarketIcon} />
            </Box>
          </Box>
          <Box className=' bg-white p-[16px] rounded-[8px] flex gap-3 shadow-md'>
            <Box className='flex-1 w-[50%]'>
              <Text className='text-[18px] text-midnightNavy font-bold'>
                $1,730,810,156,481
              </Text>
              <Text className='text-steelBlue font-semibold text-[14px]'>
                24h Trading Volume
              </Text>
            </Box>
            <Box className='flex-1 w-[auto]'>
              <SVG width={120} src={totalVolumeIcon} />
            </Box>
          </Box>
        </Box>
        <Box className='py-[10px] px-[8px] text-midnightNavy font-semibold'>
          <Flex justifyContent='space-between'>
            <Box className='text-[16px]'>🔥 Trending</Box>
            <Button
              variant='text'
              className='text-[13px] text-midnightBlue !p-0 !h-auto'
            >
              View more <Icon as={FaChevronRight} />
            </Button>
          </Flex>
        </Box>
        <Box className='py-[10px] px-[8px] text-midnightNavy font-semibold'>
          <Flex justifyContent='space-between'>
            <Box className='text-[16px]'>🚀 Highest APR</Box>
            <Button
              variant='text'
              className='text-[13px] text-midnightBlue !p-0'
            >
              View more <Icon as={FaChevronRight} />
            </Button>
          </Flex>
        </Box>
      </SimpleGrid>
      <Box className='bg-paleGreen text-deepGreen-200 px-[34px] mt-10 py-2 rounded-[8px] font-semibold text-[14px]'>
        Disclaimer: Connect your wallet to see positions you commited via
        VibrantX. We will support more positions in the future.
      </Box>
    </Box>
  );
};
