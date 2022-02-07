import * as React from 'react';

import Character from './Character';

export default function CharacterList() {
  const [characters, setCharacters] = React.useState([
    { id: 1, name: 'Jonny Hexblade', init: '', ac: '99', hp: '999 / 999', status: 'Literally a demigod'},
    { id: 2, name: 'Nameless Rogue', init: '', ac: '19', hp: '15 / 102', status: 'Edgy backstory, sunlight sensitivity'}
  ]);

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
          onRemove={handleRemove} />
      ))}
    </div>
  )
}
