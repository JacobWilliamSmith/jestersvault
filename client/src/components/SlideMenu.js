import { useState, useContext } from 'react';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';

import ViewIcon from '@mui/icons-material/Visibility';
import MoreIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/BookmarkAdd';
import ReorderIcon from '@mui/icons-material/Reorder';

import { AuthContext } from '../contexts/Auth';

export default function SlideMenu(props) {
  const [isOpen, setIsOpen] = useState(false);
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <Stack direction="row" alignItems="flex-end" spacing={1}>
      <IconButton size={props.size} {...props.provided.dragHandleProps} onClick={ () => { setIsOpen((prev) => !prev); }} >
        <MoreIcon fontSize={props.size}/>
      </IconButton>

      <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
        <Stack direction="row" alignItems="flex-end" spacing={1}>

          <IconButton size={props.size} onClick={ props.onToggleExpand }>
            <ViewIcon fontSize={props.size}/>
          </IconButton>
          
          { isAuthenticated &&
            <IconButton size={props.size}>
              <SaveIcon fontSize={props.size}/>
            </IconButton>
          }

          <IconButton size={props.size} color='error' onClick={ props.onDelete }>
            <DeleteIcon fontSize={props.size}/>
          </IconButton>

        </Stack>
      </Slide>
    </Stack>
  )
}