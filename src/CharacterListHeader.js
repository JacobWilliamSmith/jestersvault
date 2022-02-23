import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import './CharacterListHeader.css';

import { sortCharacters } from './actions';
import { useDispatch } from 'react-redux';

import IconButton from '@mui/material/IconButton';

import UnorderedIcon from '@mui/icons-material/UnfoldMore';
import OrderedAscendingIcon from '@mui/icons-material/KeyboardArrowUp';
import OrderedDescendingIcon from '@mui/icons-material/KeyboardArrowDown';

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

  function CustomHeader(props) {
    return (
      <Grid item xs={props.width}>
        <Stack direction="row" alignItems="bottom" spacing={1} sx={{pr: props.isRightmostHeader ? 6 : 0 }}>
          <h3 className="header">
            {props.title}
          </h3>
          <IconButton size="small" onClick={ () => { handleOrder(props.index) }} >
            { orderArray[props.index] ===  1 ? <OrderedAscendingIcon  fontSize="small"/>
            : orderArray[props.index] === -1 ? <OrderedDescendingIcon fontSize="small"/>
            :                                  <UnorderedIcon         fontSize="small"/>
            }
          </IconButton>
        </Stack>
      </Grid>
    )
  }

  return (
    <Box>
      <Stack direction="row" alignItems="bottom" spacing={1} sx={{ ml:1, mr:1 }}>
        <Grid container spacing={1}>
          <CustomHeader index={0} width={2.75} title="Character Name" />
          <CustomHeader index={1} width={1.25} title="Initiative"     />
          <CustomHeader index={2} width={1.25} title="Armor Class"    />
          <CustomHeader index={3} width={1.75} title="Hit Points"     />
          <CustomHeader index={4} width={5}    title="Status Effects" isRightmostHeader={true} />
        </Grid>
      </Stack>
      <Divider sx={{ mt: 0.5, mb: 0.5 }}/>
    </Box>
  );
}
