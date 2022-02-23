import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import CharacterDataCell from './CharacterDataCell';

export default function Character(props) {
  return (
    <Box>
      <Stack direction="row" alignItems="bottom" spacing={1} sx={{ ml:1, mr:1 }}>
        <Grid container spacing={1}>
          <CharacterDataCell
            id={props.id}
            width={2.75}
            name='Name'
            stat='name'
          />
          <CharacterDataCell
            id={props.id}
            width={1.25}
            name='Initiative'
            stat='init'
            hasStartAdornment={true}
          />
          <CharacterDataCell
            id={props.id}
            width={1.25}
            name='Armor Class'
            stat='ac'
            hasStartAdornment={true}
          />
          <CharacterDataCell
            id={props.id}
            width={1.75}
            name='Hit Points'
            stat='hp'
            hasStartAdornment={true}
          />
          <CharacterDataCell
            id={props.id}
            width={5}
            name='Status Effects'
            stat='status'
            hasStartAdornment={true}
            isRightmostColumn={true}
          />
        </Grid>
      </Stack>
      <Divider sx={{ mt: 0.5, mb: 0.5 }}/>
    </Box>
  );
}
