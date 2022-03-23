import React, {useState, useContext} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import { AuthContext } from '../contexts/Auth';
import AuthService from '../services/Auth';

export default function LoginForm(props) {
  const [login, setLogin] = useState({username: "", password: ""});
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = e => {
    e.preventDefault();
    setLogin({...login,[e.target.name] : e.target.value});
  }

  const onSubmit = e => {
    e.preventDefault();
    AuthService.login(login).then(data=>{
      const { isAuthenticated, user, message } = data;
      if(isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.onClose();
      } else {
        setMessage(message);
        console.log(message);
      }
    })
  }

  return (
    <Box sx={{ p: 1 }}>
      <form>
      <DialogContent>
        <TextField name="username"
                  label="Username"
                  type="text"
                  autoFocus
                  onChange={onChange}
                  margin="dense"
                  variant="standard"
                  fullWidth />
        <TextField name="password"
                  label="Password"
                  type="password"
                  onChange={onChange}
                  margin="dense"
                  variant="standard"
                  fullWidth />
        </DialogContent>

        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={onSubmit}>Log in</Button>
        </DialogActions>
      </form>
    </Box>  
  );
}