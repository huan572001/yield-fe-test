import { useAppDispatch } from '@/hooks/store';
import { AppButton } from '@/pages/Homepage';
import { setOpenModal } from '@/redux/slice/modalSlice';
import { truncateAddress } from '@/utils/functions';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useIntl } from 'react-intl';

export const ButtonConnectWallet = () => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const { wallet, account, connected, disconnect, isLoading } = useWallet();

  return (
    <>
      {connected && wallet && account ? (
        <Menu>
          <MenuButton
            className='!h-[32px] !pl-[14px] pr-[32px] !rounded-[32px] text-dustyTeal-300 !bg-white hover:!bg-cloudySky-100'
            as={Button}
            leftIcon={
              <Avatar
                className='flex items-center !w-[27px] !h-[27px]'
                src={wallet.icon}
              />
            }
          >
            {truncateAddress(account?.address)}
          </MenuButton>
          <MenuList>
            <MenuItem>
              {intl.formatMessage({ id: 'navBar.copy-address' })}
            </MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'navBar.account' })}</MenuItem>
            <MenuItem onClick={() => disconnect()}>
              {intl.formatMessage({ id: 'navBar.logout' })}
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <AppButton
          className='shadow-xl drop-shadow-xl'
          onClick={() => dispatch(setOpenModal())}
          isLoading={!connected && isLoading}
          loadingText='Connect Wallet'
        >
          <Box className='text-[16px]'>
            {intl.formatMessage({ id: 'navBar.connect-wallet' })}
          </Box>
        </AppButton>
      )}
    </>
  );
};
