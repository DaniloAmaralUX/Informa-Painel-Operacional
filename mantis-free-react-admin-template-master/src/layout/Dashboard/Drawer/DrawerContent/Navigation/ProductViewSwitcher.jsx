import PropTypes from 'prop-types';
import { useMemo, useRef, useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';

// assets
import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined';
import BarsOutlined from '@ant-design/icons/BarsOutlined';
import CheckSquareOutlined from '@ant-design/icons/CheckSquareOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';
import SlidersOutlined from '@ant-design/icons/SlidersOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';

const viewOptions = [
  {
    id: 'minhas-sis',
    title: "Minhas SI's",
    subtitle: 'Solicitacoes de intervencao',
    icon: BarsOutlined
  },
  {
    id: 'caracteristicas',
    title: 'Caracteristicas',
    subtitle: 'Cadastro de ativos',
    icon: SlidersOutlined
  },
  {
    id: 'teleassistencia',
    title: 'Teleassistencia',
    subtitle: 'Indicadores e apoio',
    icon: CheckSquareOutlined
  }
];

function Surface({ children, listboxId, onClick, open, reducedMotion, selectedTitle, triggerId }) {
  const theme = useTheme();

  return (
    <ButtonBase
      onClick={onClick}
      focusRipple
      sx={{
        width: '100%',
        px: 1.125,
        py: 0.875,
        borderRadius: 2,
        justifyContent: 'flex-start',
        textAlign: 'left',
        backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.96 : 1),
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 0 0 1px ${alpha(theme.palette.common.white, 0.055)}`
            : `0 0 0 1px ${alpha(theme.palette.common.black, 0.045)}, 0 1px 2px -1px ${alpha(theme.palette.common.black, 0.045)}`,
        transitionProperty: reducedMotion ? 'background-color, box-shadow' : 'box-shadow, transform, background-color',
        transitionDuration: reducedMotion ? '0ms' : '180ms',
        transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
        '@media (hover: hover) and (pointer: fine)': {
          '&:hover': {
            backgroundColor: theme.palette.background.paper,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 0 0 1px ${alpha(theme.palette.common.white, 0.08)}`
                : `0 0 0 1px ${alpha(theme.palette.primary.main, 0.08)}, 0 4px 10px -8px ${alpha(theme.palette.primary.main, 0.14)}`
          }
        },
        '&.Mui-focusVisible': {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.28)}`,
          outlineOffset: 2
        },
        '&:active': !reducedMotion && {
          transform: 'scale(0.97)'
        }
      }}
      id={triggerId}
      aria-haspopup="listbox"
      aria-controls={open ? listboxId : undefined}
      aria-expanded={open ? 'true' : 'false'}
      aria-label={`Selecionar visualizacao atual: ${selectedTitle}`}
    >
      {children}
    </ButtonBase>
  );
}

Surface.propTypes = {
  children: PropTypes.node.isRequired,
  listboxId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool,
  reducedMotion: PropTypes.bool.isRequired,
  selectedTitle: PropTypes.string.isRequired,
  triggerId: PropTypes.string.isRequired
};

export default function ProductViewSwitcher({ sidebarOpen }) {
  const theme = useTheme();
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true });
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('minhas-sis');
  const listboxId = 'sidebar-view-switcher-listbox';
  const triggerId = sidebarOpen ? 'sidebar-view-switcher-trigger' : 'sidebar-view-switcher-trigger-collapsed';

  const selectedView = useMemo(() => viewOptions.find((item) => item.id === selectedId) || viewOptions[0], [selectedId]);
  const SelectedIcon = selectedView.icon;

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (itemId) => {
    setSelectedId(itemId);
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ px: sidebarOpen ? 1 : 0, pb: 1.5 }}>
        <Box ref={anchorRef}>
          {sidebarOpen ? (
            <Surface
              listboxId={listboxId}
              onClick={handleToggle}
              open={open}
              reducedMotion={reducedMotion}
              selectedTitle={selectedView.title}
              triggerId={triggerId}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.25}>
                <Stack direction="row" spacing={1.25} alignItems="center" sx={{ minWidth: 0 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1.25,
                      display: 'grid',
                      placeItems: 'center',
                      backgroundColor: alpha(theme.palette.primary.main, 0.055),
                      color: alpha(theme.palette.primary.main, 0.86),
                      flexShrink: 0
                    }}
                  >
                    <SelectedIcon style={{ fontSize: 18 }} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.primary',
                        fontWeight: 550,
                        lineHeight: 1.2,
                        textWrap: 'balance'
                      }}
                    >
                      {selectedView.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2, opacity: 0.78, textWrap: 'pretty' }}>
                      {selectedView.subtitle}
                    </Typography>
                  </Box>
                </Stack>
                <Box
                  component="span"
                  sx={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 18,
                    height: 18,
                    color: 'text.secondary',
                    flexShrink: 0,
                    '& svg': {
                      transform: open ? 'translateY(0.5px)' : 'translateX(0.5px)',
                      transition: reducedMotion ? 'none' : 'transform 180ms cubic-bezier(0.23, 1, 0.32, 1)'
                    }
                  }}
                >
                  {open ? <UpOutlined style={{ fontSize: 11 }} /> : <DownOutlined style={{ fontSize: 11 }} />}
                </Box>
              </Stack>
            </Surface>
          ) : (
            <Tooltip title={selectedView.title} placement="right">
              <ButtonBase
                onClick={handleToggle}
                focusRipple
                id={triggerId}
                aria-haspopup="listbox"
                aria-controls={open ? listboxId : undefined}
                aria-expanded={open ? 'true' : 'false'}
                aria-label={`Selecionar visualizacao atual: ${selectedView.title}`}
                sx={{
                  mx: 1,
                  mb: 1.25,
                  display: 'grid',
                  placeItems: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.96 : 1),
                  boxShadow:
                    theme.palette.mode === 'dark'
                      ? `0 0 0 1px ${alpha(theme.palette.common.white, 0.055)}`
                      : `0 0 0 1px ${alpha(theme.palette.common.black, 0.045)}, 0 1px 2px -1px ${alpha(theme.palette.common.black, 0.045)}`,
                  transitionProperty: reducedMotion ? 'background-color, box-shadow' : 'box-shadow, transform, background-color',
                  transitionDuration: reducedMotion ? '0ms' : '180ms',
                  transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                  '@media (hover: hover) and (pointer: fine)': {
                    '&:hover': {
                      boxShadow:
                        theme.palette.mode === 'dark'
                          ? `0 0 0 1px ${alpha(theme.palette.common.white, 0.1)}`
                          : `0 0 0 1px ${alpha(theme.palette.primary.main, 0.08)}, 0 4px 10px -8px ${alpha(theme.palette.primary.main, 0.16)}`
                    }
                  },
                  '&.Mui-focusVisible': {
                    outline: `3px solid ${alpha(theme.palette.primary.main, 0.28)}`,
                    outlineOffset: 2
                  },
                  '&:active': !reducedMotion && {
                    transform: 'scale(0.97)'
                  }
                }}
              >
                <SelectedIcon style={{ fontSize: 18, color: theme.palette.primary.main }} />
              </ButtonBase>
            </Tooltip>
          )}
        </Box>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          sx={{
            zIndex: 1400,
            width: anchorRef.current?.clientWidth || 280,
            mt: 1,
            transformOrigin: 'top left'
          }}
        >
          <Box
            id={listboxId}
            role="listbox"
            aria-labelledby={triggerId}
            sx={{
              overflow: 'hidden',
              borderRadius: 2,
              transformOrigin: 'top left',
              backgroundColor: theme.palette.background.paper,
              boxShadow:
                theme.palette.mode === 'dark'
                  ? `0 0 0 1px ${alpha(theme.palette.common.white, 0.08)}`
                  : `0 0 0 1px ${alpha(theme.palette.common.black, 0.055)}, 0 12px 24px -18px ${alpha(theme.palette.common.black, 0.14)}, 0 24px 48px -36px ${alpha(theme.palette.common.black, 0.1)}`
            }}
          >
            <Box sx={{ px: 1.25, pt: 1.1, pb: 0.75 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.06em' }}>
                VISUALIZACAO
              </Typography>
            </Box>
            <List disablePadding sx={{ px: 0.75, pb: 0.75 }}>
              {viewOptions.map((item) => {
                const ItemIcon = item.icon;
                const isSelected = item.id === selectedId;

                return (
                  <ListItemButton
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    role="option"
                    aria-selected={isSelected}
                    sx={{
                      minHeight: 56,
                      px: 1.125,
                      py: 0.9,
                      borderRadius: 1.75,
                      gap: 1.125,
                      color: isSelected ? 'text.primary' : 'text.secondary',
                      backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.06) : 'transparent',
                      transitionProperty: reducedMotion ? 'background-color, box-shadow' : 'background-color, box-shadow, transform',
                      transitionDuration: reducedMotion ? '0ms' : '180ms',
                      transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                      '@media (hover: hover) and (pointer: fine)': {
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.05)
                        }
                      },
                      '&.Mui-focusVisible': {
                        outline: `3px solid ${alpha(theme.palette.primary.main, 0.24)}`,
                        outlineOffset: 2
                      },
                      '&:active': !reducedMotion && {
                        transform: 'scale(0.97)'
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        width: 34,
                        height: 34,
                        borderRadius: 99,
                        display: 'grid',
                        placeItems: 'center',
                        color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary,
                        backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.08) : alpha(theme.palette.text.secondary, 0.08),
                        '& svg': {
                          transform: 'translateX(-0.5px)'
                        }
                      }}
                    >
                      <ItemIcon style={{ fontSize: 17 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.2, textWrap: 'pretty' }}>
                          {item.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2, textWrap: 'pretty' }}>
                          {item.subtitle}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                );
              })}
            </List>
            <Divider />
            <Box sx={{ px: 1.25, py: 1 }}>
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: 99,
                    display: 'grid',
                    placeItems: 'center',
                    color: 'text.secondary',
                    backgroundColor: alpha(theme.palette.text.secondary, 0.08)
                  }}
                >
                  <AppstoreOutlined style={{ fontSize: 15 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2, textWrap: 'balance' }}>
                    Trocar visualizacao
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2, textWrap: 'pretty' }}>
                    Sem alterar o conteudo por enquanto
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}

ProductViewSwitcher.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired
};
