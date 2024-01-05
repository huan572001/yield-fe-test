import searchIcon from '@/assets/search.svg';
import { Box, Input, ModalBody, ModalContent } from '@chakra-ui/react';
import SVG from 'react-inlinesvg';

export const ModalSearch = () => {
  return (
    <ModalContent className='!rounded-[12px]'>
      <ModalBody className='text-gray-400 text-[18px] flex flex-col gap-3'>
        <Box className='flex relative items-center'>
          <SVG
            src={searchIcon}
            width={20}
            height={20}
            className='text-deepGreen-100'
          />
          <form className='w-full'>
            <Input
              // autoFocus
              placeholder='Search the VibrantX finance'
              className='!outline-none !border-none hover:!border-none focus-visible:!border-none focus-visible:!shadow-none w-full'
            />
          </form>
        </Box>
      </ModalBody>
    </ModalContent>
  );
};
