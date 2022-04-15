import CharacterList from './CharacterList';
import TopAppBar from './TopAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BottomAppBar from './BottomAppBar';
import { red } from '@mui/material/colors'

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: red[900]
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <TopAppBar />
      <CharacterList />
      <BottomAppBar/>
    </ThemeProvider>
  );
}

export default App;
