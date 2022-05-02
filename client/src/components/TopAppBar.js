import {useState, useContext} from 'react';

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import PresetMenu from './PresetMenu';

import { AuthContext } from '../contexts/Auth';
import AuthService from '../services/Auth';
import AuthDialog from './AuthDialog';

export default function AppBarMenu() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(AuthContext);
  const [presetMenuAnchor, setPresetMenuAnchor] = useState(null);

  const openPresetMenu = (event) => {
    setPresetMenuAnchor(event.currentTarget);
  }

  const closePresetMenu = () => {
    setPresetMenuAnchor(null);
  }

  const logout = () => {
    AuthService.logout().then(data => {
      if(data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    })
  }

  const handleToggleAuth = () => {
    setIsAuthOpen(!isAuthOpen);
  };
  
  return (
    <Box>
      <Box sx={{ display: "flex", mb:9 }}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Jester's Vault
            </Typography>
            <Stack direction="row" alignItems="flex-end" spacing={1}>
              
              { isAuthenticated &&
                <Tooltip title="Bookmarked Characters / Games">
                  <IconButton onClick={openPresetMenu} color="inherit">
                    <BookmarkIcon />
                  </IconButton>
                </Tooltip>
              }

              { isAuthenticated
                ? <Tooltip title="Log Out">
                    <IconButton onClick={logout} color="inherit">
                      <LogoutIcon />
                    </IconButton>
                  </Tooltip>

                : <Tooltip title="Log In">
                    <IconButton onClick={handleToggleAuth} color="inherit">
                      <LoginIcon />
                    </IconButton>
                  </Tooltip>
              }

            </Stack>
          </Toolbar>
        </AppBar>
        <AuthDialog isOpen={isAuthOpen} onClose={handleToggleAuth} />
      </Box>
      <PresetMenu anchor={presetMenuAnchor} onClose={closePresetMenu} isOpen={Boolean(presetMenuAnchor)} />
    </Box>
    
  )
}