import { useState } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

import FinishIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ImageMenu(props) {
  const [data, setData] = useState("");

  const onChange = e => {
    setData(e.target.value);
  }

  const onSubmit = () => {
    props.onSubmit(data);
    setData("");
  }

  const onClose = () => {
    props.onClose();
    setData("");
  }

  return (
    <Menu anchorEl={props.anchor} open={Boolean(props.anchor)} onClose={onClose} >
      <Stack direction="column" sx={{ml:1, mr:1}} alignItems="flex-end" spacing={1} >
        <TextField
          onChange={onChange}
          placeholder={props.placeholder || ""}
          variant="standard"
          margin="none"
          autoComplete="off"
          fullWidth
          autoFocus
        />
        <Stack direction = "row" alignItems="flex-end" spacing = {1}>
          <Button onClick={onClose} variant="contained" color="error" endIcon={<CancelIcon />}>
            {props.closeText || "Close"}
          </Button>
          <Button onClick={onSubmit} variant="contained" color={props.submitColor || "success"} endIcon={<FinishIcon />}>
            {props.submitText || "Submit"}
          </Button>
        </Stack>
      </Stack>
    </Menu>
  );
}