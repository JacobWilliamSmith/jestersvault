import IconButton from '@mui/material/IconButton';

import UnorderedIcon from '@mui/icons-material/UnfoldMore';
import OrderedAscendingIcon from '@mui/icons-material/KeyboardArrowUp';
import OrderedDescendingIcon from '@mui/icons-material/KeyboardArrowDown';

export default function CharacterListHeader(props) {
  return (
    <IconButton size="small" onClick={ () => { props.onOrder(props.orderArrayIndex) }} >
      { props.buttonState ===  1 ? <OrderedAscendingIcon  fontSize="small"/>
      : props.buttonState === -1 ? <OrderedDescendingIcon fontSize="small"/>
      :                            <UnorderedIcon         fontSize="small"/>
      }
    </IconButton>
  );
}
