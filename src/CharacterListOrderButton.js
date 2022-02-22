import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import UnorderedIcon from '@mui/icons-material/UnfoldMore';
import OrderedAscendingIcon from '@mui/icons-material/KeyboardArrowUp';
import OrderedDescendingIcon from '@mui/icons-material/KeyboardArrowDown';

export default function CharacterListHeader(props) {
  return (
    <IconButton size="small" onClick={ () => {  }} >
      <UnorderedIcon fontSize="small"/>
    </IconButton>
  );
}
