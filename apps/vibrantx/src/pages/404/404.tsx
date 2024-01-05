import { Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box className='flex justify-center flex-col items-center min-h-[350px] gap-[32px] bg-gradiant'>
      <Box className='text-[1.5em] text-dustyTeal-300 font-bold'>
        Sorry, page not found.
      </Box>
      <Button
        onClick={() => navigate('/')}
        className='!bg-dustyTeal-300 hover:!bg-dustyTeal-100 text-bold !text-white !rounded-[32px]'
      >
        Go to homepage
      </Button>
    </Box>
  );
};
