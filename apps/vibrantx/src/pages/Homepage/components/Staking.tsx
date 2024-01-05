import iconToken from "@/common/icons";
import { AppButton, BoxHomePage, TableHome } from "@/pages/Homepage";
import { columnsStaking, mockDataTableStaking } from "@/utils/constants";
import {
  Box,
  Flex,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import clsx from "clsx";
import SVG from "react-inlinesvg";
import { useIntl } from "react-intl";

export const Staking = () => {
  const intl = useIntl();
  // const dispatch = useAppDispatch();

  return (
    <BoxHomePage id='staking' className='text-[14px]'>
      <Flex justifyContent={"space-between"}>
        <Box className='text-[24px] font-bold text-midnightNavy capitalize'>
          {intl.formatMessage({ id: "homepage.staking.title" })}
        </Box>
      </Flex>
      <Text className='font-normal text-gray-100'>
        {intl.formatMessage({ id: "homepage.staking.sub-title" })}
      </Text>
      <TableContainer className='mt-[38px]'>
        <TableHome variant='simple'>
          <Thead>
            <Tr>
              {columnsStaking.map((column) => (
                <Th
                  className={clsx({ "!text-end": column.key === "apy_7d" })}
                  key={column.key}
                >
                  {column.label}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {mockDataTableStaking.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {columnsStaking.map((column, colIndex) =>
                  column.key === "asset" || column.key === "protocols" ? (
                    <Td key={colIndex}>
                      <Box className='flex gap-3 items-center'>
                        <SVG src={iconToken[row[column?.key].toLowerCase()]} />
                        {row[column?.key]}
                      </Box>
                    </Td>
                  ) : (
                    <Td
                      className={clsx({
                        "!text-tealGreenColor": column.key === "apy_7d",
                        "!text-end": column.key === "apy_7d",
                      })}
                      key={colIndex}
                    >
                      {row[column.key]}
                    </Td>
                  )
                )}
                <Td className='!text-center !px-0'>
                  <AppButton
                    onClick={
                      () => {}
                      // dispatch(
                      //   setOpenModalSupply({
                      //     isOpen: true,
                      //     assets: row.asset,
                      //   })
                      // )
                    }
                    className='text-[14px] capitalize'
                  >
                    Stake
                  </AppButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableHome>
      </TableContainer>
    </BoxHomePage>
  );
};
