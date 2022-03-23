import CharacterList from './CharacterList';
import AppBarMenu from './AppBarMenu';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#a6200a'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBarMenu />
      <CharacterList />
    </ThemeProvider>
  );
}

export default App;
