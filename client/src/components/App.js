import CharacterList from './CharacterList';
import AppBarMenu from './AppBarMenu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TurnCounterMenu from './TurnCounterMenu';

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
      <TurnCounterMenu/>
    </ThemeProvider>
  );
}

export default App;
