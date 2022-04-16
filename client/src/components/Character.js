import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';

import InitIcon from '@mui/icons-material/Bolt';
import ACIcon from '@mui/icons-material/Shield';
import HPIcon from '@mui/icons-material/Favorite';
import StatusIcon from '@mui/icons-material/Flare';

import { deleteCharacter, updateCharacter } from '../actions';
import '../css/Character.css';
import SlideMenu from './SlideMenu';
import ImageMenu from './ImageMenu';

export default function Character(props) {
  const tableLayout = useSelector(state => state.tableLayout);
  const activeCharacterId = useSelector(state => state.turns.activeCharacterId);
  const character = useSelector(state => state.characters[state.characters.findIndex(c => c.id === props.id)]);
  const dispatch = useDispatch();

  const [data, setData] = useState(character);
  const [isCharacterExpanded, setIsCharacterExpanded] = useState(false);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const isImageMenuOpen = Boolean(menuAnchor);

  const imageMenuSubmit = (imageUrl) => {
    setData({...data, ["image"]: imageUrl});
  }

  const imageMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const imageMenuClose = () => {
    setMenuAnchor(null);
  }

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

  const handleToggleExpand = () => {
    setIsCharacterExpanded(!isCharacterExpanded);
  }

  const handleDelete = () => {
    dispatch(deleteCharacter(character.id));
  }

  function CompressedViewCell(columnIndex) {
    const columnLayout = tableLayout[columnIndex];
    const isLeftmost = columnIndex === 0;
    const isRightmost = columnIndex === tableLayout.length - 1;
    
    return (
      <Grid key={columnIndex} item xs={columnLayout.width}>
        <Stack direction="row" sx={{mt:0.25}} alignItems="flex-end" spacing={1}>
  
          { isLeftmost &&
            <div>
              <Avatar
                variant="rounded"
                src={character.image}
                id="avatar"
                aria-controls={isImageMenuOpen ? 'image-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isImageMenuOpen ? 'true' : undefined}
                onClick={imageMenuOpen}
              >
                {character.name.charAt(0).toUpperCase()}
              </Avatar>
              <ImageMenu anchorId="avatar" anchor={menuAnchor} onClose={imageMenuClose} onSubmit={imageMenuSubmit}/>
            </div>
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
            <SlideMenu sx={{pb:0.25}} size="medium" onToggleExpand={handleToggleExpand} onDelete={handleDelete} />
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
              id="cardImage"
              aria-controls={isImageMenuOpen ? 'image-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isImageMenuOpen ? 'true' : undefined}
              onClick={imageMenuOpen}
              component="img"
              sx={{height: 146, width: '100%' }}
              image={ character.image !== null && character.image !== undefined && character.image !== ""
                    ? character.image
                    : "https://media.istockphoto.com/photos/high-contrast-image-of-a-skull-in-a-smoke-cloud-picture-id998888992?k=20&m=998888992&s=170667a&w=0&h=I-LKBqtvGg_guzlvR77MYX0SIw2x2P5ilR6R4cJK9fQ="
                    }
            />
            <ImageMenu anchorId="cardImage" anchor={menuAnchor} onClose={imageMenuClose} onSubmit={imageMenuSubmit}/>
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
              <Stack direction="row" sx={{mt: 0.25, width: '100%'}} alignItems="flex-end" spacing={1}>
                { ExpandedViewTextField("status", "Status",
                  { startAdornment: ( <InputAdornment position="start"> <StatusIcon /> </InputAdornment> )})
                }
                <SlideMenu size="small" onToggleExpand={handleToggleExpand} onDelete={handleDelete} />
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
