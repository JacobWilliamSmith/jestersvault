import { v4 } from 'node-uuid';

const defaultState = [];

const characterReducer = (state = defaultState, action) => {
  let new_state = [];
  switch(action.type) {
    case 'CREATE_CHARACTER':
      const emptyCharacter = { id: v4(), name: '', init: '', ac: '', hp: '', status: ''};
      return [...state, emptyCharacter];

    case 'UPDATE_CHARACTER':
      new_state = [...state];
      const index = new_state.findIndex(c => c.id === action.payload.id);
      Object.entries(action.payload).forEach(([key, value]) => { new_state[index][key] = value });
      return new_state;

    case 'DRAG_AND_DROP_CHARACTER':
      new_state = [...state];
      new_state.splice(action.payload.sourceIndex, 1);
      new_state.splice(action.payload.destinationIndex, 0, state[action.payload.sourceIndex]);
      return new_state;

    case 'DELETE_CHARACTER':
      return state.filter((c) => c.id !== action.payload.id)

    case 'DELETE_ALL_CHARACTERS':
      return []

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