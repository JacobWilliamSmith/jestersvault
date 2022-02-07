import * as React from 'react';

import Character from './Character';
import AddCharacter from './AddCharacter';

export default function CharacterList() {
  const [characters, setCharacters] = React.useState([
    { id: -2, name: 'Jonny Hexblade', init: '', ac: '99', hp: '999 / 999', status: 'Literally a demigod'},
    { id: -1, name: 'Nameless Rogue', init: '', ac: '19', hp: '15 / 102', status: 'Edgy backstory, sunlight sensitivity'}
  ]);
  
  const [nextKey, setNextKey] = React.useState(0);

  const emptyCharacter = {
    id: nextKey,
    name: '',
    init: '',
    ac: '',
    hp: '',
    status: ''
  };

  function handleRemove(id) {
    setCharacters(characters.filter((c) => c.id !== id));
  }

  function handleAdd() {
    setCharacters(characters => ( [...characters, emptyCharacter] ))
    setNextKey(nextKey => (nextKey + 1))
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
          onRemove={handleRemove} />
      ))}
      <AddCharacter onAdd={handleAdd}/>
    </div>
  )
}
