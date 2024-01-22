import { useState } from "react";
import { motion, isValidMotionProp } from "framer-motion";
import { Box, chakra, shouldForwardProp } from "@chakra-ui/react";
import { CartOfferData } from "@/services";
import CartOffer from "@/pages/HomepageV2/component/CartOffer";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});
type prop = {
  data: CartOfferData;
};
export const CardFlip = ({ data }: prop) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };
  return (
    <Box className="card-flip-container h-[268px] w-[386px]">
      <ChakraBox
        className="card-flip-inner relative max-w-[386px] h-[268px] w-[386px]"
        // onClick={handleFlip}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 360 }}
        transition={{ duration: "0.4", animationDirection: "normal" }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <CartOffer data={data} isFront={true} handleFlip={handleFlip} />
        <CartOffer data={data} isFront={false} handleFlip={handleFlip} />
      </ChakraBox>
    </Box>
  );
};
