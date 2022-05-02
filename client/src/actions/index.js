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

export const deleteCharacter = (id, characters) => {
  return {
    type: 'DELETE_CHARACTER',
    payload: {id, characters}
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

export const startEncounter = (characters) => {
  return {
    type: 'START_ENCOUNTER',
    payload: {characters}
  }
}

export const nextTurn = (characters) => {
  return {
    type: 'NEXT_TURN',
    payload: {characters}
  }
}

export const previousTurn = (characters) => {
  return {
    type: 'PREVIOUS_TURN',
    payload: {characters}
  }
}

export const endEncounter = () => {
  return {
    type: 'END_ENCOUNTER'
  }
}