const defaultState = [
  { id: 0, name: 'Jonny Hexblade', init: '', ac: '99', hp: '999 / 999', status: 'Literally a demigod'},
  { id: 1, name: 'Nameless Rogue', init: '', ac: '19', hp: '15 / 102', status: 'Edgy backstory, sunlight sensitivity'}
];

let idIncrementer = defaultState.length;

const characterReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'CREATE_CHARACTER':
      const emptyCharacter = { id: idIncrementer++, name: '', init: '', ac: '', hp: '', status: '' };
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

    default:
      return state
  }
}

export default characterReducer