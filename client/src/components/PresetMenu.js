import { useState, useContext, useEffect } from 'react';
import { useDispatch } from "react-redux";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import DeleteIcon from '@mui/icons-material/Delete';

import { addPresetCharacter, addPresetGame } from '../actions';
import { PresetContext } from '../contexts/Presets';
import PresetService from '../services/Presets';

import Message from './Message';

const ITEM_HEIGHT = 64;

export default function PresetMenu(props) {
  const dispatch = useDispatch();
  const {characterPresets, setCharacterPresets, gamePresets, setGamePresets} = useContext(PresetContext);
  const [tab, setTab] = useState(0);
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setEntries((tab === 0 ? characterPresets : gamePresets).sort((p1, p2) => p1.name > p2.name ? 1 : -1))
  }, [tab, props.isOpen, characterPresets, gamePresets]);

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  const openPreset = (preset) => {
    if(tab === 0) {
      dispatch(addPresetCharacter(preset.characterData));
    } else {
      dispatch(addPresetGame(preset.gameData));
    }
  }

  const deletePreset = (preset) => {
    if(tab === 0) {
      PresetService.deleteCharacterPreset(preset._id)
        .then(data => {
          if(!data.message.msgError) {
            setCharacterPresets(data.characterPresets);
            setMessage({msgBody: "Deleted " + preset.name, msgError: false});
          } else {
            setMessage({msgBody: "An error occurred", msgError: true});
          }
        })
        .catch(data => {
          setMessage({msgBody: "An error occurred", msgError: true});
        });
    } else {
      PresetService.deleteGamePreset(preset._id)
      .then(data => {
        if(!data.message.msgError) {
          setGamePresets(data.gamePresets);
          setMessage({msgBody: "Deleted " + preset.name, msgError: false});
        } else {
          setMessage({msgBody: "An error occurred", msgError: true});
        }
      })
      .catch(data => {
        setMessage({msgBody: "An error occurred", msgError: true});
      });
    }
  }

  return (
    <Box>
      <Menu anchorEl={props.anchor}
            open={props.isOpen}
            onClose={props.onClose}
            PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5, width: '30ch', }, }}>

        <Tabs value={tab} onChange={changeTab} textColor="inherit" sx={{mb:1}} variant="fullWidth" >
          <Tab label="Characters"/>
          <Tab label="Games"/>
        </Tabs>
        
        {entries.map((preset) => (
          <Box key={preset._id}>
            
            <Stack direction="row" sx={{pr: 1, width: '100%'}} alignItems="center" spacing={1}>
              <MenuItem onClick={() => {openPreset(preset)}} sx={{width: '100%'}}>
                <Typography noWrap>
                  {preset.name}
                </Typography>
              </MenuItem>
            
              <IconButton onClick={() => {deletePreset(preset)} } size="small" color="error">
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </Stack>
            
          </Box>
        ))}
      </Menu>
      {message ? <Message msgBody={message.msgBody} msgError={message.msgError} onClose={() => setMessage(null)} /> : null}
    </Box>
  );
}