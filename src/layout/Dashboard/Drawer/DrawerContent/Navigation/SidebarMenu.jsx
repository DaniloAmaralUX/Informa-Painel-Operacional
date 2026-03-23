import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import ProductViewSwitcher from './ProductViewSwitcher';

// assets
import DownOutlined from '@ant-design/icons/DownOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';

function getItemPath(item) {
  return item?.link || item?.url;
}

function hasPathMatch(item, pathname) {
  const itemPath = getItemPath(item);

  if (!itemPath || item.external) return false;

  return !!matchPath({ path: itemPath, end: false }, pathname);
}

function isItemActive(item, pathname) {
  if (hasPathMatch(item, pathname)) return true;

  return !!item?.children?.some((child) => isItemActive(child, pathname));
}

function collectExpanded(items, pathname, expanded = {}) {
  items?.forEach((item) => {
    if (item.type === 'collapse') {
      expanded[item.id] = item.children?.some((child) => isItemActive(child, pathname)) || false;
      collectExpanded(item.children, pathname, expanded);
    }

    if (item.type === 'group') {
      collectExpanded(item.children, pathname, expanded);
    }
  });

  return expanded;
}

function getLinkProps(item) {
  if (!item.url) return {};

  if (item.external) {
    return {
      component: 'a',
      href: item.url,
      target: item.target ? '_blank' : '_self',
      rel: item.target ? 'noreferrer' : undefined
    };
  }

  return {
    component: Link,
    to: item.url,
    target: item.target ? '_blank' : '_self'
  };
}

function SidebarButton({ children, title, open }) {
  if (open) return children;

  return (
    <Tooltip title={title} placement="right">
      {children}
    </Tooltip>
  );
}

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default function SidebarMenu({ items, footerItems, brand }) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true });
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const [expandedItems, setExpandedItems] = useState(() => collectExpanded(items, pathname));
  const selectedBlue = theme.palette.primary.dark;
  const selectedBlueHover = theme.palette.primary[700];

  useEffect(() => {
    setExpandedItems((prev) => ({
      ...prev,
      ...collectExpanded(items, pathname)
    }));
  }, [items, pathname]);

  const commonItemStyles = useMemo(
    () => ({
      minHeight: 44,
      px: drawerOpen ? 1.375 : 1,
      py: 0.75,
      borderRadius: 1.5,
      color: 'text.secondary',
      gap: 1.125,
      transitionProperty: reducedMotion ? 'background-color, color, box-shadow' : 'background-color, color, box-shadow, transform',
      transitionDuration: reducedMotion ? '0ms' : '180ms',
      transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
      '@media (hover: hover) and (pointer: fine)': {
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.055),
          color: 'text.primary',
          boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.07)}`
        }
      },
      '&.Mui-focusVisible': {
        outline: `3px solid ${alpha(theme.palette.primary.main, 0.24)}`,
        outlineOffset: 2
      },
      '&:active': !reducedMotion && {
        transform: 'scale(0.97)'
      }
    }),
    [drawerOpen, reducedMotion, theme]
  );

  const handleNavigation = () => {
    if (downLG) handlerDrawerOpen(false);
  };

  const toggleCollapse = (itemId) => {
    if (!drawerOpen && !downLG) {
      setExpandedItems((prev) => ({ ...prev, [itemId]: true }));
      handlerDrawerOpen(true);
      return;
    }

    setExpandedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const renderLeafItem = (item, level = 0) => {
    const selected = hasPathMatch(item, pathname);
    const Icon = item.icon;
    const nestedLevel = Math.max(level - 1, 0);
    const isNested = level > 0;
    const itemTone = isNested ? alpha(theme.palette.text.primary, 0.72) : theme.palette.text.primary;

    return (
      <SidebarButton key={item.id} open={drawerOpen} title={item.title}>
        <ListItemButton
          selected={selected}
          disabled={item.disabled}
          onClick={handleNavigation}
          sx={{
            ...commonItemStyles,
            minHeight: isNested ? 40 : 44,
            pl: drawerOpen ? 1.375 + nestedLevel * 1.2 : 1,
            pr: drawerOpen ? (isNested ? 1 : 1.25) : 1,
            justifyContent: drawerOpen ? 'flex-start' : 'center',
            color: selected ? theme.palette.primary.contrastText : itemTone,
            ...(selected && {
              backgroundColor: selectedBlue,
              color: theme.palette.primary.contrastText,
              boxShadow: '0 0 0 1px rgba(0, 66, 114, 0.28)',
              '@media (hover: hover) and (pointer: fine)': {
                '&:hover': {
                  backgroundColor: selectedBlueHover,
                  color: theme.palette.primary.contrastText,
                  boxShadow: '0 0 0 1px rgba(0, 66, 114, 0.34)'
                }
              },
              '& .MuiTypography-root': {
                color: 'inherit'
              }
            })
          }}
          {...getLinkProps(item)}
        >
          {Icon && (
            <ListItemIcon
              sx={{
                minWidth: 0,
                width: 18,
                justifyContent: 'center',
                color: 'inherit',
                opacity: selected ? 1 : isNested ? 0.72 : 0.88,
                '& svg': {
                  fontSize: 18,
                  transform: 'translateX(-0.5px)'
                }
              }}
            >
              <Icon />
            </ListItemIcon>
          )}
          {drawerOpen && (
            <>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: selected ? 700 : isNested ? 400 : 500,
                      color: 'inherit',
                      lineHeight: 1.28,
                      fontSize: isNested ? '0.9rem' : '0.92rem',
                      letterSpacing: isNested ? '-0.01em' : 0,
                      textWrap: 'pretty'
                    }}
                  >
                    {item.title}
                  </Typography>
                }
                secondary={
                  item.caption ? (
                    <Typography variant="caption" color="text.secondary">
                      {item.caption}
                    </Typography>
                  ) : null
                }
              />
              {item.badge && (
                <Chip
                  size="small"
                  label={item.badge}
                  sx={{
                    height: 22,
                    borderRadius: 999,
                    fontWeight: 700,
                    backgroundColor: alpha(theme.palette.common.white, 0.18),
                    color: 'inherit'
                  }}
                />
              )}
            </>
          )}
        </ListItemButton>
      </SidebarButton>
    );
  };

  const renderCollapseItem = (item, level = 0) => {
    const selected = isItemActive(item, pathname);
    const isExpanded = expandedItems[item.id] || false;
    const Icon = item.icon;
    const ChevronIcon = isExpanded ? DownOutlined : RightOutlined;
    const nestedLevel = Math.max(level - 1, 0);
    const isNested = level > 0;
    const isPathOpen = isExpanded || selected;
    const pathColor = isPathOpen ? theme.palette.primary.main : isNested ? alpha(theme.palette.text.primary, 0.72) : theme.palette.text.primary;

    return (
      <Box key={item.id}>
        <SidebarButton open={drawerOpen} title={item.title}>
          <ListItemButton
            onClick={() => toggleCollapse(item.id)}
            selected={selected}
            sx={{
              ...commonItemStyles,
              minHeight: isNested ? 40 : 44,
              pl: drawerOpen ? 1.375 + nestedLevel * 1.2 : 1,
              pr: drawerOpen ? (isNested ? 1 : 1.25) : 1,
              justifyContent: drawerOpen ? 'flex-start' : 'center',
              color: pathColor,
              backgroundColor: isPathOpen ? alpha(theme.palette.primary.main, level === 0 ? 0.05 : 0.032) : 'transparent',
              boxShadow: isPathOpen ? `inset 0 0 0 1px ${alpha(theme.palette.primary.main, level === 0 ? 0.07 : 0.05)}` : 'none',
              '@media (hover: hover) and (pointer: fine)': {
                '&:hover': {
                  backgroundColor: isPathOpen ? alpha(theme.palette.primary.main, level === 0 ? 0.065 : 0.045) : alpha(theme.palette.primary.main, 0.055),
                  color: isPathOpen ? 'primary.main' : 'text.primary',
                  boxShadow: isPathOpen
                    ? `inset 0 0 0 1px ${alpha(theme.palette.primary.main, level === 0 ? 0.09 : 0.07)}`
                    : `0 0 0 1px ${alpha(theme.palette.primary.main, 0.07)}`
                }
              }
            }}
          >
            {Icon && (
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  width: 18,
                  justifyContent: 'center',
                  color: 'inherit',
                  '& svg': {
                    fontSize: 18,
                    transform: 'translateX(-0.5px)'
                  }
                }}
              >
                <Icon />
              </ListItemIcon>
            )}
            {drawerOpen && (
              <>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: level === 0 ? 500 : isPathOpen ? 500 : 400,
                        color: 'inherit',
                        lineHeight: 1.28,
                        fontSize: isNested ? '0.9rem' : '0.92rem',
                        letterSpacing: isNested ? '-0.01em' : 0,
                        textWrap: 'pretty'
                      }}
                    >
                      {item.title}
                    </Typography>
                  }
                />
                <Box
                  component="span"
                  sx={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 18,
                    height: 18,
                    color: isPathOpen ? theme.palette.primary.main : theme.palette.text.secondary,
                    opacity: isPathOpen ? 1 : isNested ? 0.62 : 0.8,
                    transition: reducedMotion ? 'none' : 'transform 180ms cubic-bezier(0.23, 1, 0.32, 1)',
                    '& svg': {
                      fontSize: 10.5,
                      transform: ChevronIcon === RightOutlined ? 'translateX(1px)' : 'translateY(0.5px)'
                    }
                  }}
                >
                  <ChevronIcon />
                </Box>
              </>
            )}
          </ListItemButton>
        </SidebarButton>

        <Collapse in={drawerOpen && isExpanded} timeout={reducedMotion ? 0 : 'auto'} unmountOnExit>
          <Stack
            spacing={level === 0 ? 0.55 : 0.45}
            sx={{
              ml: level === 0 ? 1.25 : 2.1,
              pl: level === 0 ? 0.55 : 0.7,
              borderLeft: `1px solid ${alpha(isPathOpen ? theme.palette.primary.main : theme.palette.divider, level === 0 ? 0.14 : 0.3)}`,
              transition: reducedMotion ? 'none' : 'opacity 180ms cubic-bezier(0.23, 1, 0.32, 1), transform 180ms cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          >
            {item.children?.map((child) => renderMenuNode(child, level + 1))}
          </Stack>
        </Collapse>
      </Box>
    );
  };

  const renderMenuNode = (item, level = 0) => {
    if (item.type === 'collapse') return renderCollapseItem(item, level);
    return renderLeafItem(item, level);
  };

  const renderGroup = (group, isFooter = false) => (
    <List
      key={group.id}
      disablePadding
      subheader={
        drawerOpen && group.title ? (
          <ListSubheader
            disableSticky
            sx={{
              px: 0,
              py: 0.25,
              bgcolor: 'transparent',
              color: 'text.secondary',
              fontSize: 11,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            {group.title}
          </ListSubheader>
        ) : undefined
      }
      sx={{
        px: 0.875,
        py: 0.375,
        ...(isFooter && { pt: 1.5 })
      }}
    >
      {group.children?.map((item) => renderMenuNode(item))}
    </List>
  );

  return (
    <Stack
      sx={{
        minHeight: '100%',
        px: 0.625,
        pb: 1.5,
        color: 'text.primary',
        WebkitFontSmoothing: 'antialiased'
      }}
    >
      {drawerOpen && (
        <Box
          sx={{
            px: 1.125,
            pt: 0.875,
            pb: 0.875
          }}
        >
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 700,
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              {brand?.title || 'MODULOS'}
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Stack>
        </Box>
      )}

      <ProductViewSwitcher sidebarOpen={drawerOpen} />

      <Stack spacing={1}>
        {items?.map((group) => renderGroup(group))}
      </Stack>

      <Box sx={{ mt: 'auto', pt: 2 }}>
        <Divider sx={{ mx: 1, mb: 1.25 }} />
        {footerItems?.length ? (
          <Stack spacing={1}>
            {footerItems?.map((group) => renderGroup(group, true))}
          </Stack>
        ) : !drawerOpen ? (
          <Box
            sx={{
              mx: 'auto',
              width: 44,
              height: 44,
              display: 'grid',
              placeItems: 'center',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0 0 0 1px rgba(255, 255, 255, 0.08)'
                  : '0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
              color: 'text.primary',
              fontSize: 13,
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: '0.04em',
              userSelect: 'none'
            }}
            aria-hidden="true"
          >
            BR
          </Box>
        ) : (
          <ButtonBase
            sx={{
              mx: 1,
              px: 1.25,
              py: 1.125,
              width: 'calc(100% - 16px)',
              justifyContent: 'stretch',
              textAlign: 'left',
              borderRadius: 1.5,
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0 0 0 1px rgba(255, 255, 255, 0.08)'
                  : '0 0 0 1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06), 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
              transition: reducedMotion
                ? 'none'
                : theme.transitions.create('box-shadow', {
                    duration: theme.transitions.duration.shorter
                  }),
              '@media (hover: hover) and (pointer: fine)': {
                '&:hover': {
                  boxShadow:
                    theme.palette.mode === 'dark'
                      ? '0 0 0 1px rgba(255, 255, 255, 0.13)'
                      : '0 0 0 1px rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
                }
              },
              '&.Mui-focusVisible': {
                outline: `3px solid ${alpha(theme.palette.primary.main, 0.24)}`,
                outlineOffset: 2
              }
            }}
            aria-label={`Selecionar idioma atual: ${brand?.localeLabel || 'PT'}`}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  component="span"
                  sx={{
                    fontSize: 13,
                    lineHeight: 1,
                    fontWeight: 700,
                    letterSpacing: '0.04em'
                  }}
                >
                  BR
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                  {brand?.localeLabel || 'PT'}
                </Typography>
              </Stack>
              <Box
                component="span"
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 18,
                  height: 18,
                  color: 'text.secondary',
                  '& svg': {
                    fontSize: 10.5,
                    transform: 'translateY(0.5px)'
                  }
                }}
              >
                <DownOutlined />
              </Box>
            </Stack>
          </ButtonBase>
        )}
      </Box>
    </Stack>
  );
}

SidebarMenu.propTypes = {
  brand: PropTypes.shape({
    caption: PropTypes.string,
    localeLabel: PropTypes.string,
    title: PropTypes.string
  }),
  footerItems: PropTypes.array,
  items: PropTypes.array
};
