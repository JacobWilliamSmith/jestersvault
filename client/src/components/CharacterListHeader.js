import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import '../css/CharacterListHeader.css';

import Slide from '@mui/material/Slide';

import MoreIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/BookmarkAdd';

import { AuthContext } from '../contexts/Auth';

import { sortCharacters } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useContext } from 'react';

import IconButton from '@mui/material/IconButton';

import UnorderedIcon from '@mui/icons-material/UnfoldMore';
import OrderedAscendingIcon from '@mui/icons-material/KeyboardArrowUp';
import OrderedDescendingIcon from '@mui/icons-material/KeyboardArrowDown';

import { deleteAllCharacters } from "../actions";

export default function CharacterListHeader() {
  const [orderArray, setOrderArray] = useState([0,0,0,0,0]);
  const dispatch = useDispatch();
  const tableLayout = useSelector(state => state.tableLayout);

  const [isSlideMenuOpen, setIsSlideMenuOpen] = useState(false);
  const {isAuthenticated} = useContext(AuthContext);

  function handleOrder(index) {
    let newOrderArray = [0,0,0,0,0]
    newOrderArray[index] = (orderArray[index] !== -1 ? -1 : 1);
    setOrderArray(newOrderArray);
    dispatch(sortCharacters(tableLayout[index].stat, newOrderArray[index] === 1));
  }

  function handleDeleteAllCharacters() {
    dispatch(deleteAllCharacters());
  }

  function CustomSlideMenu() {
    return (
      <Stack direction="row" alignItems="flex-end" spacing={1} sx={{pr:0.7, pl:0.4}}>
        <IconButton size="small" onClick={() => { setIsSlideMenuOpen((prev) => !prev);}}>
          <MoreIcon fontSize="small"/>
        </IconButton>

        <Slide direction="left" in={isSlideMenuOpen} mountOnEnter unmountOnExit>
          <Stack direction="row" alignItems="flex-end" spacing={1}>
            
            { isAuthenticated &&
              <IconButton size="small">
                <SaveIcon fontSize="small"/>
              </IconButton>
            }

            <IconButton color='error' size="small" onClick={handleDeleteAllCharacters}>
              <DeleteIcon fontSize="small"/>
            </IconButton>

          </Stack>
        </Slide>
      </Stack>
    )
  }

  function CustomHeader(key, index) {
    const isLeftmost = index === 0;
    const isRightmost = index === tableLayout.length - 1;
    
    return (
      <Grid key={key} item xs={tableLayout[index].width}>
        <Stack direction="row" alignItems="flex-end" spacing={1} sx={{pl: isLeftmost ? 6 : 0}}>
          <h3 className="headerTitle">
            {tableLayout[index].name}
          </h3>
          <IconButton size="small" onClick={ () => { handleOrder(index) }} >
            { orderArray[index] ===  1 ? <OrderedAscendingIcon  fontSize="small"/>
            : orderArray[index] === -1 ? <OrderedDescendingIcon fontSize="small"/>
            :                            <UnorderedIcon         fontSize="small"/>
            }
          </IconButton>

          {isRightmost && CustomSlideMenu()}
        </Stack>
      </Grid>
    )
  }
  
  return (
    <Box className="ignoreShadow">
      <Stack direction="row" alignItems="bottom" spacing={1} sx={{ ml:1, mr:1 }}>
        <Grid container spacing={1}>
          { tableLayout.map( (column) => CustomHeader(column.stat, tableLayout.findIndex((i) => (i.stat === column.stat))))}
        </Grid>
      </Stack>
      <Divider sx={{ mt: 0.5 }}/>
    </Box>
  )
}
