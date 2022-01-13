import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';

import InitIcon from '@mui/icons-material/Bolt';
import ACIcon from '@mui/icons-material/Shield';
import HPIcon from '@mui/icons-material/Favorite';
import StatusIcon from '@mui/icons-material/Flare';
import EnlargeIcon from '@mui/icons-material/UnfoldMore';
import ReduceIcon from '@mui/icons-material/UnfoldLess';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1, m: 2}}>
      <Grid container spacing={1}>

        <Grid item xs={2.75}>
            <TextField
            placeholder="Name"
            fullWidth
            variant = "standard"
            autoComplete="off"
            />
        </Grid>

        <Grid item xs={1.25}>
            <TextField
            placeholder="Init"
            fullWidth
            variant = "standard"
            autoComplete="off"
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
            <TextField
            placeholder="AC"
            fullWidth
            variant = "standard"
            autoComplete="off"
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
            <TextField
            placeholder="HP"
            fullWidth
            variant = "standard"
            autoComplete="off"
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
            <TextField
            placeholder="Status"
            fullWidth
            variant = "standard"
            autoComplete="off"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <StatusIcon />
                </InputAdornment>
              ),
            }}
            />
        </Grid>

      </Grid>
      <Divider sx={{ mt: 1, mb: 1 }}/>
    </Box>
  );
}
