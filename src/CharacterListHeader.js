import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import './CharacterListHeader.css';

import { sortCharacters } from './actions';
import { useDispatch } from 'react-redux';

import CharacterListOrderButton from './CharacterListOrderButton';

export default function CharacterListHeader() {
  const dispatch = useDispatch();
  const [orderArray, setOrderArray] = React.useState([0,0,0,0,0]);

  function handleOrder(index) {
    let newOrderArray = [0,0,0,0,0]
    newOrderArray[index] = (orderArray[index] !== -1 ? -1 : 1);
    setOrderArray(newOrderArray);

    switch(index) {
      case 0: return dispatch(sortCharacters('name',   newOrderArray[index] === 1));
      case 1: return dispatch(sortCharacters('init',   newOrderArray[index] === 1));
      case 2: return dispatch(sortCharacters('ac',     newOrderArray[index] === 1));
      case 3: return dispatch(sortCharacters('hp',     newOrderArray[index] === 1));
      case 4: return dispatch(sortCharacters('status', newOrderArray[index] === 1));
      default: return; 
    }
  }

  return (
    <Box>
      <Stack direction="row" alignItems="bottom" spacing={1} sx={{ ml:1, mr:1 }}>
        <Grid container spacing={1}>

          <Grid item xs={2.75}>
            <Stack direction="row" alignItems="bottom" spacing={1}>
              <h3 className="header">
                Character Name
              </h3>
              <CharacterListOrderButton buttonState={orderArray[0]} orderArrayIndex={0} onOrder={handleOrder}/>
            </Stack>
          </Grid>

          <Grid item xs={1.25}>
            <Stack direction="row" alignItems="bottom" spacing={1}>
              <h3 className="header">
                Initiative
              </h3>
              <CharacterListOrderButton buttonState={orderArray[1]} orderArrayIndex={1} onOrder={handleOrder}/>
            </Stack>
          </Grid>

          <Grid item xs={1.25}>
            <Stack direction="row" alignItems="bottom" spacing={1}>
              <h3 className="header">
                Armor Class
              </h3>
              <CharacterListOrderButton buttonState={orderArray[2]} orderArrayIndex={2} onOrder={handleOrder}/>
            </Stack>
          </Grid>

          <Grid item xs={1.75}>
            <Stack direction="row" alignItems="bottom" spacing={1}>
              <h3 className="header">
                Hit Points
              </h3>
              <CharacterListOrderButton buttonState={orderArray[3]} orderArrayIndex={3} onOrder={handleOrder}/>
            </Stack>
          </Grid>

          <Grid item xs={5}>
            <Stack direction="row" alignItems="bottom" spacing={1} sx={{pr:6}}>
              <h3 className="header">
                Status Effects
              </h3>
              <CharacterListOrderButton buttonState={orderArray[4]} orderArrayIndex={4} onOrder={handleOrder}/>
            </Stack>
          </Grid>

        </Grid>
      </Stack>

      <Divider sx={{ mt: 0.5, mb: 0.5 }}/>
    </Box>
  );
}
