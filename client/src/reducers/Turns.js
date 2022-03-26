const defaultState = {
  selectedId: -1,
  inEncounter: false,
  numIds: 0
};

const turnsReducer = (state = defaultState, action) =>
{
  switch(action.type) {
    case 'START_ENCOUNTER':
      return {
        ...state,
        inEncounter: true,
        selectedId: 0,
        numIds: action.payload.numIds
      }
    
    case 'ADVANCE_TURN':
      if(state.selectedId < (action.payload.numIds-1))
      {
        return {
          ...state,
          selectedId: state.selectedId+1
        }
      }
      else
      {
        return {
          ...state,
          selectedId: 0
        }
      }
    default:
      return state
  }
}

export default turnsReducer