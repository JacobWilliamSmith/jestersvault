let defaultState = {
  activeCharacterId: null
};

const turnsReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'START_ENCOUNTER':
      if(action.payload.characters.length === 0) {
        return {
          ...state,
          activeCharacterId: null
        }
      }
      return {
        ...state,
        activeCharacterId: action.payload.characters[0].id
      }
    
    case 'ADVANCE_TURN':
      if(action.payload.characters.length === 0) {
        return {
          ...state,
          activeCharacterId: null
        }
      }

      let activeCharacterIndex = action.payload.characters.findIndex((c)=>c.id === state.activeCharacterId)
      
      if(activeCharacterIndex === -1) {
        if(action.payload.characters.length === 0) {
          return {
            ...state,
            activeCharacterId: null
          }
        }
        return {
          ...state,
          activeCharacterId: action.payload.characters[0].id
        }
      }

      return {
        ...state,
        activeCharacterId: action.payload.characters[(activeCharacterIndex+1) % action.payload.characters.length].id
      }

    case 'END_ENCOUTER':
      return {
        ...state,
        activeCharacterId: null
      }
      
    default:
      return state
  }
}

export default turnsReducer