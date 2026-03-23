import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';

// project imports
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/logo';
import eqmLogo from 'assets/images/brand/logo-eqm-completa.svg';
import { APP_DEFAULT_PATH } from 'config';

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }) {
  return (
    <DrawerHeaderStyled
      open={open}
      sx={{
        minHeight: '76px',
        width: 'initial',
        px: open ? 2 : 1.5,
        py: 1.25
      }}
    >
      <ButtonBase
        disableRipple
        component={Link}
        to={APP_DEFAULT_PATH}
        sx={{
          width: '100%',
          justifyContent: open ? 'flex-start' : 'center',
          borderRadius: 2,
          textAlign: 'left'
        }}
        aria-label="Logo da EQM"
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
          {!open ? (
            <Box
              sx={(theme) => ({
                width: 40,
                height: 40,
                borderRadius: 2.5,
                display: 'grid',
                placeItems: 'center',
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                boxShadow:
                  theme.palette.mode === 'dark'
                    ? '0 0 0 1px rgba(255, 255, 255, 0.08)'
                    : '0 0 0 1px rgba(0, 0, 0, 0.04), 0 8px 16px -8px rgba(0, 0, 0, 0.24)'
              })}
            >
              <Logo isIcon sx={{ width: 24, height: 24 }} />
            </Box>
          ) : (
            <Box
              component="img"
              src={eqmLogo}
              alt="EQM"
              sx={{
                display: 'block',
                width: '100%',
                maxWidth: 168,
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          )}
        </Stack>
      </ButtonBase>
    </DrawerHeaderStyled>
  );
}

DrawerHeader.propTypes = { open: PropTypes.bool };
