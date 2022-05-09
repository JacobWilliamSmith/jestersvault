export const createCharacter = () => {
  return {
    type: 'CREATE_CHARACTER'
  }
}

export const addPresetCharacter = (characterData) => {
  return {
    type: 'ADD_PRESET_CHARACTER',
    payload: {characterData}
  }
}

export const addPresetGame = (gameData) => {
  return {
    type: 'ADD_PRESET_GAME',
    payload: {gameData}
  }
}

export const updateCharacter = (id, args = {}) => {
  return {
    type: 'UPDATE_CHARACTER',
    payload: Object.assign({}, {id}, args)
  }
}

export const deleteCharacter = (id) => {
  return {
    type: 'DELETE_CHARACTER',
    payload: {id}
  }
}

export const deleteAllCharacters = () => {
  return {
    type: 'DELETE_ALL_CHARACTERS'
  }
}

export const sortCharacters = (orderBy, isAscending) => {
  const erroneousAction = { type: 'ERROR' }

  if(isAscending !== true && isAscending !== false) {
    return erroneousAction
  }
  
  if(orderBy !== 'name' && orderBy !== 'init' && orderBy !== 'ac' && orderBy !== 'hp' && orderBy !== 'status') {
    return erroneousAction
  }
  
  return {
    type: 'SORT_CHARACTERS',
    payload: {orderBy, isAscending}
  }
}

export const dragAndDropCharacter = (characterId, sourceIndex, destinationIndex) => {
  return {
    type: 'DRAG_AND_DROP_CHARACTER',
    payload: {characterId, sourceIndex, destinationIndex}
  }
}

export const startEncounter = () => {
  return {
    type: 'START_ENCOUNTER'
  }
}

export const nextTurn = () => {
  return {
    type: 'NEXT_TURN'
  }
}

export const previousTurn = () => {
  return {
    type: 'PREVIOUS_TURN'
  }
}

export const endEncounter = () => {
  return {
    type: 'END_ENCOUNTER'
  }
}

export const checkReducersForUpdates = () => {
  return {
    type: 'CHECK_FOR_UPDATES'
  }
}