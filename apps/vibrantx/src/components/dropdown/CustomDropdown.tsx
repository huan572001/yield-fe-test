import { AppButton } from '@/pages/Homepage';
import {
  Box,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

interface Option {
  key: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  onChange: (selectedKey: string) => void;
}

export const CustomDropdown = ({ options, onChange }: CustomDropdownProps) => {
  const [selectedKey, setSelectedKey] = useState(options[0]?.key || '');

  useEffect(() => {
    // Notify parent component about the change
    onChange(selectedKey);
  }, [selectedKey, onChange]);

  const handleItemClick = (key: string) => {
    setSelectedKey(key);
  };

  return (
    <Menu placement='bottom-end'>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={AppButton}
            isActive={isOpen}
            variant='outline'
            className='uppercase  !text-white !text-[14px] !shadow-sm !bg-deepGreen-100 !px-2'
          >
            <Box className='flex gap-2'>
              {options.find((option) => option.key === selectedKey)?.label ||
                ''}
              <Icon
                as={FaAngleDown}
                className={clsx(
                  ' transition-transform ease-linear duration-200',
                  {
                    'rotate-180': isOpen,
                  }
                )}
              />
            </Box>
          </MenuButton>
          <MenuList className='border-tealGreenColor !rounded-[12px] px-[14px]'>
            {options.map((option) => (
              <MenuItem
                key={option.key}
                onClick={() => handleItemClick(option.key)}
                className='text-[14px] font-normal'
              >
                {option.label}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};
