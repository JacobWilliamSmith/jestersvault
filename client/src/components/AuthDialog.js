import { useState, useContext, useRef } from 'react';
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

export default function AuthDialog(props) {
  const [tab, setTab] = useState(0);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState({});
  const authContext = useContext(AuthContext);

  const refLoginUsername = useRef(null);
  const refLoginPassword = useRef(null);
  
  const refRegUsername = useRef(null);
  const refRegEmail = useRef(null);
  const refRegPassword = useRef(null);
  const refRegConfPass = useRef(null);
  
  const onRegChange = e => {
    if(e.target.name === "password") {
      setErrors({...errors, [e.target.name]: validateInput(e.target.name), ["confPass"]: validateInput("confPass")});
    } else {
      setErrors({...errors, [e.target.name]: validateInput(e.target.name)});
    }
  }

  const onBlur = e => {
    showErrors[e.target.name] = true;
    setErrors({...errors, [e.target.name]: validateInput(e.target.name)});
  }

  const validateInput = (fieldName) => {
    let input = "";
    switch(fieldName) {
      case "username":
        if(refRegUsername !== null && refRegUsername.current !== null) { input = refRegUsername.current.value; }
        if(input === "" || input === undefined || input === null) { return "Username is required"; }
        if(input.length < 4) { return "Username is too short (must be at least 4 characters)"; }
        if(input.length > 32) { return "Username is too long (must be at most 32 characters)"; }
        if(!/^[a-zA-Z0-9]+$/.test(input)) { return "Username can only contain letters and numbers"; }
        return null;
      
      case "email":
        if(refRegEmail !== null && refRegEmail.current !== null) { input = refRegEmail.current.value; }
        if(input === "" || input === undefined || input === null) { return "Email is required"; }
        if(!input.match( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ )) {
          return "Must be a valid email";
        }
        return null;
        
      case "password":
        if(refRegPassword !== null && refRegPassword.current !== null) { input = refRegPassword.current.value; }
        if(input === "" || input === undefined || input === null) { return "Password is required"; }
        if(input.length < 8) { return "Password is too short (must be at least 8 characters)"; }
        if(input.toUpperCase() === input) { return "Password must contain lowercase letters"; }
        if(input.toLowerCase() === input) { return "Password must contain uppercase letters"; }
        if(!/\d/.test(input)) { return "Password must contain numbers"; }
        if(!/^[a-zA-Z0-9]+$/.test(input)) { return "Password can only contain letters and numbers"; }
        return null;

      case "confPass":
        if(refRegConfPass !== null && refRegConfPass.current !== null) { input = refRegConfPass.current.value; }
        let password = "";
        if(refRegPassword !== null && refRegPassword.current !== null) { password = refRegPassword.current.value; }
        if(input === "" || input === undefined || input === null) { return "Password confirmation is required"; }
        if(password === null || password === undefined || password === "") { return "Must enter password"; }
        if(input !== password) { return "Does not match password"; }
        return null;
          
      default:
        return undefined;
    }
  }


  const onLogin = e => {
    e.preventDefault();
    AuthService.login({
      username: refLoginUsername.current.value,
      password: refLoginPassword.current.value
    }).then(data=>{
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

    if( errors["username"] !== null
     || errors["email"]    !== null
     || errors["password"] !== null
     || errors["confPass"] !== null ) {
      
      setShowErrors({
        username: true,
        email: true,
        password: true,
        confPass: true
      });

      return;
    }
    
    AuthService.register({
      username: refRegUsername.current.value,
      email: refRegEmail.current.value,
      password: refRegPassword.current.value
    }).then(data=>{
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
      if(newValue === 0) {
        resetLogin();
      }
      else {
        resetRegister();
      }
    }
    setTab(newValue);
  };

  const resetLogin = () => {
    emptyTextField(refLoginUsername);
    emptyTextField(refLoginPassword);
    setErrors({});
    setShowErrors({});
  }

  const resetRegister = () => {
    emptyTextField(refRegUsername);
    emptyTextField(refRegEmail);
    emptyTextField(refRegPassword);
    emptyTextField(refRegConfPass);
    
    setErrors({
      username: validateInput("username"),
      email: validateInput("email"),
      password: validateInput("password"),
      confPass: validateInput("confPass")
    });

    setShowErrors({
      username: false,
      email: false,
      password: false,
      confPass: false
    });
  }

  const emptyTextField = (ref) => {
    if(ref !== null && ref.current !== null) { ref.current.value = ""; }
  }

  const handleClose = () => {
    if(tab === 0) {
      resetLogin();
    } else {
      resetRegister();
    }
    props.onClose();
  }

  return (
    <div>
      <Dialog open={props.isOpen} onClose={handleClose}>
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
                  <TextField inputRef={refLoginUsername}
                             name="username"
                             type="text"
                             label="Username"
                             helperText=" "
                             margin="dense"
                             variant="filled"
                             fullWidth
                             autoFocus />

                  <TextField inputRef={refLoginPassword}
                             name="password"
                             type="password"
                             label="Password"
                             helperText=" "
                             margin="dense"
                             variant="filled"
                             fullWidth />

                </DialogContent>
        
                <DialogActions>
                  <Button variant="contained" onClick={handleClose}>Cancel</Button>
                  <Button type="submit" variant="contained" onClick={onLogin}>Log in</Button>
                </DialogActions>

              </Box>  
            )}
          </div>
          
          <div role="tabpanel" hidden={tab !== 1} >
            { tab === 1 && (
              <Box sx={{ p: 1 }}>

                <DialogContent>
                  
                  <TextField inputRef={refRegUsername}
                             name="username"
                             type="text"
                             label="Username"
                             onChange={onRegChange}
                             onBlur={onBlur}
                             margin="dense"
                             variant="filled"
                             fullWidth
                             color = { showErrors["username"]
                                       ? errors["username"] === null
                                         ? "success"
                                         : "error"
                                       : null}
                             error = { showErrors["username"] && errors["username"] !== null }
                             helperText={ ( showErrors["username"] && errors["username"] !== null )
                                          ? errors["username"] : " " }
                             autoFocus />

                  <TextField inputRef={refRegEmail}
                             name="email"
                             type="email"
                             label="Email"
                             onChange={onRegChange}
                             onBlur={onBlur}
                             margin="dense"
                             variant="filled"
                             fullWidth
                             color = { showErrors["email"]
                                       ? errors["email"] === null
                                         ? "success"
                                         : "error"
                                       : null}
                             error = { showErrors["email"] && errors["email"] !== null }
                             helperText={ ( showErrors["email"] && errors["email"] !== null )
                                          ? errors["email"] : " " } />

                  <TextField inputRef={refRegPassword}
                             name="password"
                             type="password"
                             label="Password"
                             onChange={onRegChange}
                             onBlur={onBlur}
                             margin="dense"
                             variant="filled"
                             fullWidth
                             color = { showErrors["password"]
                                       ? errors["password"] === null
                                         ? "success"
                                         : "error"
                                       : null}
                             error = { showErrors["password"] && errors["password"] !== null }
                             helperText={ (showErrors["password"] && errors["password"] !== null )
                                         ? errors["password"] : " " } />

                  <TextField inputRef={refRegConfPass}
                             name="confPass"
                             type="password"
                             label="Confirm Password"
                             onChange={onRegChange}
                             onBlur={onBlur}
                             margin="dense"
                             variant="filled"
                             fullWidth
                             color = { showErrors["confPass"]
                                       ? errors["confPass"] === null
                                         ? "success"
                                         : "error"
                                       : null}
                             error = { showErrors["confPass"] && errors["confPass"] !== null }
                             helperText={ ( showErrors["confPass"] && errors["confPass"] !== null )
                                          ? errors["confPass"] : " " } />
                </DialogContent>
          
                <DialogActions>
                  <Button variant="contained" onClick={handleClose}>Cancel</Button>
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