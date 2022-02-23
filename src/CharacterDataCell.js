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
  const [buttonsExpanded, setButtonsExpanded] = React.useState(false);

  return (
    <Grid item xs={props.width}>
      <Stack direction="row" alignItems="bottom" spacing={1}>

        <TextField
          variant="standard"
          margin="dense"
          autoComplete="off"
          fullWidth
          placeholder={props.name}
          defaultValue={character[props.stat]}

          onChange = {
            event => {
              dispatch (
                updateCharacter (
                  character.id,
                  props.stat === 'name'   ? { name:   event.target.value } :
                  props.stat === 'init'   ? { init:   event.target.value } :
                  props.stat === 'ac'     ? { ac:     event.target.value } :
                  props.stat === 'hp'     ? { hp:     event.target.value } :
                  props.stat === 'status' ? { status: event.target.value } :
                                            {                            }
                )
              )
            }
          }

          InputProps={ !props.hasStartAdornment ? {} : {
            startAdornment: (
              <InputAdornment position="start">
                {
                  {
                    'init':   <InitIcon />,
                    'ac':     <ACIcon />,
                    'hp':     <HPIcon />,
                    'status': <StatusIcon />
                  }[props.stat]
                }
              </InputAdornment>
            ),
          }}
          
        />
        
        { props.isRightmostColumn &&
          <IconButton onClick={ () => { setButtonsExpanded((prev) => !prev); }} >
            <MoreIcon />
          </IconButton>
        }

        { props.isRightmostColumn &&
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
