import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function AuthDialog(props) {
  const [tab, setTab] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div>
      <Dialog open={props.isOpen} onClose={props.onClose}>
        <Box sx={{bgcolor: 'background.paper', width: 500 }}>

          <AppBar position="static">
            <Tabs value={tab} onChange={handleChangeTab} indicatorColor="secondary" textColor="inherit" variant="fullWidth" >
              <Tab label="Log In"/>
              <Tab label="Create Account"/>
            </Tabs>
          </AppBar>

          <div role="tabpanel" hidden={tab !== 0} >
            { tab === 0 && (
              <Box sx={{ p: 1 }}>
                <Typography component={'div'}>
                <DialogContent>
                  <TextField margin="dense" variant="standard" fullWidth label="Username" type="text" autoFocus />
                  <TextField margin="dense" variant="standard" fullWidth label="Password" type="password" />
                </DialogContent>

                <DialogActions>
                  <Button onClick={props.onClose}>Cancel</Button>
                  <Button onClick={props.onClose}>Log in</Button>
                </DialogActions>

                </Typography>
              </Box>
            )}
          </div>
          
          <div role="tabpanel" hidden={tab !== 1} >
            { tab === 1 && (
              <Box sx={{ p: 1 }}>
                <Typography component={'div'}>
                <DialogContent>
                  <TextField margin="dense" variant="standard" fullWidth label="Username" type="text" autoFocus />
                  <TextField margin="dense" variant="standard" fullWidth label="Email" type="email" />
                  <TextField margin="dense" variant="standard" fullWidth label="Password" type="password" />
                  <TextField margin="dense" variant="standard" fullWidth label="Confirm Password" type="password" />
                </DialogContent>

                <DialogActions>
                  <Button onClick={props.onClose}>Cancel</Button>
                  <Button onClick={props.onClose}>Log in</Button>
                </DialogActions>

                </Typography>
              </Box>
            )}
          </div>
        </Box>
      </Dialog>
    </div>
  );
}