import React, { useContext } from 'react';
import GlobalState from './contexts/GlobalState';

import { styled } from "@mui/material/styles";

import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Divider from "@mui/material/Divider";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export const CustomDrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

export default function DrawerMenu(props) {
  const [state, setState] = useContext(GlobalState);

  const closeDrawer = (() => {
      setState(state => ({...state, isDrawerOpen: false}))
    });

  return (
    <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "SlateGray"
          }
        }}
        sx={{
          width: state.drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: state.drawerWidth,
            boxSizing: "border-box"
          }
        }}
        variant="persistent"
        anchor="left"
        open={state.isDrawerOpen}
      >
        <CustomDrawerHeader>
          <IconButton onClick={closeDrawer}>
              <ChevronLeftIcon />
          </IconButton>
        </CustomDrawerHeader>
        <Divider />
      </Drawer>
  )
}