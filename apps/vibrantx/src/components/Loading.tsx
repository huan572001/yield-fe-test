import logo from "@/assets/home/vibrantx.svg";
import { Flex } from "@chakra-ui/react";
import SVG from "react-inlinesvg";

export default function Loading() {
  return (
    <Flex
      position={"absolute"}
      top={0}
      left={0}
      width={"100%"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      zIndex={9999999}
      className='bg-white bg-opacity-60'
    >
      <SVG className='animate-bounce' src={logo} width={100} height={100} />
    </Flex>
  );
}
