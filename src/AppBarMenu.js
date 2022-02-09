import { styled } from "@mui/material/styles";
import React, { useContext } from 'react';
import GlobalState from './contexts/GlobalState'; 

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import MenuIcon from '@mui/icons-material/Menu';

import DrawerMenu from './DrawerMenu';

export default function AppBarMenu(props) {
  const [state, setState] = useContext(GlobalState);

  const openDrawer = (() => {
      setState(state => ({...state, isDrawerOpen: true}))
    });

  const CustomAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== "open"
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      width: `calc(100% - ${state.drawerWidth}px)`,
      marginLeft: `${state.drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <CustomAppBar position="fixed" open={state.isDrawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawer}
            edge="start"
            sx={{ mr: 2, ...(state.isDrawerOpen && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Jester's Vault
          </Typography>
        </Toolbar>
      </CustomAppBar>

      <DrawerMenu />
    </Box>
  )
}