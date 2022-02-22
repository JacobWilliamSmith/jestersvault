import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import './CharacterListHeader.css';

import CharacterListOrderButton from './CharacterListOrderButton';

export default function CharacterListHeader() {
  return (
    <Box>
      <Stack direction="row" alignItems="bottom" spacing={1} sx={{ ml:1, mr:1 }}>
        <Grid container spacing={1}>

          <Grid item xs={2.75}>
            <Stack direction="row" alignItems="bottom" spacing={1}>
              <h3 className="header">
                Character Name
              </h3>
              <CharacterListOrderButton />
            </Stack>
          </Grid>

          <Grid item xs={1.25}>
            <Stack direction="row" alignItems="bottom" spacing={1}>
              <h3 className="header">
                Initiative
              </h3>
              <CharacterListOrderButton />
            </Stack>
          </Grid>

          <Grid item xs={1.25}>
            <Stack direction="row" alignItems="bottom" spacing={1}>
              <h3 className="header">
                Armor Class
              </h3>
              <CharacterListOrderButton />
            </Stack>
          </Grid>

          <Grid item xs={1.75}>
            <Stack direction="row" alignItems="bottom" spacing={1}>
              <h3 className="header">
                Hit Points
              </h3>
              <CharacterListOrderButton />
            </Stack>
          </Grid>

          <Grid item xs={5}>
            <Stack direction="row" alignItems="bottom" spacing={1} sx={{pr:6}}>
              <h3 className="header">
                Status Effects
              </h3>
              <CharacterListOrderButton />
            </Stack>
          </Grid>

        </Grid>
      </Stack>

      <Divider sx={{ mt: 0.5, mb: 0.5 }}/>
    </Box>
  );
}
