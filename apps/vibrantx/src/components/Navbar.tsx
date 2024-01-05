import starIcon from '@/assets/star.svg';
import logoIcon from '@/assets/vibrantx.svg';
import { siteConfig } from '@/config/site';
import { useAppDispatch } from '@/hooks/store';
import { setOpenModalDynamically } from '@/redux/slice/modalSlice';
import { Box, Button } from '@chakra-ui/react';
import SVG from 'react-inlinesvg';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { ButtonConnectWallet } from './button';
import { ModalSearch } from './modal';

export const Navbar = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const onPress = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const target = window.document.getElementById(
      e.currentTarget.href.split('#')[1]
    );
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box className='hidden md:block py-[32px]'>
      <Box className='flex justify-center'>
        <Box className='flex justify-between items-center max-w-[1440px] w-full font-semibold text-midnightBlue'>
          <Box className='flex gap-[32px] items-center'>
            <SVG
              onClick={() => navigate('/')}
              className='hover:cursor-pointer rounded-full'
              src={logoIcon}
              width={150}
              height={53}
            />
            {siteConfig.navItems.map((item) => (
              <a
                key={item.label}
                className='hover:cursor-pointer'
                href={item.href}
                onClick={(e) => onPress(e)}
              >
                <Box data-to-scroll-id={item.id}>
                  {intl.formatMessage({ id: item.label })}
                </Box>
              </a>
            ))}
          </Box>
          <Box className='flex gap-[32px] items-center'>
            <Box className='flex items-center'>
              <SVG src={starIcon} />
              {intl.formatMessage({ id: 'navBar.portfolio' })}
            </Box>
            <Button
              onClick={() =>
                dispatch(
                  setOpenModalDynamically({
                    isOpen: true,
                    component: <ModalSearch />,
                  })
                )
              }
              className='!bg-lightBlueGrey shadow-sm !py-[20px] !rounded-[8px] hover:shadow-md'
            >
              <Box className='flex gap-[108px] pl-[10px] items-center'>
                <Box className='text-steelBlue'>Search</Box>
                <Box className='px-3 py-1 bg-lightBlue rounded-[8px]'>/</Box>
              </Box>
            </Button>
            <ButtonConnectWallet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
