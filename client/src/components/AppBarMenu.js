import * as React from 'react';

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Button from '@mui/material/Button';

import AuthDialog from './AuthDialog';

export default function AppBarMenu() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);

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
          <Button color="inherit" onClick={handleToggleAuth} size="large" >
            Login
          </Button>
          <AuthDialog isOpen={isAuthOpen} onClose={handleToggleAuth} />
        </Toolbar>
      </AppBar>
    </Box>
  )
}