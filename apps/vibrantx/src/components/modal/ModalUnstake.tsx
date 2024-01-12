import { useAppSelector } from "@/hooks/store";
import { setCloseModalUnstake } from "@/redux/slice/modalSlice";
import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { FormUnStakePool } from "../form";

export const ModalUnstake = () => {
  const dispatch = useDispatch();
  const { modalUnstake } = useAppSelector((state) => state.modal);

  const handleCloseModal = () => {
    dispatch(setCloseModalUnstake());
  };

  return (
    <Modal isOpen={modalUnstake.isOpen} onClose={handleCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent className='py-[24px] px-[16px] !rounded-[24px] text-14px '>
        <ModalBody px={0}>
          <Flex flexDirection={"column"} gap={"24px"}>
            <FormUnStakePool />
          </Flex>
        </ModalBody>
        {/* <ModalFooter className='!px-0 !justify-between'>
          <Accordion className='w-full' allowToggle>
            <AccordionItem className='border-solid border-[1px] border-primary-100 rounded-2xl'>
              <AccordionButton className=':hover:!bg-[transparent]'>
                <Box
                  as='span'
                  flex='1'
                  textAlign='left'
                  className='text-primary-450'
                >
                  Transaction Settings
                </Box>
                <Icon as={IoSettingsOutline} />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Flex flexDirection={"column"} gap={"8px"}>
                  <Box>Slippage Tolerance</Box>
                  <ButtonGroup spacing='21px' className='w-full'>
                    <Button className='!text-primary-400 !bg-primary-100 !tracking-normal w-full !font-normal'>
                      0.1%
                    </Button>
                    <Button className='!text-primary-400 !bg-primary-100 !tracking-normal w-full !font-normal'>
                      0.5%
                    </Button>
                    <Button className='!text-primary-400 !bg-primary-100 !tracking-normal w-full !font-normal'>
                      1.0%
                    </Button>
                    <Button className='!text-primary-400 !bg-primary-100 !tracking-normal w-full !font-normal'>
                      1.5%
                    </Button>
                  </ButtonGroup>
                  <Box className='text-primary-400'>
                    Your transaction will revert if the price changes
                    unfavorably by more than this percentage
                  </Box>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
