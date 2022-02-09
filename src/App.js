import React, { useState, useEffect } from 'react';
import CharacterList from './CharacterList';
import AppBarMenu from './AppBarMenu';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomDrawerHeader } from './DrawerMenu';
import GlobalState from './contexts/GlobalState'; 

import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";

function App() {
  const [state, setState] = useState({});

  const theme = createTheme({
    palette: {
      primary: {
        main: '#a6200a'
      }
    }
  });

  useEffect(() => {
    setState(state => ({...state, isDrawerOpen: false, drawerWidth: 240, nextCharacterKey: 0}))
    setState(state => ({...state, characters: [
      { id: -2, name: 'Jonny Hexblade', init: '', ac: '99', hp: '999 / 999', status: 'Literally a demigod'},
      { id: -1, name: 'Nameless Rogue', init: '', ac: '19', hp: '15 / 102', status: 'Edgy backstory, sunlight sensitivity'}
    ]}))
  }, []);

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(1),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: `-${state.drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
      })
    })
  );

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
