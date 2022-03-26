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
      Object.entries(action.payload).forEach(([key, value]) => { new_state[index][key] = value });
      return new_state

    case 'DELETE_CHARACTER':
      const delState = state.filter((c) => c.id !== action.payload.id);
      for (let i = 0; i < delState.length; i++) {
        delState[i].id = i;
      }
      return delState

    case 'SORT_CHARACTERS':
      return [...state].sort((a,b) => compare(a[action.payload.orderBy], b[action.payload.orderBy], action.payload.isAscending));

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