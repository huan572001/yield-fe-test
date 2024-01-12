import { Box, useRadio } from "@chakra-ui/react";

export const RadioCard = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        _checked={{
          color: "primary.500",
          borderWidth: "1px",
          borderRadius: "8px",
          borderColor: "primary.300",
          bgColor: "primary.100",
          shadow: "sm",
        }}
        px={4}
        py={2}
        minWidth={"50px"}
        className='flex justify-center items-center bg-[transparent]'
      >
        {props.children}
      </Box>
    </Box>
  );
};
