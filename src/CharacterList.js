import * as React from 'react';

import Character from './Character';
import AddCharacter from './AddCharacter';

export default function CharacterList() {

  const [characters, setCharacters] = React.useState([
    { id: -2, name: 'Jonny Hexblade', init: '', ac: '99', hp: '999 / 999', status: 'Literally a demigod'},
    { id: -1, name: 'Nameless Rogue', init: '', ac: '19', hp: '15 / 102', status: 'Edgy backstory, sunlight sensitivity'}
  ]);
  
  const [nextKey, setNextKey] = React.useState(0);

  function handleAdd() {
    const emptyCharacter = {
      id: nextKey,
      name: '',
      init: '',
      ac: '',
      hp: '',
      status: ''
    };
    setCharacters(characters => ( [...characters, emptyCharacter] ))
    setNextKey(nextKey => (nextKey + 1))
  }

  function handleUpdate(id, args) {
    const chars = [...characters]
    const index = chars.findIndex(c => c.id === id)
    
    if(args.name   !== undefined) { chars[index].name   = args.name   }
    if(args.init   !== undefined) { chars[index].init   = args.init   }
    if(args.ac     !== undefined) { chars[index].ac     = args.ac     }
    if(args.hp     !== undefined) { chars[index].hp     = args.hp     }
    if(args.status !== undefined) { chars[index].status = args.status }
  }
  
  function handleRemove(id) {
    setCharacters(characters.filter((c) => c.id !== id));
  }

  return (
    <div>
      { characters.map((c) => (
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
      ))}
      <AddCharacter onAdd={handleAdd} />
    </div>
  )
}
