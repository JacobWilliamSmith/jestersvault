import { useDispatch, useSelector } from 'react-redux';
import { useState, useContext } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';

import UnorderedIcon from '@mui/icons-material/UnfoldMore';
import OrderedAscendingIcon from '@mui/icons-material/KeyboardArrowUp';
import OrderedDescendingIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/BookmarkAdd';

import '../css/CharacterListHeader.css';

import { deleteAllCharacters } from "../actions";
import { sortCharacters } from '../actions';
import { AuthContext } from '../contexts/Auth';
import { PresetContext } from '../contexts/Presets';
import PresetService from '../services/Presets';

import Message from './Message';
import MenuTextfield from './MenuTextfield';

export default function CharacterListHeader() {
  const dispatch = useDispatch();
  const [presetMenuAnchor, setPresetMenuAnchor] = useState(null);
  const [isOverwritingPreset, setIsOverwritingPreset] = useState(null);
  const [message, setMessage] = useState(null);
  const [isSlideMenuOpen, setIsSlideMenuOpen] = useState(false);
  const tableLayout = useSelector(state => state.tableLayout);
  const game = useSelector(state => state.characters.characterList);
  const characterOrder = useSelector(state => state.characters.characterOrder);
  const {isAuthenticated} = useContext(AuthContext);
  const {gamePresets, setGamePresets} = useContext(PresetContext);

  const presetMenuSubmit = (presetName) => {
    if(presetName === undefined || presetName === null || presetName === "") {
      presetName = "Unnamed Game";
    }
    PresetService.addGamePreset(presetName, game)
      .then(data => {
        if(!data.message.msgError) {
          presetMenuClose();
          setMessage({msgBody: "Saved " + presetName, msgError: false});
          setGamePresets(data.gamePresets);
        } else {
          setMessage({msgBody: "An error occurred", msgError: true});
        }
      })
      .catch(data => {
        setMessage({msgBody: "An error occurred", msgError: true});
      });
  }

  const presetMenuOpen = (event) => {
    onPresetMenuChange("");
    setPresetMenuAnchor(event.currentTarget);
  };

  const presetMenuClose = () => {
    setPresetMenuAnchor(null);
    setIsOverwritingPreset(null);
  }

  const onPresetMenuChange = (presetName) => {
    if(presetName === undefined || presetName === null || presetName === "") { presetName = "Unnamed Game"; }
    let isOverwriting = false;
    gamePresets.forEach(p => { if (presetName === p.name) { return isOverwriting = true; }});
    setIsOverwritingPreset(isOverwriting);
  }

  function handleOrder(stat) {
    if(characterOrder?.orderBy !== stat || characterOrder?.isAscending === null) {
      dispatch(sortCharacters(stat, false));
    } else {
      dispatch(sortCharacters(stat, !characterOrder?.isAscending));
    }
  }

  function handleDeleteAllCharacters() {
    dispatch(deleteAllCharacters());
  }

  function CustomSlideMenu() {
    return (
      <Stack direction="row" alignItems="flex-end" spacing={1} sx={{pr:0.7, pl:0.4}}>
        <IconButton size="small" onClick={() => { setIsSlideMenuOpen((prev) => !prev);}}>
          <MoreIcon fontSize="small"/>
        </IconButton>

        <Slide direction="left" in={isSlideMenuOpen} mountOnEnter unmountOnExit>
          <Stack direction="row" alignItems="flex-end" spacing={1}>
            
            { isAuthenticated &&
              <IconButton onClick={presetMenuOpen} size="small">
                <SaveIcon fontSize="small"/>
              </IconButton>
            }

            <IconButton color='error' size="small" onClick={handleDeleteAllCharacters}>
              <DeleteIcon fontSize="small"/>
            </IconButton>

          </Stack>
        </Slide>
      </Stack>
    )
  }

  function CustomHeader(key, index) {
    const isLeftmost = index === 0;
    const isRightmost = index === tableLayout.length - 1;
    
    return (
      <Grid key={key} item xs={tableLayout[index].width}>
        <Stack direction="row" alignItems="flex-end" spacing={1} sx={{pl: isLeftmost ? 6 : 0}}>
          <h3 className="headerTitle">
            {tableLayout[index].name}
          </h3>
          <IconButton size="small" onClick={ () => { handleOrder(tableLayout[index].stat) }} >
            { 
              characterOrder?.orderBy !== tableLayout[index].stat ? <UnorderedIcon fontSize="small"/> :
              characterOrder?.isAscending ? <OrderedAscendingIcon fontSize="small"/> : <OrderedDescendingIcon fontSize="small"/>
            }
          </IconButton>

          {isRightmost && CustomSlideMenu()}
        </Stack>
      </Grid>
    )
  }
  
  return (
    <Box>
      <Box className="ignoreShadow">
        <Stack direction="row" alignItems="bottom" spacing={1} sx={{ ml:1, mr:1 }}>
          <Grid container spacing={1}>
            { tableLayout.map( (column) => CustomHeader(column.stat, tableLayout.findIndex((i) => (i.stat === column.stat))))}
          </Grid>
        </Stack>
        <Divider sx={{ mt: 0.5 }}/>
      </Box>
      <MenuTextfield
        anchor={presetMenuAnchor}
        onClose={presetMenuClose}
        onSubmit={presetMenuSubmit}
        onChange={onPresetMenuChange}
        placeholder="Preset Name"
        closeText="Cancel"
        submitColor={isOverwritingPreset ? "info" : "success"}
        submitText={ isOverwritingPreset ? "Overwrite" : "Save" }
      />
      {message ? <Message msgBody={message.msgBody} msgError={message.msgError} onClose={() => setMessage(null)} /> : null}
    </Box>
  )
}
