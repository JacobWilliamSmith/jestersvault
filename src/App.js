import React, { useState, useEffect } from 'react';
import CharacterList from './CharacterList';
import AppBarMenu from './AppBarMenu';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { drawerWidth, CustomDrawerHeader } from './DrawerMenu';
import GlobalState from './contexts/GlobalState'; 

import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";

const theme = createTheme({
  palette: {
    primary: {
      main: '#a6200a'
    },
    secondary: {
      main: '#6f1f1f'
    },
    background: {
      main: '#DEDEDE'
    }
  }
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
);


function App() {
  const [state, setState] = useState({});

  useEffect(() => {
    setState(state => ({...state, isDrawerOpen: false}))
  }, []);

  return (
    <GlobalState.Provider value={[state, setState]}>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <AppBarMenu />
          <Main open={state.isDrawerOpen}>
            < CustomDrawerHeader />
            < CharacterList />
          </Main>
        </Box>
      </ThemeProvider>
    </GlobalState.Provider>
  );
}

export default App;
