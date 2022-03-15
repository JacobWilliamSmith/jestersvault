export const drawerOpenReducer = (state = false, action) => {
  switch(action.type) {
    case 'TOGGLE_DRAWER':
      return !state  
    default:
      return state
  }
}

export const drawerWidthReducer = (state = 240, action) => {
  switch(action.type) {
    default:
      return state
  }
}