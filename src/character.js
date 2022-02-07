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

export default function Character(props) {
  const [buttonsExpanded, setButtonsExpanded] = React.useState(false);

  return (
    <Box sx={{ ml: 1, mr: 1}}>
      <Stack direction="row" alignItems="bottom" spacing={1} sx={{ ml:1, mr:1 }}>
        <Grid container spacing={1}>

          <Grid item xs={2.75}>
            <TextField variant = "standard" margin="dense" autoComplete="off" fullWidth
            placeholder="Name"
            value={props.name}
            />
          </Grid>

          <Grid item xs={1.25}>
            <TextField variant = "standard" margin="dense" autoComplete="off" fullWidth
            placeholder="Init"
            value={props.init}
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
            value={props.ac}
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
            value={props.hp}
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
              value={props.status}
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

                  <IconButton color='warning' onClick={ () => { props.onRemove(props.id); } }>
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
