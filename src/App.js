import CharacterList from './CharacterList';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CharacterList />
    </ThemeProvider>
  );
}

export default App;
