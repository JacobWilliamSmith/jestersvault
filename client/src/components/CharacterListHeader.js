import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import '../css/CharacterListHeader.css';

import { sortCharacters } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from '@mui/material/IconButton';

import UnorderedIcon from '@mui/icons-material/UnfoldMore';
import OrderedAscendingIcon from '@mui/icons-material/KeyboardArrowUp';
import OrderedDescendingIcon from '@mui/icons-material/KeyboardArrowDown';

export default function CharacterListHeader() {
  const [orderArray, setOrderArray] = React.useState([0,0,0,0,0]);
  const dispatch = useDispatch();
  const tableLayout = useSelector(state => state.tableLayout);

  function handleOrder(index) {
    let newOrderArray = [0,0,0,0,0]
    newOrderArray[index] = (orderArray[index] !== -1 ? -1 : 1);
    setOrderArray(newOrderArray);
    dispatch(sortCharacters(tableLayout[index].stat, newOrderArray[index] === 1));
  }

  function CustomHeader(props) {
    const isLeftmost = props.index === 0;
    const isRightmost = props.index === tableLayout.length - 1;
    
    return (
      <Grid item xs={tableLayout[props.index].width}>
        <Stack direction="row" alignItems="bottom" spacing={1} sx={{pl: isLeftmost ? 6 : 0, pr: isRightmost ? 6 : 0 }}>
          <h3 className="headerTitle">
            {tableLayout[props.index].name}
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
    <Box className="ignoreShadow">
      <Stack direction="row" alignItems="bottom" spacing={1} sx={{ ml:1, mr:1 }}>
        <Grid container spacing={1}>
          { tableLayout.map( (column) => <CustomHeader key={column.stat} index={tableLayout.findIndex((i) => (i.stat === column.stat))}/> ) }
        </Grid>
      </Stack>
      <Divider sx={{ mt: 0.5 }}/>
    </Box>
  )
}
