import CharacterList from './CharacterList';
import TopAppBar from './TopAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BottomAppBar from './BottomAppBar';

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
      <TopAppBar />
      <CharacterList />
      <BottomAppBar/>
    </ThemeProvider>
  );
}

export default App;
