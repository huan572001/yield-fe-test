import { useAppSelector } from "@/hooks/store";
import { AppButton } from "@/pages/Homepage";
import { setCloseModalSettings } from "@/redux/slice/modalSlice";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

export const ModalSettings = () => {
  const dispatch = useDispatch();
  const { modalSettings } = useAppSelector((state) => state.modal);

  const handleCloseModal = () => {
    dispatch(setCloseModalSettings());
  };

  return (
    <Modal isOpen={modalSettings.isOpen} onClose={handleCloseModal} isCentered>
      <ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='2px'
      />
      <ModalContent className='p-[20px] !rounded-[12px] text-[14px] border-deepGreen-100 border-[2px] border-solid'>
        <ModalHeader className='flex justify-between items-center !px-0'>
          <Text className='tracking-[4.8px]'>SETTINGS</Text>
        </ModalHeader>
        <ModalBody pb={6} px={0} className='text-gray-400 flex flex-col gap-3'>
          <Box className='font-semibold'>Slippage Tolerance</Box>
          <ButtonGroup spacing='21px' className='w-full'>
            <Button className='!text-gray-400 !bg-gray-200 !tracking-normal w-full !font-normal'>
              0.1%
            </Button>
            <Button className='!text-gray-400 !bg-gray-200 !tracking-normal w-full !font-normal'>
              0.5%
            </Button>
            <Button className='!text-gray-400 !bg-gray-200 !tracking-normal w-full !font-normal'>
              1.0%
            </Button>
            <Button className='!text-gray-400 !bg-gray-200 !tracking-normal w-full !font-normal'>
              1.5%
            </Button>
          </ButtonGroup>
          <Box>
            Your transaction will revert if the price changes unfavorably by
            more than this percentage.
          </Box>
          <Box className='font-semibold'>Priority fee</Box>
          <ButtonGroup spacing='21px' className='w-full'>
            <Button className='!text-gray-400 !bg-gray-200 !tracking-normal w-full !font-normal'>
              None
            </Button>
            <Button className='!text-gray-400 !bg-gray-200 !tracking-normal w-full !font-normal'>
              Medium
            </Button>
            <Button className='!text-gray-400 !bg-gray-200 !tracking-normal w-full !font-normal'>
              Turbo
            </Button>
          </ButtonGroup>
          <InputGroup className='!bg-gray-200 !rounded-[12px]'>
            <InputLeftAddon className='!border-none !bg-[transparent] '>
              Custom max priority fee {`(${modalSettings.strategies.name})`}
            </InputLeftAddon>
            <Input
              style={{
                direction: "rtl",
                textAlign: "right",
                unicodeBidi: "plaintext",
              }}
              className='!outline-none !border-none !rounded-full hover:!border-none  focus-visible:!border-none focus-visible:!shadow-none '
              type='number'
            />
          </InputGroup>
          <Box className='font-light'>
            The priority fee is paid to the Solana network. This additional fee
            helps boost how a transaction is prioritized against others,
            resulting in faster transaction execution times.
          </Box>
          <Checkbox className='!items-start'>
            <Box className='!text-[14px]'>Versioned Transaction</Box>
            <Box className='font-light text-[14px]'>
              (Please, uncheck if using Ledger)
            </Box>
          </Checkbox>
        </ModalBody>
        <ModalFooter className='!px-0 !justify-between gap-6'>
          <AppButton onClick={handleCloseModal} className='w-full'>
            SAVE
          </AppButton>
          <Button
            onClick={handleCloseModal}
            className='!bg-gray-500 w-full !text-white !rounded-[12px]'
          >
            CANCEL
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
