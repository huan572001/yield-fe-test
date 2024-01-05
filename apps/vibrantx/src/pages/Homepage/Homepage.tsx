import { Box } from "@chakra-ui/react";
import { useRef } from "react";
import { Lending, Positions, TopTrending } from "./components";

export const Homepage = () => {
  const parentScrollContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box className="flex flex-col gap-[120px]" ref={parentScrollContainerRef}>
      <TopTrending />
      <Lending />
      <Positions />
      {/* <Staking /> */}
    </Box>
  );
};
