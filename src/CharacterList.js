import * as React from 'react';

import { styled } from "@mui/material/styles";

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import Character from './Character';
import AddCharacter from './AddCharacter';

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
);

const CustomAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const CustomDrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));



const drawerWidth = 240;

export default function CharacterList() {

  const [characters, setCharacters] = React.useState([
    { id: -2, name: 'Jonny Hexblade', init: '', ac: '99', hp: '999 / 999', status: 'Literally a demigod'},
    { id: -1, name: 'Nameless Rogue', init: '', ac: '19', hp: '15 / 102', status: 'Edgy backstory, sunlight sensitivity'}
  ]);
  
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  
  const [nextKey, setNextKey] = React.useState(0);

  const openDrawer = () => { setIsDrawerOpen(true); };
  const closeDrawer = () => { setIsDrawerOpen(false); };
  
  function handleAdd() {
    const emptyCharacter = {
      id: nextKey,
      name: '',
      init: '',
      ac: '',
      hp: '',
      status: ''
    };
    setCharacters(characters => ( [...characters, emptyCharacter] ))
    setNextKey(nextKey => (nextKey + 1))
  }

  function handleUpdate(id, args) {
    const chars = [...characters]
    const index = chars.findIndex(c => c.id === id)
    
    if(args.name   !== undefined) { chars[index].name   = args.name   }
    if(args.init   !== undefined) { chars[index].init   = args.init   }
    if(args.ac     !== undefined) { chars[index].ac     = args.ac     }
    if(args.hp     !== undefined) { chars[index].hp     = args.hp     }
    if(args.status !== undefined) { chars[index].status = args.status }
  }
  
  function handleRemove(id) {
    setCharacters(characters.filter((c) => c.id !== id));
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar position="fixed" open={isDrawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawer}
            edge="start"
            sx={{ mr: 2, ...(isDrawerOpen && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Jester's Vault
          </Typography>
        </Toolbar>
      </CustomAppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
      >
        <CustomDrawerHeader>
          <IconButton onClick={closeDrawer}>
              <ChevronLeftIcon />
          </IconButton>
        </CustomDrawerHeader>
        <Divider />
      </Drawer>

      <Main open={isDrawerOpen}>
        <CustomDrawerHeader />
        { characters.map((c) => (
          <Character 
            key={c.id}
            id={c.id}
            name={c.name}
            init={c.init}
            ac={c.ac}
            hp={c.hp}
            status={c.status}
            onUpdate={handleUpdate}
            onRemove={handleRemove} />
        ))}
        <AddCharacter onAdd={handleAdd} />
      </Main>

      
    </Box>
  )
}
