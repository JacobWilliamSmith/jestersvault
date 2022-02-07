import CharacterList from './CharacterList';
import './App.css';

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

function App() {
  return (
    <div className="App">
      <AppBar position="sticky" color="primary" sx={{ top: 0, bottom: 'auto' }}>
        <Toolbar>
        </Toolbar>
      </AppBar>
      
      <CharacterList />

      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
        </Toolbar>
      </AppBar>

    </div>
  );
}

export default App;
