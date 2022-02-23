const defaultState = [
  { id: 0, name: 'Jonny Hexblade', init: '', ac: '99', hp: '999 / 999', status: 'Literally a demigod'},
  { id: 1, name: 'Nameless Rogue', init: '', ac: '19', hp: '15 / 102', status: 'Edgy backstory, sunlight sensitivity'}
];

let idIncrementer = defaultState.length;

const characterReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'CREATE_CHARACTER':
      const emptyCharacter = { id: idIncrementer++, name: '', init: '', ac: '', hp: '', status: ''};
      return [...state, emptyCharacter]

    case 'UPDATE_CHARACTER':
      const new_state = [...state]
      const index = new_state.findIndex(c => c.id === action.payload.id)
      
      if( action.payload.name   !== undefined ) { new_state[index].name   = action.payload.name   }
      if( action.payload.init   !== undefined ) { new_state[index].init   = action.payload.init   }
      if( action.payload.ac     !== undefined ) { new_state[index].ac     = action.payload.ac     }
      if( action.payload.hp     !== undefined ) { new_state[index].hp     = action.payload.hp     }
      if( action.payload.status !== undefined ) { new_state[index].status = action.payload.status }

      return new_state

    case 'DELETE_CHARACTER':
      return state.filter((c) => c.id !== action.payload.id)

    case 'SORT_CHARACTERS':
      let sortedCharacters = [...state]

      switch(action.payload.orderBy) {
        case 'name':
          return sortedCharacters.sort((a,b) => compare(a.name, b.name, action.payload.isAscending));
        case 'init':
          return sortedCharacters.sort((a,b) => compare(a.init, b.init, action.payload.isAscending));
        case 'ac':
          return sortedCharacters.sort((a,b) => compare(a.ac, b.ac, action.payload.isAscending));
        case 'hp':
          return sortedCharacters.sort((a,b) => compare(a.hp, b.hp, action.payload.isAscending));
        case 'status':
          return sortedCharacters.sort((a,b) => compare(a.status, b.status, action.payload.isAscending));
        default:
          return sortedCharacters.sort((a,b) => a.id - b.id)
      }

    default:
      return state
  }
}

function compare(a, b, isAscending) {
  // Empty text boxes will always be listed last
  if(a === '' && b === '')   { return  0; }
  if(a === '')               { return  1; }
  if(b === '')               { return -1; }

  return descend(a, b) * (isAscending ? -1 : 1);
}

function descend(a, b) {
  // Numbers will be listed after non-numbers
  if( isNaN(a) && !isNaN(b)) { return  1; }
  if(!isNaN(a) &&  isNaN(b)) { return -1; }

  // Numbers will be ordered high to low
  if(!isNaN(a) && !isNaN(b)) { return b - a }

  // Non-numbers will be ordered alphabetically
  if(a < b)                  { return -1; }
  if(a > b)                  { return  1; }
                               return  0;
}

export default characterReducer