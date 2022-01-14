import * as React from 'react';

import Character from './Character';

export default function CharacterList() {
  const [characters, setCharacters] = React.useState([
    { name: 'Jonny Hexblade', init: '', ac: '99', hp: '999 / 999', status: 'Literally a demigod'},
    { name: 'Nameless Rogue', init: '', ac: '19', hp: '15 / 102', status: 'Edgy backstory, sunlight sensitivity'}
  ]);

  return (
    <div>
      { characters.map((c) => (
        <Character name={c.name} init={c.init} ac={c.ac} hp={c.hp} status={c.status} />
      ))

      }
    </div>
  )
}