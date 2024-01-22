import Footer from "@/components/FooterV2";
import Loading from "@/components/Loading";
import { Navbar } from "@/components/NavbarV2";
import {
  ModalAddLiquidity,
  ModalDynamically,
  ModalRemoveLiquidity,
  ModalSearch,
  ModalStake,
  ModalSupply,
  ModalUnstake,
  ModalWalletConnect,
  ModalWithdraw,
} from "@/components/modal";
import { useAppDispatch } from "@/hooks/store";
import { setOpenModalDynamically } from "@/redux/slice/modalSlice";
import { getPrice } from "@/redux/slice/strategiesSlice";
import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export const DefaultLayoutV2 = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useQuery({
    queryKey: ["getPrices"],
    queryFn: () => dispatch(getPrice()),
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "/") {
        event.preventDefault();
        dispatch(
          setOpenModalDynamically({
            isOpen: true,
            component: <ModalSearch />,
          }),
        );
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    setLoading(false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Box position={"relative"}>
      <div className="flex flex-1 flex-col  w-full mx-auto">
        <Navbar />
        <main className=" w-full mx-auto overflow-hidden">
          <div className="mx-auto max-w-screen ">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
      <ModalWalletConnect />
      <ModalDynamically />
      <ModalSupply />
      <ModalWithdraw />
      <ModalStake />
      <ModalUnstake />
      <ModalAddLiquidity />
      <ModalRemoveLiquidity />
    </Box>
  );
};
