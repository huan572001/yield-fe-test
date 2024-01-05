import { DropdownGradient } from "@/components/dropdown/DropdownGradient";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getStrategies } from "@/redux/slice/strategiesSlice";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import { memo, useEffect } from "react";

import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import { TableLanding } from "./TableLanding";
import { TableStake } from "./TableStake";

const options = [
  { key: "lend", label: "Lend" },
  { key: "stake", label: "Stake" },
];

export const Lending = memo(() => {
  // const intl = useIntl();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const product = searchParams.get("product") || "lend";
  // const { loadingStrategies, strategies } = useAppSelector(
  //   (state) => state.strategies
  // );
  const { loadingStrategies } = useAppSelector((state) => state.strategies);

  useEffect(() => {
    dispatch(getStrategies());
  }, []);
  const intl = useIntl();

  return (
    <Box
      id='lending'
      className='mt-[60px] sm:mt-[120px] text-[14px] !bg-[transparent] !px-[0]'
    >
      <Box className='!text-5xl  md:!text-6xl font-semibold text-primary-500 flex flex-wrap gap-3 w-full justify-center items-baseline text-center'>
        <span>{intl.formatMessage({ id: "homepage.lending.title1" })} </span>
        <DropdownGradient options={options} onChange={() => {}} />
        <span>{intl.formatMessage({ id: "homepage.lending.title3" })} </span>
      </Box>
      <Box className='text-center text-base md:text-xl text-primary-400 font-medium mb-[60px]'>
        {intl.formatMessage({ id: "homepage.lending.sub-title" })}
      </Box>
      {loadingStrategies ? (
        <Stack>
          <Skeleton height='60px' width={"100%"} />
          <Skeleton height='60px' width={"100%"} />
          <Skeleton height='60px' width={"100%"} />
          <Skeleton height='60px' width={"100%"} />
          <Skeleton height='60px' width={"100%"} />
        </Stack>
      ) : product === "lend" ? (
        <TableLanding />
      ) : (
        <TableStake />
      )}
    </Box>
  );
});
