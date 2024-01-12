import { useAppSelector } from "@/hooks/store";
import { setCloseModalWithdraw } from "@/redux/slice/modalSlice";
import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { FormWithDrawPool } from "../form";

export const ModalWithdraw = () => {
  const dispatch = useDispatch();
  const { modalWithdraw } = useAppSelector((state) => state.modal);

  const handleCloseModal = () => {
    dispatch(setCloseModalWithdraw());
  };

  return (
    <Modal isOpen={modalWithdraw.isOpen} onClose={handleCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent className='py-[24px] px-[16px] !rounded-[24px] text-14px'>
        <ModalBody px={0}>
          <Flex flexDirection={"column"} gap={"24px"}>
            <FormWithDrawPool />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
