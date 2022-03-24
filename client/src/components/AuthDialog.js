import {useState, useContext, forwardRef } from 'react';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Message from './Message';

import { AuthContext } from '../contexts/Auth';
import AuthService from '../services/Auth';

const CustomTextField = forwardRef(function CustomTextField(props, ref) {
  return <TextField ref={ref} margin="dense" variant="standard" fullWidth {...props} />;
});

export default function AuthDialog(props) {
  const [tab, setTab] = useState(0);
  const [info, setInfo] = useState({username: "", password: ""});
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = e => {
    setInfo({...info,[e.target.name]: e.target.value});
  }

  const onLogin = e => {
    e.preventDefault();
    AuthService.login(info).then(data=>{
      const { isAuthenticated, user, message } = data;
      if(isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.onClose();
      } else {
        setMessage(message);
      }
    })
  }
  
  const onRegister = e => {
    e.preventDefault();
    AuthService.register(info).then(data=>{
      const { message } = data;
      setMessage(message);
      if(!message.msgError) {
        changeTab(e, 0);
      }
    })
  }

  const closeMessage = () => {
    setMessage(null);
  }
  
  const changeTab = (event, newValue) => {
    if(tab !== newValue) {
      if(newValue === 0) { setInfo({username: "", password: ""}); }
      else { setInfo({username: "", email: "", password: ""}); }
    }
    setTab(newValue);
  };

  return (
    <div>
      <Dialog open={props.isOpen} onClose={props.onClose}>
        <Box sx={{bgcolor: 'background.paper', width: 500 }}>

          <AppBar position="static">
            <Tabs value={tab} onChange={changeTab} indicatorColor="secondary" textColor="inherit" variant="fullWidth" >
              <Tab label="Log In"/>
              <Tab label="Create Account"/>
            </Tabs>
          </AppBar>

          <div role="tabpanel" hidden={tab !== 0} >
            { tab === 0 && (
              <Box sx={{ p: 1 }}>

                <DialogContent>
                  <CustomTextField name="username" type="text"     label="Username" onChange={onChange} autoFocus />
                  <CustomTextField name="password" type="password" label="Password" onChange={onChange} />
                </DialogContent>
        
                <DialogActions>
                  <Button variant="contained" onClick={props.onClose}>Cancel</Button>
                  <Button type="submit" variant="contained" onClick={onLogin}>Log in</Button>
                </DialogActions>

              </Box>  
            )}
          </div>
          
          <div role="tabpanel" hidden={tab !== 1} >
            { tab === 1 && (
              <Box sx={{ p: 1 }}>

                <DialogContent>
                  <CustomTextField name="username" type="text"     label="Username" onChange={onChange} autoFocus />
                  <CustomTextField name="email"    type="email"    label="Email"    onChange={onChange} />
                  <CustomTextField name="password" type="password" label="Password" onChange={onChange} />
                  <CustomTextField name="confPass" type="password" label="Confirm Password"/>
                </DialogContent>
          
                <DialogActions>
                  <Button variant="contained" onClick={props.onClose}>Cancel</Button>
                  <Button variant="contained" onClick={onRegister}>Register</Button>
                </DialogActions>

              </Box>
            )}
          </div>
        </Box>
        {message ? <Message isOpen={true} msgBody={message.msgBody} msgError={message.msgError} onClose={closeMessage} /> : null}
      </Dialog>
    </div>
  );
}