import Footer from "@/components/FooterV2";
import { Navbar } from "@/components/NavbarV2";
import {
  ModalDynamically,
  ModalSearch,
  ModalStake,
  ModalSupply,
  ModalWalletConnect,
  ModalWithdraw,
} from "@/components/modal";
import { ModalSettings } from "@/components/modal/ModalSetting";
import { useAppDispatch } from "@/hooks/store";
import { setOpenModalDynamically } from "@/redux/slice/modalSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const DefaultLayoutV2 = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "/") {
        event.preventDefault();
        dispatch(
          setOpenModalDynamically({
            isOpen: true,
            component: <ModalSearch />,
          })
        );
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className='bg-pageBackground'>
      <div className='flex flex-1 flex-col  w-full mx-auto'>
        <Navbar />
        <main className=' w-full mx-auto overflow-hidden'>
          <div className='mx-auto max-w-screen '>
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
      <ModalWalletConnect />
      <ModalDynamically />
      <ModalSupply />
      <ModalSettings />
      <ModalWithdraw />
      <ModalStake />
    </div>
  );
};
