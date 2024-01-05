import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import {
  ModalDynamically,
  ModalSearch,
  ModalSupply,
  ModalWalletConnect,
} from "@/components/modal";
import { ModalSettings } from "@/components/modal/ModalSetting";
import { useAppDispatch } from "@/hooks/store";
import { setOpenModalDynamically } from "@/redux/slice/modalSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
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
        <ModalWalletConnect />
        <ModalDynamically />
        <ModalSupply />
        <ModalSettings />
        <div className='bg-gradient'>
          <Navbar />
        </div>
        <main className='px-4 2xl:px-0 max-w-[1440px] w-full mx-auto'>
          <div className='mx-auto max-w-screen'>
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
