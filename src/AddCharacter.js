import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button'

export default function AddCharacter(props) {
  return (
    <Box>
      <Button fullWidth sx={{m:0, p:0}} onClick={ () => { props.onAdd(); }}>
        <h3>ADD CHARACTER</h3>
      </Button>
    </Box>
  );
}
