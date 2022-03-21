import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import CharacterDataCell from './CharacterDataCell';

import { useSelector } from 'react-redux';

export default function Character(props) {
  const tableLayout = useSelector(state => state.tableLayout);

  return (
    <Box>
      <Stack direction="row" alignItems="bottom" spacing={1} sx={{ ml:1, mr:1 }}>
        <Grid container spacing={1}>
          { tableLayout.map((column) => (
              <CharacterDataCell
                id={props.id}
                key={tableLayout.findIndex((i) => (i.stat === column.stat))}
                columnIndex={tableLayout.findIndex((i) => (i.stat === column.stat))}
              />
            ))
          }
        </Grid>
      </Stack>
      <Divider sx={{ mt: 0.5, mb: 0.5 }}/>
    </Box>
  );
}
