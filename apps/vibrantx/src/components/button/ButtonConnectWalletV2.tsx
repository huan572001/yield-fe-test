import { useAppDispatch } from "@/hooks/store";
import { setOpenModal } from "@/redux/slice/modalSlice";
import { truncateAddress } from "@/utils/functions";
import routerLinks from "@/utils/routerLink";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";
export const ButtonConnectWalletV2 = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const intl = useIntl();
  const { wallet, account, connected, disconnect } = useWallet();
  useEffect(() => {
    if (connected) {
      ReactGA.event({
        category: "Connect Wallet",
        action: "Connect Wallet",
        nonInteraction: true,
      });
    }
  }, [connected]);

  return (
    <>
      {connected && wallet && account ? (
        <Menu>
          <MenuButton
            className=" !h-11 px-4 py-2.5 !text-base !text-indigo-500 !font-semibold !rounded-full justify-center items-center gap-2.5 inline-flex  cursor-pointer  border border-indigo-500 "
            as={Button}
            style={{
              background: "bottom",
            }}
          >
            {truncateAddress(account?.address)}
          </MenuButton>
          <MenuList>
            <MenuItem>
              {intl.formatMessage({ id: "navBar.copy-address" })}
            </MenuItem>
            <MenuItem onClick={() => navigate(routerLinks("Portfolio"))}>
              {intl.formatMessage({ id: "navBar.account" })}
            </MenuItem>
            <MenuItem onClick={() => disconnect()}>
              {intl.formatMessage({ id: "navBar.logout" })}
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <div
          className=" !h-11 px-4 py-2.5 !text-xs !bg-indigo-500  !rounded-full justify-center items-center gap-2.5 inline-flex  cursor-pointer  border border-indigo-500 "
          onClick={() => dispatch(setOpenModal())}
        >
          <div className="text-center text-white text-sm font-semibold ">
            {intl.formatMessage({ id: "navBar.connect-wallet" })}
          </div>
        </div>
      )}
    </>
  );
};
