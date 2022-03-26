import { styled } from "@mui/material/styles";

import * as React from 'react';
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'

import { startEncounter, advanceTurn } from "../actions";
import { useSelector, useDispatch } from "react-redux";

export default function TurnCounterMenu() {
  const dispatch = useDispatch();
  let numCharacters = useSelector(state => state.characters);
  const inEncounter = useSelector(state => state.turns.inEncounter);


  return (
    <Box>
      <AppBar  position="fixed" sx={{ top: 'auto', bottom: 0, height: "8%"}}>
        <Toolbar sx={{ mx: 'auto'}}>
          { inEncounter ?
            <Button color="inherit" onClick={ () => { dispatch(advanceTurn(numCharacters.length)); }}>Next Turn</Button> :
            <Button color="inherit" onClick={ () => { dispatch(startEncounter(numCharacters.length)); }}>Start Encounter</Button> }
        </Toolbar>
      </AppBar>
    </Box>
  )
}