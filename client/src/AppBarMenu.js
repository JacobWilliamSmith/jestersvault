import { styled } from "@mui/material/styles";

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import MenuIcon from '@mui/icons-material/Menu';

import DrawerMenu from './DrawerMenu';

import { useSelector, useDispatch } from 'react-redux';
import { toggleDrawer } from './actions';

export default function AppBarMenu() {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(state => state.isDrawerOpen)
  const drawerWidth = useSelector(state => state.drawerWidth)

  const CustomAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== "open"
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar position="fixed" open={isDrawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>{dispatch(toggleDrawer())}}
            edge="start"
            sx={{ mr: 2, ...(isDrawerOpen && { display: "none" }) }}
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