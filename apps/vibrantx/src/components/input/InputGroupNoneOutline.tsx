import { Box, Input } from '@chakra-ui/react';
import React from 'react';

type InputGroupNoneOutlineProps = {
  placeholder?: string;
  type?: string;
  suffix?: React.ReactNode;
};

export const InputGroupNoneOutline = ({
  type,
  placeholder,
  suffix,
}: InputGroupNoneOutlineProps) => {
  return (
    <Box className='flex gap-1 bg-white rounded-full'>
      <Input
        className='!outline-none !border-none !rounded-full hover:!border-none focus-visible:!border-none focus-visible:!shadow-none !pr-0'
        type={type}
        placeholder={placeholder}
      />
      <Box className='' width='auto'>
        {suffix}
      </Box>
    </Box>
  );
};
