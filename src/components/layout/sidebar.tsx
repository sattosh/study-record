import {
  Box,
  CSSObject,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Theme,
  styled,
} from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePath, routes } from '../../constants/route';

export type SidebarProps = {
  open: boolean;
  drawerHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(6.5)} + 1px)`,
});

const Drawer = styled(SwipeableDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const Sidebar = ({ open, drawerHandler }: SidebarProps) => {
  const navigate = useNavigate();

  const { pathname: currentPath } = useLocation();

  return (
    <Drawer
      variant="permanent"
      open={open}
      onClose={() => drawerHandler(false)}
      onOpen={() => drawerHandler(true)}
      onMouseOver={() => drawerHandler(true)}
      onMouseOut={() => drawerHandler(false)}
      PaperProps={{
        sx: {
          elevation: 1,
        },
      }}
    >
      <Box role="presentation" sx={{ display: 'flex', height: '99%', flexDirection: 'column' }} component="div">
        <List dense disablePadding>
          <ListItem sx={{ display: 'block' }} dense disablePadding>
            <ListItemIcon
              sx={{
                minWidth: 0,
                p: 1,
                pl: 1.5,
                justifyContent: 'start',
                display: 'flex',
              }}
              onClick={() => navigate(RoutePath.TOP)}
            >
              <img src="icon.png" alt="logo" style={{ width: '1.6rem', height: '1.6rem', cursor: 'pointer' }} />
            </ListItemIcon>
          </ListItem>
        </List>
        <Divider />
        <List dense disablePadding>
          {routes
            .filter(({ hideInSidebar }) => !hideInSidebar)
            .map(({ path, icon: Icon, name }) => (
              <ListItem key={path} sx={{ display: 'block' }} dense disablePadding>
                <ListItemButton
                  onClick={() => navigate(path)}
                  disabled={path === currentPath}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    bgcolor: path === currentPath ? 'lightgrey' : 'transparent',
                  }}
                >
                  {Icon && (
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon fontSize="small" />
                    </ListItemIcon>
                  )}
                  <ListItemText disableTypography={path === currentPath} primary={name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          <Divider />
        </List>
      </Box>
    </Drawer>
  );
};
