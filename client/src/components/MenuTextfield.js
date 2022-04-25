import { useRef } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

import FinishIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ImageMenu(props) {
  const input = useRef(null);

  return (
    <Menu anchorEl={props.anchor} open={Boolean(props.anchor)} onClose={props.onClose} >
      <Stack direction="column" sx={{ml:1, mr:1}} alignItems="flex-end" spacing={1} >

        <TextField
          inputRef={input}
          placeholder={props.placeholder || ""}
          variant="standard"
          margin="none"
          autoComplete="off"
          fullWidth
          autoFocus
        />

        <Stack direction="row" alignItems="flex-end" spacing={1}>

          <Button
            onClick={props.onClose}
            variant="contained"
            color="error"
            endIcon={<CancelIcon />}
          >
            {props.closeText || "Close"}
          </Button>

          <Button
            color={props.submitColor || "success"}
            onClick={() => props.onSubmit(input.current.value)}
            variant="contained"
            endIcon={<FinishIcon />}
          >
            {props.submitText || "Submit"}
          </Button>

        </Stack>
      </Stack>
    </Menu>
  );
}