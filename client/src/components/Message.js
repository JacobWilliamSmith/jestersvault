import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default function Message(props) {
  return (
    <Box>
        <Snackbar open={props.isOpen}
                  autoHideDuration={5000}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  onClose={props.onClose}>
          <MuiAlert elevation={6}
                    variant="filled"
                    onClose={props.onClose}
                    severity={props.msgError ? "error" : "success"}
                    sx={{ width: '100%' }}>
                    {props.msgBody}
          </MuiAlert>
        </Snackbar>
    </Box>
  );
}