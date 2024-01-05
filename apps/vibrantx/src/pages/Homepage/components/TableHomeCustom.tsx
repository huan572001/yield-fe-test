import iconToken from '@/common/icons';
import {
  Box,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import clsx from 'clsx';
import SVG from 'react-inlinesvg';
import { TableHome } from '..';

type TableHomeCustomProps = {
  columns: { label: string; key: string }[];
  data: { [key: string]: any }[];
};

export const TableHomeCustom = ({ columns, data }: TableHomeCustomProps) => {
  return (
    <TableContainer>
      <TableHome className='mt-[38px]' variant='simple'>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th
                className={clsx({
                  '!text-end':
                    column.key === 'pnl' || column.key === 'interest',
                })}
                key={column.key}
              >
                {column.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((column, colIndex) =>
                column.key === 'collateral' || column.key === 'position' ? (
                  <Td key={colIndex}>
                    <Box className='flex gap-3 items-center'>
                      <SVG src={iconToken[row[column?.key].toLowerCase()]} />
                      {row[column?.key]}
                    </Box>
                  </Td>
                ) : (
                  <Td
                    className={clsx({
                      '!text-tealGreenColor':
                        column.key === 'pnl' || column.key === 'interest',
                      '!text-end':
                        column.key === 'pnl' || column.key === 'interest',
                    })}
                    key={colIndex}
                  >
                    {row[column?.key]}
                  </Td>
                )
              )}
            </Tr>
          ))}
        </Tbody>
      </TableHome>
    </TableContainer>
  );
};
