import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

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
            { tab === 0 && ( <LoginForm onClose={props.onClose}/> )}
          </div>
          
          <div role="tabpanel" hidden={tab !== 1} >
            { tab === 1 && ( <RegisterForm onClose={props.onClose}/> )}
          </div>
          
        </Box>
      </Dialog>
    </div>
  );
}