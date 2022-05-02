import { useState, useContext, useEffect } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import DeleteIcon from '@mui/icons-material/Delete';

import { PresetContext } from '../contexts/Presets';
import PresetService from '../services/Presets';

const ITEM_HEIGHT = 64;

export default function PresetMenu(props) {
  const {characterPresets, setCharacterPresets, gamePresets, setGamePresets} = useContext(PresetContext);
  const [tab, setTab] = useState(0);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries((tab === 0 ? characterPresets : gamePresets).sort((p1, p2) => p1.name > p2.name ? 1 : -1))
  }, [tab, props.isOpen, characterPresets, gamePresets]);

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  const deletePreset = (id) => {
    if(tab === 0) {
      PresetService.deleteCharacterPreset(id)
        .then(data => {
          if(!data.message.msgError) {
            setCharacterPresets(data.characterPresets);
          } else {
            console.log("An error occurred");
          }
        })
        .catch(data => {
          console.log("An error occurred");
        });
    } else {
      PresetService.deleteGamePreset(id)
      .then(data => {
        if(!data.message.msgError) {
          setGamePresets(data.gamePresets);
        } else {
          console.log("An error occurred");
        }
      })
      .catch(data => {
        console.log("An error occurred");
      });
    }
  }

  return (
    <div>
      <Menu anchorEl={props.anchor}
            open={props.isOpen}
            onClose={props.onClose}
            PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5, width: '30ch', }, }}>

        <Tabs value={tab} onChange={changeTab} textColor="inherit"  variant="fullWidth" >
          <Tab label="Characters"/>
          <Tab label="Games"/>
        </Tabs>
        

        {entries.map((preset) => (
          <Box key={preset._id}>
            
            <Stack direction="row" sx={{pr: 1, width: '100%'}} alignItems="center" spacing={1}>
              <MenuItem sx={{width: '100%'}}>
                <Typography noWrap>
                  {preset.name}
                </Typography>
              </MenuItem>
            
              <IconButton onClick={() => {deletePreset(preset._id)} } size="small" color="error">
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </Stack>
            
          </Box>
          
        ))}
      </Menu>
    </div>
  );
}