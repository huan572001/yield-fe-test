import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setCloseModal } from "@/redux/slice/modalSlice";
import {
  Wallet,
  WalletName,
  WalletReadyState,
  isRedirectable,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import {
  Avatar,
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useIntl } from "react-intl";

const ConnectWalletRow: React.FC<{
  wallet: Wallet;
  onClick(): void;
}> = ({ wallet, onClick }) => {
  const intl = useIntl();

  return (
    <div>
      <div
        className='items-center justify-between bg-gray-600 p-[1rem] flex gap-[1rem] px-[16px] hover:cursor-pointer shadow-sm rounded-[12px]'
        onClick={() => onClick()}
      >
        <div className='flex gap-[8px] items-center'>
          <Avatar
            className='flex items-center w-[2rem] h-[2rem]'
            src={wallet.icon}
            style={{ width: "30px", height: "30px" }}
          />
          <p className='text-lg font-semibold'>{wallet.name}</p>
        </div>
        <Flex alignItems={"center"} justify={"center"}>
          <Box className='dot-active'></Box>
          <Box className='font-black text-[11px] uppercase'>
            {intl.formatMessage({ id: "modalWallet.detected" })}
          </Box>
        </Flex>
      </div>
    </div>
  );
};

const InstallWalletRow: React.FC<{ wallet: Wallet }> = ({ wallet }) => {
  return (
    <a
      href={wallet.url}
      target='_blank'
      className='items-center justify-between bg-gray-600 p-[1rem] flex gap-[1rem] px-[16px] hover:cursor-pointer shadow-sm rounded-[12px]'
    >
      <Flex alignItems={"center"} gap={2}>
        <Avatar
          className='flex items-center !w-[30px] !h-[30px]'
          src={wallet.icon}
        />
        <p className='text-lg font-semibold'>{wallet.name}</p>
      </Flex>
    </a>
  );
};

export const ModalWalletConnect = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.modal);
  const { wallets, connect } = useWallet();

  const onWalletSelect = (walletName: WalletName) => {
    connect(walletName);
    dispatch(setCloseModal());
  };

  const handleCloseModal = () => {
    dispatch(setCloseModal());
  };

  const renderWalletsList = () => {
    return (wallets || []).map((wallet) => {
      const hasMobileSupport = Boolean(wallet.deeplinkProvider);
      const isWalletReady =
        wallet.readyState === WalletReadyState.Installed ||
        wallet.readyState === WalletReadyState.Loadable;

      const Container: React.FC<PropsWithChildren> = ({ children }) => {
        return <div className='py-[0.5]'>{children}</div>;
      };

      // The user is on a mobile device
      if (!isWalletReady && isRedirectable()) {
        // If the user has a deep linked app, show the wallet
        if (hasMobileSupport) {
          return (
            <Container key={wallet.name}>
              <ConnectWalletRow
                wallet={wallet}
                onClick={() => connect(wallet.name)}
              />
            </Container>
          );
        }

        // Otherwise don't show anything
        return null;
      }

      // The user is on a desktop device
      return (
        <Container key={wallet.name}>
          {isWalletReady ? (
            <ConnectWalletRow
              wallet={wallet}
              onClick={() => onWalletSelect(wallet.name)}
            />
          ) : (
            <InstallWalletRow wallet={wallet} />
          )}
        </Container>
      );
    });
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={handleCloseModal}
      isCentered
    >
      <ModalOverlay />
      <ModalContent className='!rounded-[24px] py-[24px]'>
        <ModalHeader className='text-center mt-2'>
          {intl.formatMessage({ id: "modalWallet.title" })}
          <Box className='!font-normal !text-[14px] mt-2'>
            {intl.formatMessage({ id: "modalWallet.sub-title" })}
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <div className='flex flex-col gap-3'>{renderWalletsList()}</div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
