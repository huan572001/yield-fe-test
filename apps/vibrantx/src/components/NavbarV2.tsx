import logoIcon from "@/assets/LogoNew.svg";
import searchIcon from "@/assets/search-lg.svg";
import iconCoin from "@/assets/Frame_19.svg";
import menu from "@/assets/menu-01.svg";
import close from "@/assets/x-close.svg";
import { siteConfig } from "@/config/site";
import { useAppDispatch } from "@/hooks/store";
import { setOpenModalDynamically } from "@/redux/slice/modalSlice";
import { Box } from "@chakra-ui/react";
import SVG from "react-inlinesvg";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { ButtonConnectWalletV2 } from "./button";
import { ModalSearch } from "./modal";
import { useState } from "react";
import routerLinks from "@/utils/routerLink";

export const Navbar = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useAppDispatch();
  const onPress = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const target = window.document.getElementById(
      e.currentTarget.href.split("#")[1]
    );
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box className="absolute top-0 w-full">
      <Box className=" pt-5 px-4">
        <Box className="flex justify-center">
          <Box className="flex justify-between items-center max-w-[1215px] w-full font-semibold text-midnightBlue">
            <Box className="flex gap-[32px] items-center">
              <SVG
                onClick={() => navigate("/")}
                className="hover:cursor-pointer"
                src={logoIcon}
                height={44}
              />
            </Box>
            <Box className=" hidden md:flex gap-[32px] items-center">
              <Box className="flex items-center gap-6">
                {siteConfig.navItems.map((item) => (
                  <a
                    key={item.label}
                    className="hover:cursor-pointer"
                    href={item.href}
                    onClick={(e) => onPress(e)}
                  >
                    <Box data-to-scroll-id={item.id}>
                      {intl.formatMessage({ id: item.label })}
                    </Box>
                  </a>
                ))}
                <Box
                  className="flex cursor-pointer"
                  onClick={() => navigate(routerLinks("Portfolio"))}
                >
                  {intl.formatMessage({ id: "navBar.portfolio" })}
                  {/* <SVG src={starIcon} /> */}
                </Box>
              </Box>
            </Box>
            <Box className="flex gap-2">
              <Box
                onClick={() =>
                  dispatch(
                    setOpenModalDynamically({
                      isOpen: true,
                      component: <ModalSearch />,
                    })
                  )
                }
                className="hidden md:flex !bg-white bg-opacity-50 cursor-pointer shadow-sm w-11 h-11  !rounded-full hover:shadow-md  justify-center items-center "
              >
                {/* <Box className=" rounded-full"> */}
                <SVG
                  src={searchIcon}
                  width={24}
                  height={24}
                  className="text-deepGreen-100"
                />
                {/* </Box> */}
              </Box>
              <Box className="flex md:!bg-white md:bg-opacity-50 cursor-pointer md:shadow-sm md:w-11 md:h-11  !rounded-full hover:shadow-md justify-center items-center ">
                {/* <Box className=" rounded-full"> */}
                <SVG
                  src={iconCoin}
                  width={32}
                  height={32}
                  className="text-deepGreen-100"
                />
                {/* </Box> */}
              </Box>
              <Box className="md:hidden block">
                <SVG
                  src={menu}
                  width={32}
                  height={32}
                  onClick={() => setOpenMenu(true)}
                />
                {openMenu && (
                  <Box className="max-[375px]:w-full w-[375px] bg-white h-[100vh] fixed right-0 z-50 top-0 px-4">
                    <Box className="flex justify-between py-6">
                      <SVG
                        onClick={() => navigate("/")}
                        className="hover:cursor-pointer"
                        src={logoIcon}
                        height={44}
                      />
                      <SVG
                        className="hover:cursor-pointer"
                        src={close}
                        height={24}
                        onClick={() => setOpenMenu(false)}
                      />
                    </Box>

                    <Box className="grid border-t border-gray-100 border-opacity-50">
                      {siteConfig.navItems.map((item) => (
                        <a
                          key={item.label}
                          className="hover:cursor-pointer py-5 "
                          href={item.href}
                          onClick={(e) => onPress(e)}
                        >
                          <Box data-to-scroll-id={item.id}>
                            {intl.formatMessage({ id: item.label })}
                          </Box>
                        </a>
                      ))}
                      <Box
                        className=" cursor-pointer flex py-5"
                        onClick={() => navigate(routerLinks("Portfolio"))}
                      >
                        {intl.formatMessage({ id: "navBar.portfolio" })}
                        {/* <SVG src={starIcon} /> */}
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>

              <Box className="hidden md:block">
                <ButtonConnectWalletV2 />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
