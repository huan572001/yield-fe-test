import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setCloseModalDynamically } from '@/redux/slice/modalSlice';
import { Modal, ModalOverlay } from '@chakra-ui/react';

export const ModalDynamically = () => {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.modal);

  const handleCloseModal = () => {
    dispatch(setCloseModalDynamically());
  };

  return (
    <Modal isOpen={modal.isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      {modal.component}
    </Modal>
  );
};
