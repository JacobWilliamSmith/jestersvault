import CharacterList from './CharacterList';
import AppBarMenu from './AppBarMenu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomDrawerHeader } from './DrawerMenu';
import { useSelector } from 'react-redux';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { AuthContext } from '../contexts/Auth';
import React, {useContext} from 'react';

function App() {
  const isDrawerOpen = useSelector(state => state.isDrawerOpen)
  const drawerWidth = useSelector(state => state.drawerWidth)
  const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  
  console.log(user);
  console.log(isAuthenticated);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#a6200a'
      }
    }
  });

  const Main = styled("main")(
    ({ theme }) => ({
      flexGrow: 1,
      padding: theme.spacing(1),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(isDrawerOpen && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
      })
    })
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <AppBarMenu />
        <Main>
          < CustomDrawerHeader />
          < CharacterList />
        </Main>
      </Box>
    </ThemeProvider>
  );
}

export default App;
