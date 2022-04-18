import { useState } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

import FinishIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ImageMenu(props) {
  const [url, setUrl] = useState("");

  const onChange = e => {
    setUrl(e.target.value)
  }

  const onSubmit = () => {
    props.onSubmit(url)
    setUrl("")
  }

  return (
    <Menu
      id="image-menu"
      anchorEl={props.anchor}
      open={Boolean(props.anchor)}
      onClose={props.onClose}
      onChange = {onChange}
      MenuListProps={{
        'aria-labelledby': props.anchorId,
      }}
    >
      <Stack direction="column" sx={{ml:1, mr:1}} alignItems="flex-end" spacing={1}>

        <TextField
          id="imageTextField"
          variant="standard"
          margin="none"
          autoComplete="off"
          fullWidth
          placeholder = "Image URL"
          autoFocus
        />

        <Stack direction = "row" alignItems="flex-end" spacing = {1}>
          <Button onClick={props.onClose} variant="contained" color="error" endIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button onClick={onSubmit} variant="contained" color="success" endIcon={<FinishIcon />}>
            Update
          </Button>
        </Stack>
      </Stack>
    </Menu>
  );
}