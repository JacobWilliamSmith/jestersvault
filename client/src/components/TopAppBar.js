import {useState, useContext} from 'react';

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Button from '@mui/material/Button';

import { AuthContext } from '../contexts/Auth';
import AuthService from '../services/Auth';
import AuthDialog from './AuthDialog';

export default function AppBarMenu() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(AuthContext);

  const loginButton = () => {
    return (
      <Button color="inherit" onClick={handleToggleAuth} size="large" >
        Log In
      </Button>
    )
  }

  const logoutButton = () => {
    return (
      <Button color="inherit" onClick={logout} size="large" >
        Log Out
      </Button>
    )
  }

  const logout = () => {
    AuthService.logout().then(data=>{
      if(data.success){
        setUser(data.user);
        setIsAuthenticated(false);
      }
    })
  }

  const handleToggleAuth = () => {
    setIsAuthOpen(!isAuthOpen);
  };
  
  return (
    <Box sx={{ display: "flex", mb:9 }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Jester's Vault
          </Typography>
          { isAuthenticated ? logoutButton() : loginButton() }
          <AuthDialog isOpen={isAuthOpen} onClose={handleToggleAuth} />
        </Toolbar>
      </AppBar>
    </Box>
  )
}