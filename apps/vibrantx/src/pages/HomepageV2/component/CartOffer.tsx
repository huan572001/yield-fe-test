import { chevronLeft } from "@/assets/home";
import { CartOfferData } from "@/services";
import { Box } from "@chakra-ui/react";
import clsx from "clsx";
import SVG from "react-inlinesvg";
import { motion } from "framer-motion";

type prop = {
  data: CartOfferData;
  isFront: boolean;
  handleFlip: () => void;
};
const CartOffer = ({ data, isFront, handleFlip }: prop) => {
  return (
    <Box
      className={clsx("border-gradient h-[268px]", {
        " flip-card-front": isFront,
        "flip-card-back": !isFront,
      })}
    >
      <Box
        className="
         w-96 boxed-gradient-child max-[386px]:w-auto p-6 bg-white bg-opacity-40 rounded-3xl border flex-col items-start gap-2  inline-flex justify-between"
      >
        <Box>
          <Box className=" flex justify-between w-full items-center">
            <Box className="grow shrink basis-0 text-neutral-700 text-3xl font-bold">
              {data?.title}
            </Box>
            <SVG src={data?.icon} />
          </Box>
          <div className="overflow-hidden">
            <Box className=" text-primary-400 text-base font-medium">
              {isFront ? data.body : data?.bodyHover}
            </Box>
          </div>
        </Box>
        <motion.div whileHover={{ scale: 0.98 }} onClick={() => handleFlip()}>
          {isFront ? (
            <Box
              as="button"
              className=" w-24 h-11 !border !border-indigo-500 rounded-full shadow text-indigo-500 text-base font-semibold  cursor-pointer"
            >
              Discover
            </Box>
          ) : (
            <Box
              as="button"
              className="!border !border-indigo-500 rounded-full w-9 h-9 flex justify-center items-center"
            >
              <SVG src={chevronLeft} width={20} height={20} />
            </Box>
          )}
        </motion.div>
      </Box>
    </Box>
  );
};
export default CartOffer;
