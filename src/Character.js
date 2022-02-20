import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
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

export default function Character(props) {
  const dispatch = useDispatch();
  const character = useSelector(state => state.characters[
      state.characters.findIndex(c => c.id === props.id)
    ]);

  const [buttonsExpanded, setButtonsExpanded] = React.useState(false);

  return (
    <Box>
      <Stack direction="row" alignItems="bottom" spacing={1} sx={{ ml:1, mr:1 }}>
        <Grid container spacing={1}>

          <Grid item xs={2.75}>
            <TextField variant = "standard" margin="dense" autoComplete="off" fullWidth
            placeholder="Name"
            defaultValue={character.name}
            onChange={event => { dispatch(updateCharacter(character.id, {name: event.target.value}))}}
            />
          </Grid>

          <Grid item xs={1.25}>
            <TextField variant = "standard" margin="dense" autoComplete="off" fullWidth
            placeholder="Init"
            defaultValue={character.init}
            onChange={event => { dispatch(updateCharacter(character.id, {init: event.target.value}))}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InitIcon />
                </InputAdornment>
              ),
            }}
            /> 
          </Grid>

          <Grid item xs={1.25}>
            <TextField variant = "standard" margin="dense" autoComplete="off" fullWidth
            placeholder="AC"
            defaultValue={character.ac}
            onChange={event => { dispatch(updateCharacter(character.id, {ac: event.target.value}))}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ACIcon />
                </InputAdornment>
              ),
            }}
            />
          </Grid>

          <Grid item xs={1.75}>
            <TextField variant = "standard" margin="dense" autoComplete="off" fullWidth
            placeholder="HP"
            defaultValue={character.hp}
            onChange={event => { dispatch(updateCharacter(character.id, {hp: event.target.value}))}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HPIcon />
                </InputAdornment>
              ),
            }}
            />
          </Grid>

          <Grid item xs={5}>
            <Stack direction="row" alignItems="bottom" spacing={1}>

              <TextField variant = "standard" margin="dense" autoComplete="off" fullWidth
              placeholder="Status"
              defaultValue={character.status}
              onChange={event => { dispatch(updateCharacter(character.id, {status: event.target.value}))}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StatusIcon />
                  </InputAdornment>
                ),
              }}
              />

              <IconButton onClick={ () => { setButtonsExpanded((prev) => !prev); }} >
                <MoreIcon />
              </IconButton>
            
              <Slide direction="left" in={buttonsExpanded} mountOnEnter unmountOnExit>
                <Stack direction="row" alignItems="bottom" spacing={1}>

                  <IconButton>
                    <MoveIcon />
                  </IconButton>

                  <IconButton color='primary' onClick={ () => { dispatch(deleteCharacter(props.id)); } }>
                    <DeleteIcon />
                  </IconButton>

                </Stack>
              </Slide>

            </Stack>
          </Grid>

        </Grid>
      </Stack>

      <Divider sx={{ mt: 0.5, mb: 0.5 }}/>
    </Box>
  );
}
