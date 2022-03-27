export const createCharacter = () => {
  return {
    type: 'CREATE_CHARACTER'
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

export const startEncounter = (characters) => {
  return {
    type: 'START_ENCOUNTER',
    payload: {characters}
  }
}

export const advanceTurn = (characters) => {
  return {
    type: 'ADVANCE_TURN',
    payload: {characters}
  }
}