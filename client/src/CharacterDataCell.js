import * as React from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';

import InitIcon from '@mui/icons-material/Bolt';
import ACIcon from '@mui/icons-material/Shield';
import HPIcon from '@mui/icons-material/Favorite';
import StatusIcon from '@mui/icons-material/Flare';
import MoveIcon from '@mui/icons-material/UnfoldMore';
import MoreIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteCharacter, updateCharacter } from './actions';
import { useSelector, useDispatch } from 'react-redux';

//TODO: Encapsulate this class within Character.js without causing the textbox to rerender when the updateCharacter action is performed
export default function CharacterDataCell(props) {
  const dispatch = useDispatch();
  const character = useSelector(state => state.characters[state.characters.findIndex(c => c.id === props.id)]);
  const tableLayout = useSelector(state => state.tableLayout)
  const columnLayout = tableLayout[props.columnIndex];
  const isRightmost = props.columnIndex === tableLayout.length - 1;
  const [buttonsExpanded, setButtonsExpanded] = React.useState(false);
  
  return (
    <Grid item xs={columnLayout.width}>
      <Stack direction="row" alignItems="bottom" spacing={1}>

        <TextField
          variant="standard"
          margin="dense"
          autoComplete="off"
          fullWidth
          placeholder={columnLayout.name}
          defaultValue={character[columnLayout.stat]}
          onChange = {
            event => {
              const args = {};
              args[columnLayout.stat] = event.target.value;
              dispatch(updateCharacter(character.id, args))
            }
          }
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
          <IconButton onClick={ () => { setButtonsExpanded((prev) => !prev); }} >
            <MoreIcon />
          </IconButton>
        }

        { isRightmost &&
          <Slide direction="left" in={buttonsExpanded} mountOnEnter unmountOnExit>
            <Stack direction="row" alignItems="bottom" spacing={1}>

              <IconButton>
                <MoveIcon />
              </IconButton>

              <IconButton color='primary' onClick={ () => { dispatch(deleteCharacter(character.id)); } }>
                <DeleteIcon />
              </IconButton>

            </Stack>
          </Slide>
        }
      </Stack>
    </Grid>
  );
}
