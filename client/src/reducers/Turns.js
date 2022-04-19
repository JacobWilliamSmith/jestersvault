let defaultState = {
  activeCharacterId: null
};

const turnsReducer = (state = defaultState, action) => {
  let activeCharacterIndex = undefined;

  switch(action.type) {
    case 'START_ENCOUNTER':
      if(action.payload.characters.length === 0) { return { ...state, activeCharacterId: null }; }
      return { ...state, activeCharacterId: action.payload.characters[0].id };
    
    case 'NEXT_TURN':
      activeCharacterIndex = action.payload.characters.findIndex((c)=>c.id === state.activeCharacterId)
      if(action.payload.characters.length === 0) { return { ...state, activeCharacterId: null }; }
      if(activeCharacterIndex === -1) { return state; }
      return { ...state, activeCharacterId: action.payload.characters[(activeCharacterIndex+1) % action.payload.characters.length].id }

    case 'PREVIOUS_TURN':
      activeCharacterIndex = action.payload.characters.findIndex((c)=>c.id === state.activeCharacterId)
      if(action.payload.characters.length === 0) { return { ...state, activeCharacterId: null }; }
      if(activeCharacterIndex === -1) { return state; }
      return { ...state, activeCharacterId: action.payload.characters[(action.payload.characters.length + activeCharacterIndex - 1) % action.payload.characters.length].id }

    case 'END_ENCOUNTER':
      return { ...state, activeCharacterId: null };

    case 'DELETE_CHARACTER':
      if(action.payload.id !== state.activeCharacterId) { return state; }
      if(action.payload.characters.length === 1) { return { ...state, activeCharacterId: null }; }
      activeCharacterIndex = action.payload.characters.findIndex((c)=>c.id === state.activeCharacterId)
      if(activeCharacterIndex === -1) { return state; }
      return { ...state, activeCharacterId: action.payload.characters[(activeCharacterIndex+1) % action.payload.characters.length].id }

    case 'DELETE_ALL_CHARACTERS':
      return { ...state, activeCharacterId: null }

    default:
      return state
  }
}

export default turnsReducer