import * as React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import Character from './Character';
import CharacterListHeader from './CharacterListHeader';

import { createCharacter } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function CharacterList() {
  const dispatch = useDispatch();
  const characters = useSelector(state => state.characters);
  

  function handleCreateCharacter() {
    const createCharacterPromise = () => new Promise((resolve, reject) => {
      dispatch(createCharacter());
      resolve();
    })

    createCharacterPromise().then(() => {
      window.scroll({ top: document.body.offsetHeight, left: 0,  behavior: 'smooth' });
    })
  }

  return (
    <div>
      <CharacterListHeader />
      { characters.map((c) => (
        <Box key={c.id} >
          <Character id={c.id}/>
          <Divider/>
        </Box>
        
      ))}
      <Box sx={{mb:9, mt: 0.5, ml: 1, mr: 1}}>
        <Button fullWidth onClick={ () => {handleCreateCharacter()} }>
          <Typography>ADD CHARACTER</Typography>
        </Button>
      </Box>
    </div>
  )
}