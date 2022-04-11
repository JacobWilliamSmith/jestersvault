import {useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';
import Avatar from '@mui/material/Avatar';

import InitIcon from '@mui/icons-material/Bolt';
import ACIcon from '@mui/icons-material/Shield';
import HPIcon from '@mui/icons-material/Favorite';
import StatusIcon from '@mui/icons-material/Flare';
import MoveIcon from '@mui/icons-material/UnfoldMore';
import MoreIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteCharacter, updateCharacter } from '../actions';
import { useSelector, useDispatch } from 'react-redux';

//TODO: Encapsulate this class within Character.js without causing the textbox to rerender when the updateCharacter action is performed
export default function CharacterDataCell(props) {
  const dispatch = useDispatch();
  const character = useSelector(state => state.characters[state.characters.findIndex(c => c.id === props.id)]);
  const tableLayout = useSelector(state => state.tableLayout)
  const columnLayout = tableLayout[props.columnIndex];
  const isLeftmost = props.columnIndex === 0;
  const isRightmost = props.columnIndex === tableLayout.length - 1;
  const [buttonsExpanded, setButtonsExpanded] = useState(false);
  
  const [data, setData] = useState(character[columnLayout.stat]);

  const softUpdate = e => {
    setData(e.target.value);
  }

  const hardUpdate = () => {
    if(character[columnLayout.stat] !== data) {
      const args = {};
      args[columnLayout.stat] = data;
      dispatch(updateCharacter(character.id, args));
    }
  };

  const delayedHardUpdate = useCallback(debounce(hardUpdate, 500), [data]);
  
  useEffect(() => {
    delayedHardUpdate();
    return delayedHardUpdate.cancel;
  }, [data, delayedHardUpdate]);

  return (
    <Grid item xs={columnLayout.width}>
      <Stack direction="row" sx={{mt:0.25}} alignItems="flex-end" spacing={1}>

        { isLeftmost &&
          <Avatar variant="rounded" src={character.image} >
            {character.name.charAt(0).toUpperCase()}
          </Avatar>
        }

        <TextField
          variant="standard"
          margin="dense"
          autoComplete="off"
          fullWidth
          placeholder={columnLayout.name}
          defaultValue={data}
          onChange = {softUpdate}
          InputProps={ !columnLayout.hasStartAdornment ? {} : {
            startAdornment: (
              <InputAdornment position="start">
                {
                  {
                    'init':   <InitIcon />,
                    'ac':     <ACIcon />,
                    'hp':     <HPIcon />,
                    'status': <StatusIcon />
                  }[columnLayout.stat]
                }
              </InputAdornment>
            ),
          }}
        />
        
        { isRightmost &&
          <Stack direction="row" alignItems="flex-end" spacing={1} sx={{pb:0.25}}>
            <IconButton onClick={ () => { setButtonsExpanded((prev) => !prev); }} >
              <MoreIcon />
            </IconButton>

            <Slide direction="left" in={buttonsExpanded} mountOnEnter unmountOnExit>
              <Stack direction="row" alignItems="flex-end" spacing={1}>

                <IconButton>
                  <MoveIcon />
                </IconButton>

                <IconButton color='primary' onClick={ () => { dispatch(deleteCharacter(character.id)); } }>
                  <DeleteIcon />
                </IconButton>

              </Stack>
            </Slide>
          </Stack>
        }
      </Stack>
    </Grid>
  );
}
