import React, { useContext } from 'react';

import Button from '@mui/material/Button';

import Character from './Character';

import GlobalState from './contexts/GlobalState';

export default function CharacterList() {
  const [state, setState] = useContext(GlobalState);
  
  function handleAdd() {
    const emptyCharacter = { id: state.nextCharacterKey, name: '', init: '', ac: '', hp: '', status: '' };
    setState(state => ({...state, characters: [...state.characters, emptyCharacter]}))
    setState(state => ({...state, nextCharacterKey: state.nextCharacterKey + 1}))
  }

  function handleUpdate(id, args) {
    const chars = [...state.characters]
    const index = chars.findIndex(c => c.id === id)
    
    if(args.name   !== undefined) { chars[index].name   = args.name   }
    if(args.init   !== undefined) { chars[index].init   = args.init   }
    if(args.ac     !== undefined) { chars[index].ac     = args.ac     }
    if(args.hp     !== undefined) { chars[index].hp     = args.hp     }
    if(args.status !== undefined) { chars[index].status = args.status }
  }
  
  function handleRemove(id) {
    setState({...state, characters: state.characters.filter((c) => c.id !== id)})
  }

  return (
    <div>
      { state.characters === undefined
        ? <div></div> // The state of Characer must be updated in App.js before state.characters.map will run
        : state.characters.map((c) => (
          <Character 
            key={c.id}
            id={c.id}
            name={c.name}
            init={c.init}
            ac={c.ac}
            hp={c.hp}
            status={c.status}
            onUpdate={handleUpdate}
            onRemove={handleRemove} />
        )) }
      
      <Button fullWidth sx={{m:0, p:0}} onClick={ () => { handleAdd(); }}>
        <h3>ADD CHARACTER</h3>
      </Button>
    </div>
  )
}
