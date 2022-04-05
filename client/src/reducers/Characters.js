const defaultState = [
  { id: 0, name: 'Kayde (Jacob)', init: '', ac: '20', hp: '115 / 125', status: '31 ward hp, water breathing'},
  { id: 1, name: 'Lyric (Lee)', init: '', ac: '18', hp: '108 / 119', status: 'Rally 1'},
  { id: 2, name: 'Tado (Greg)', init: '', ac: '16', hp: '44 / 67', status: ''},
  { id: 3, name: 'Chorus (Sam)', init: '', ac: '16', hp: '87 / 97', status: ''},
  { id: 4, name: 'Sark (Jonah)', init: '', ac: '16', hp: '28 / 120', status: ''},
  { id: 5, name: 'Garus (Ajay)', init: '', ac: '15', hp: '36 / 104', status: ''},
  { id: 6, name: 'Elmer', init: '', ac: '15', hp: '25 / 50', status: ''},
  { id: 7, name: 'Zog', init: '', ac: '', hp: '', status: ''}
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
      return state.filter((c) => c.id !== action.payload.id)

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