import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Avatar from '@mui/material/Avatar';

import InitIcon from '@mui/icons-material/Bolt';
import ACIcon from '@mui/icons-material/Shield';
import HPIcon from '@mui/icons-material/Favorite';
import StatusIcon from '@mui/icons-material/Flare';
import ViewIcon from '@mui/icons-material/Visibility';
import MoreIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

import SaveIcon from '@mui/icons-material/BookmarkAdd';
import UnsaveIcon from '@mui/icons-material/BookmarkRemove';
import ReorderIcon from '@mui/icons-material/Reorder';

import { deleteCharacter, updateCharacter } from '../actions';
import '../css/Character.css';

export default function Character(props) {
  const tableLayout = useSelector(state => state.tableLayout);
  const activeCharacterId = useSelector(state => state.turns.activeCharacterId);
  const character = useSelector(state => state.characters[state.characters.findIndex(c => c.id === props.id)]);
  const dispatch = useDispatch();
  
  const [isSlideMenuExpanded, setIsSlideMenuExpanded] = useState(false);

  const [data, setData] = useState(character);
  const [isCharacterExpanded, setIsCharacterExpanded] = useState(false);

  const softUpdate = (key, event) => {
    setData({...data, [key]: event.target.value});
  }

  const hardUpdate = () => {
    for(const [key, val] of Object.entries(data)) {
      if(character[key] !== val) {
        dispatch(updateCharacter(character.id, data));
        return;
      }
    }
  };

  const delayedHardUpdate = useCallback(debounce(hardUpdate, 500), [data]);
  
  useEffect(() => {
    delayedHardUpdate();
    return delayedHardUpdate.cancel;
  }, [data, delayedHardUpdate]);

  const toggleExpandedView = () => {
    setIsCharacterExpanded(!isCharacterExpanded);
    setIsSlideMenuExpanded()
  }

  function CompressedViewCell(columnIndex) {
    const columnLayout = tableLayout[columnIndex];
    const isLeftmost = columnIndex === 0;
    const isRightmost = columnIndex === tableLayout.length - 1;
    
    return (
      <Grid key={columnIndex} item xs={columnLayout.width}>
        <Stack direction="row" sx={{mt:0.25}} alignItems="flex-end" spacing={1}>
  
          { isLeftmost &&
            <Avatar variant="rounded" src={character.image} >
              {character.name.charAt(0).toUpperCase()}
            </Avatar>
          }
  
          <TextField
            variant="standard"
            margin="dense"
            autoComplete="off"
            fullWidth
            placeholder={columnLayout.name}
            defaultValue={data[columnLayout.stat]}
            onChange = {e => softUpdate(columnLayout.stat, e)}
            InputProps={ !columnLayout.hasStartAdornment ? {} : {
              startAdornment: (
                <InputAdornment position="start">
                  {
                    {
                      'init':   <InitIcon />,
                      'ac':     <ACIcon />,
                      'hp':     <HPIcon />,
                      'status': <StatusIcon />
                    }[columnLayout.stat]
                  }
                </InputAdornment>
              ),
            }}
          />
          
          { isRightmost &&
            <Stack direction="row" alignItems="flex-end" spacing={1} sx={{pb:0.25}}>
              <IconButton onClick={ () => { setIsSlideMenuExpanded((prev) => !prev); }} >
                <MoreIcon />
              </IconButton>
  
              <Slide direction="left" in={isSlideMenuExpanded} mountOnEnter unmountOnExit>
                <Stack direction="row" alignItems="flex-end" spacing={1}>
  
                  <IconButton onClick={toggleExpandedView}>
                    <ViewIcon />
                  </IconButton>

                  <IconButton>
                    <ReorderIcon />
                  </IconButton>

                  <IconButton>
                    <SaveIcon />
                  </IconButton>
  
                  <IconButton color='primary' onClick={ () => { dispatch(deleteCharacter(character.id)); } }>
                    <DeleteIcon />
                  </IconButton>
  
                </Stack>
              </Slide>
            </Stack>
          }
        </Stack>
      </Grid>
    );
  }

  function CompressedView() {
    return (
      <Stack className={props.id === activeCharacterId ? 'activeCharacter' : null} direction="row" alignItems="bottom" spacing={1} sx={{ pl:1, pr:1, pt:0.25, pb:0.25 }}>
        <Grid container spacing={1}>
          { tableLayout.map((column) => (CompressedViewCell(tableLayout.findIndex((i) => (i.stat === column.stat)))))}
        </Grid>
      </Stack>
    );
  }

  function ExpandedViewTextField(key, name, inputProps = {}) {
    return (
      <TextField
        variant="standard"
        margin="none"
        autoComplete="off"
        fullWidth
        placeholder = {name}
        defaultValue = {data[key]}
        onChange = {e => softUpdate(key, e)}
        InputProps = {inputProps}
      />
    )
  }

  function ExpandedView() {
    return (
      <Card sx={{ display: 'flex', mt:1, mb:1, ml:7, mr:7}}>
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <CardMedia
              component="img"
              sx={{height: 144, width: '100%' }}
              image="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f70e0f26-7e2c-434d-942e-dd8da57d1f8c/dead3ff-61ce0720-ba66-4ca5-a03d-312d043a6382.png/v1/fill/w_1024,h_724,q_80,strp/giant_flaming_skeleton_by_anime407_dead3ff-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzI0IiwicGF0aCI6IlwvZlwvZjcwZTBmMjYtN2UyYy00MzRkLTk0MmUtZGQ4ZGE1N2QxZjhjXC9kZWFkM2ZmLTYxY2UwNzIwLWJhNjYtNGNhNS1hMDNkLTMxMmQwNDNhNjM4Mi5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.IjIKSk4GeGHFPGgwvnpLl1ryV_zaDxIxHciDxYqgk2A"
            />
          </Grid>
          <Grid item xs={10} sx={{pt:1, pb:1, pl:2, pr: 2}}>
            <Grid container>
              <Grid item xs={6} sx={{pr: 1}}>
                  {ExpandedViewTextField("name", "Name", {style: { fontSize: 38 }})}
                  {ExpandedViewTextField("desc", "Description")}
              </Grid>
              
              <Grid item xs={6}>
                { ExpandedViewTextField("player", "Player") }
                { ExpandedViewTextField("hp", "Hit Points",
                  { startAdornment: ( <InputAdornment position="start"> <HPIcon /> </InputAdornment> )})
                }

                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    { ExpandedViewTextField("init", "Initiative",
                      { startAdornment: ( <InputAdornment position="start"> <InitIcon /> </InputAdornment> )})
                    }
                  </Grid>
                  <Grid item xs={6}>
                    { ExpandedViewTextField("ac", "Armor Class",
                      { startAdornment: ( <InputAdornment position="start"> <ACIcon /> </InputAdornment> )})
                    }
                  </Grid>
                </Grid>
                
              </Grid>
              <Stack direction="row" sx={{mt: 1, width: '100%'}} alignItems="flex-end" spacing={1}>
                { ExpandedViewTextField("status", "Status",
                  { startAdornment: ( <InputAdornment position="start"> <StatusIcon /> </InputAdornment> )})
                }
                <Stack direction="row" alignItems="flex-end" spacing={1}>
                  <IconButton size="small" onClick={ () => { setIsSlideMenuExpanded((prev) => !prev); }} >
                    <MoreIcon />
                  </IconButton>
      
                  <Slide direction="left" in={isSlideMenuExpanded} mountOnEnter unmountOnExit>
                    <Stack direction="row" alignItems="flex-end" spacing={1}>
      
                      <IconButton size="small" onClick={ toggleExpandedView }>
                        <ViewIcon />
                      </IconButton>

                      <IconButton size="small">
                        <ReorderIcon />
                      </IconButton>

                      <IconButton size="small">
                        <SaveIcon />
                      </IconButton>
      
                      <IconButton size="small" color='primary' onClick={ () => { dispatch(deleteCharacter(character.id)); } }>
                        <DeleteIcon />
                      </IconButton>
      
                    </Stack>
                  </Slide>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    );
  }

  return (
    <div>
      { isCharacterExpanded
        ? ExpandedView()
        : CompressedView()
      }
    </div>
  );
}
