import CharacterList from './CharacterList';
import './App.css';

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

function App() {
  return (
    <div className="App">
      <AppBar position="sticky" color="primary">
        <Toolbar variant="dense">
        </Toolbar>
      </AppBar>
      
      <CharacterList />
    </div>
  );
}

export default App;
