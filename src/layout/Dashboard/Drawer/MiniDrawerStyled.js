// material-ui
import { alpha, styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

// project imports
import { DRAWER_WIDTH } from 'config';

const openedMixin = (theme) => ({
  width: DRAWER_WIDTH,
  borderRight: '1px solid',
  borderRightColor: alpha(theme.palette.divider, 0.75),
  backgroundColor: theme.vars.palette.background.paper,

  transition: theme.transitions.create('width', {
    easing: 'cubic-bezier(0.32, 0.72, 0, 1)',
    duration: 260
  }),

  overflowX: 'hidden',
  boxShadow: 'none'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    duration: 220
  }),

  overflowX: 'hidden',
  width: theme.spacing(7.5),
  borderRight: '1px solid',
  borderRightColor: alpha(theme.palette.divider, 0.75),
  backgroundColor: theme.vars.palette.background.paper,
  boxShadow: 'none'
});

// ==============================|| DRAWER - MINI STYLED ||============================== //

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: { ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme) }
    },
    {
      props: ({ open }) => !open,
      style: { ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme) }
    }
  ]
}));

export default MiniDrawerStyled;
