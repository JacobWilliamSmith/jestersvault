import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function AuthDialog(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };

  return (
    <div>
      <Dialog open={props.isOpen} onClose={props.onClose}>
        <Box sx={{bgcolor: 'background.paper', width: 500 }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
            >
              <Tab label="Log In"/>
              <Tab label="Create Account"/>
            </Tabs>
          </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Username"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={props.onClose}>Log in</Button>
              </DialogActions>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Username"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                label="Confirm Password"
                type="password"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={props.onClose}>Cancel</Button>
              <Button onClick={props.onClose}>Create Account</Button>
            </DialogActions>
          </TabPanel>
        </Box>
      </Dialog>
    </div>
  );
}