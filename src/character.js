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


const extraButtons = (
  <Stack direction="row" alignItems="bottom" spacing={1}>
    <IconButton>
      <MoveIcon />
    </IconButton>

    <IconButton color='warning'>
      <DeleteIcon />
    </IconButton>
  </Stack>
);

export default function BasicGrid() {
  const [buttonsExpanded, setButtonsExpanded] = React.useState(false);

  return (
    <Box sx={{ ml: 1, mr: 1, mt: 1}}>
      <Stack direction="row" alignItems="bottom" spacing={1} sx={{ ml:1, mr:1 }}>
        <Grid container spacing={1}>

          <Grid item xs={2.75}>
            <TextField variant = "standard" margin="dense" autoComplete="off" fullWidth
            placeholder="Name"
            />
          </Grid>

          <Grid item xs={1.25}>
            <TextField variant = "standard" margin="dense" autoComplete="off" fullWidth
            placeholder="Init"
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
                {extraButtons}
              </Slide>

            </Stack>
          </Grid>

        </Grid>
      </Stack>

      <Divider sx={{ mt: 0.5 }}/>
    </Box>
  );
}
