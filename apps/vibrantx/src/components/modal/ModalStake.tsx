import { useAppSelector } from "@/hooks/store";
import { setCloseModalStake } from "@/redux/slice/modalSlice";
import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { FormStakePool } from "../form";

export const ModalStake = () => {
  const dispatch = useDispatch();
  const { modalStake } = useAppSelector((state) => state.modal);

  const handleCloseModal = () => {
    dispatch(setCloseModalStake());
  };

  return (
    <Modal isOpen={modalStake.isOpen} onClose={handleCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent className='py-[24px] px-[16px] !rounded-[24px] text-14px '>
        <ModalBody px={0}>
          <Flex flexDirection={"column"} gap={"24px"}>
            <FormStakePool />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
