import { Strategies } from "@/services";
import { ASSET_TYPE } from "@/utils/constants";
import { ITokenInfo } from "@/utils/utils.type";
import { MoveValue } from "@aptos-labs/ts-sdk";
import { Box, Tooltip } from "@chakra-ui/react";
interface IDataPosition extends Strategies {
  amount: string | number;
  value: string;
  positions: MoveValue[];
  rewards: string;
}
export const Asset = (
  strategies: IDataPosition | Strategies,
  tokenInfo: ITokenInfo,
) => {
  return (
    <>
      {ASSET_TYPE.NATIVE !== tokenInfo?.source ? (
        <Tooltip
          hasArrow
          label={
            <Box className="text-neutralGray-500 text-xs font-medium  ">
              {`
              ${tokenInfo?.hippo_symbol} is ${tokenInfo?.official_symbol} ${tokenInfo?.extensions?.data[0][0]} from via ${tokenInfo?.extensions?.data[0][1]}`}
            </Box>
          }
          placement="right"
          bg="white"
          textColor="gray.500"
          px={3}
          py={2}
          rounded="base"
          boxShadow="lg"
          w={174}
        >
          <Box className="flex gap-2 items-center">
            <img
              src={tokenInfo?.logo_url ?? ""}
              className="w-8 h-8 rounded-full"
              alt={tokenInfo?.official_symbol}
            />
            <Box className="border-b border-dotted border-neutral-700 w-auto">
              {strategies.displayName}
            </Box>
          </Box>
        </Tooltip>
      ) : (
        <Box className="flex gap-2 items-center">
          <img
            src={tokenInfo?.logo_url ?? ""}
            className="w-8 h-8 rounded-full"
            alt={tokenInfo?.official_symbol}
          />
          {strategies.displayName}
        </Box>
      )}
    </>
  );
};
