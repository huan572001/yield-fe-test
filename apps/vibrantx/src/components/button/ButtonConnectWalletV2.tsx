import { useAppDispatch } from "@/hooks/store";
import { setOpenModal } from "@/redux/slice/modalSlice";
import { truncateAddress } from "@/utils/functions";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useIntl } from "react-intl";

export const ButtonConnectWalletV2 = () => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const { wallet, account, connected, disconnect } = useWallet();

  return (
    <>
      {connected && wallet && account ? (
        <Menu>
          <MenuButton
            className=" !h-11 px-4 py-2.5 !bg-indigo-500 !rounded-full justify-center items-center gap-2.5 inline-flex hover:!bg-indigo-400 cursor-pointer"
            as={Button}
          >
            {truncateAddress(account?.address)}
          </MenuButton>
          <MenuList>
            <MenuItem>
              {intl.formatMessage({ id: "navBar.copy-address" })}
            </MenuItem>
            <MenuItem>{intl.formatMessage({ id: "navBar.account" })}</MenuItem>
            <MenuItem onClick={() => disconnect()}>
              {intl.formatMessage({ id: "navBar.logout" })}
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <div
          className="w-40 h-11 px-4 py-2.5 bg-indigo-500 rounded-full justify-center items-center gap-2.5 inline-flex hover:bg-indigo-400 cursor-pointer"
          onClick={() => dispatch(setOpenModal())}
        >
          <div className="text-white text-base font-medium leading-normal">
            {intl.formatMessage({ id: "navBar.connect-wallet" })}
          </div>
        </div>
      )}
    </>
  );
};
