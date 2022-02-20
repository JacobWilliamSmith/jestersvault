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