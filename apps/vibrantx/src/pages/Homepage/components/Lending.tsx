import { DropdownGradient } from "@/components/dropdown/DropdownGradient";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getStrategies } from "@/redux/slice/strategiesSlice";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import { memo } from "react";

import { useQuery } from "@tanstack/react-query";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import { TableLanding } from "./TableLanding";

const options = [
  { key: "Earn", label: "Earn" },
  { key: "Lending", label: "Lend" },
  { key: "Staking", label: "Stake" },
  { key: "Liquidity", label: "Add Liquidity" },
];

export const Lending = memo(() => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const protocol = searchParams.get("protocol");
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const { loadingStrategies } = useAppSelector((state) => state.strategies);

  useQuery({
    queryKey: ["getStrategies"],
    queryFn: () =>
      dispatch(getStrategies({ mode: mode ?? "", protocol: protocol ?? "" })),
    refetchInterval: 900000,
    refetchOnWindowFocus: false,
  });

  return (
    <Box
      id="Lending"
      className="mt-[60px] sm:mt-[120px] text-[14px] !bg-[transparent] !px-[0]"
    >
      <Box className="!text-5xl pb-4 md:!text-6xl font-semibold text-primary-500 flex flex-wrap gap-3 w-full justify-center items-baseline text-center">
        <span>{intl.formatMessage({ id: "homepage.lending.title1" })} </span>
        <DropdownGradient options={options} onChange={() => {}} />
        <span>{intl.formatMessage({ id: "homepage.lending.title3" })} </span>
      </Box>
      <Box className="text-center text-base md:text-xl text-primary-400 font-medium mb-[60px]">
        {intl.formatMessage({ id: "homepage.lending.sub-title" })}
      </Box>
      {loadingStrategies ? (
        <Stack>
          <Skeleton height="60px" width={"100%"} />
          <Skeleton height="60px" width={"100%"} />
          <Skeleton height="60px" width={"100%"} />
          <Skeleton height="60px" width={"100%"} />
          <Skeleton height="60px" width={"100%"} />
        </Stack>
      ) : (
        <TableLanding />
      )}
    </Box>
  );
});
