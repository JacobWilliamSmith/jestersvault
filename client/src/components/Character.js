import * as React from 'react';

import '../css/Character.css';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CharacterDataCell from './CharacterDataCell';

import { useSelector } from 'react-redux';

export default function Character(props) {
  const tableLayout = useSelector(state => state.tableLayout);
  const activeCharacterId = useSelector(state => state.turns.activeCharacterId);

  return (
    <Stack className={props.id === activeCharacterId ? 'activeCharacter' : null} direction="row" alignItems="bottom" spacing={1} sx={{ pl:1, pr:1, pt:0.25, pb:0.25 }}>
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
  );
}
