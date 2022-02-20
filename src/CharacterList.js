import Button from '@mui/material/Button';

import Character from './Character';

import { createCharacter } from './actions';
import { useSelector, useDispatch } from 'react-redux';

export default function CharacterList() {
  const dispatch = useDispatch();
  const characters = useSelector(state => state.characters)

  return (
    <div>
      { characters.map((c) => ( <Character key={c.id} id={c.id} /> ))}
      
      <Button fullWidth sx={{m:0, p:0}} onClick={ () => { dispatch(createCharacter()); }}>
        <h3>ADD CHARACTER</h3>
      </Button>
    </div>
  )
}
