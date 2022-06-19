import { useRef } from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import FinishIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ImageMenu(props) {
  const input = useRef(null);

  return (
    <Menu anchorEl={props.anchor} open={Boolean(props.anchor)} onClose={props.onClose}>
      <Stack direction="column" sx={{ ml: 1, mr: 1, width: 270 }} alignItems="flex-end" spacing={1}>
        <TextField
          inputRef={input}
          placeholder={props.placeholder || ""}
          defaultValue={props.defaultValue || ""}
          onChange={props.onChange ? () => props.onChange(input.current.value) : null}
          variant="standard"
          margin="none"
          autoComplete="off"
          fullWidth
          autoFocus
        />

        <Stack sx={{ width: "100%" }} direction="row" alignItems="flex-end" spacing={1}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                sx={{ width: "100%" }}
                onClick={props.onClose}
                variant="contained"
                color="error"
                endIcon={<CancelIcon />}
              >
                {props.closeText || "Close"}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                sx={{ width: "100%" }}
                color={props.submitColor || "success"}
                onClick={() => props.onSubmit(input.current.value)}
                variant="contained"
                endIcon={<FinishIcon />}
              >
                {props.submitText || "Submit"}
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Menu>
  );
}
