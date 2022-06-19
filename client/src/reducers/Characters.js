import { v4 } from "node-uuid";

const defaultState = {
  characterList: [],
  activeCharacterId: null,
  characterOrder: { orderBy: null, isAscending: null },
};

const characterReducer = (state = defaultState, action) => {
  let newCharacterList = [];
  let activeCharacterIndex = undefined;

  switch (action.type) {
    case "CREATE_CHARACTER":
      const emptyCharacter = { id: v4(), name: "", init: "", ac: "", hp: "", status: "" };
      return { ...state, characterList: [...state.characterList, emptyCharacter] };

    case "ADD_PRESET_CHARACTER":
      let newCharacter = { ...action.payload.characterData };
      newCharacter.id = v4();
      return { ...state, characterList: [...state.characterList, newCharacter] };

    case "ADD_PRESET_GAME":
      let newCharacters = new Array(action.payload.gameData.length);
      for (let i = 0; i < action.payload.gameData.length; i++) {
        newCharacters[i] = { ...action.payload.gameData[i], id: v4() };
      }
      return { ...state, characterList: state.characterList.concat(newCharacters) };

    case "UPDATE_CHARACTER":
      newCharacterList = [...state.characterList];
      const index = newCharacterList.findIndex((c) => c.id === action.payload.id);
      Object.entries(action.payload).forEach(([key, value]) => {
        newCharacterList[index][key] = value;
      });
      return { ...state, characterList: newCharacterList };

    case "DRAG_AND_DROP_CHARACTER":
      if (action.payload.sourceIndex === action.payload.destinationIndex) {
        return state;
      }
      newCharacterList = [...state.characterList];
      newCharacterList.splice(action.payload.sourceIndex, 1);
      newCharacterList.splice(
        action.payload.destinationIndex,
        0,
        state.characterList[action.payload.sourceIndex]
      );
      return {
        ...state,
        characterList: newCharacterList,
        characterOrder: { orderBy: null, isAscending: null },
      };

    case "DELETE_CHARACTER":
      if (state.characterList.length <= 1) {
        return {
          ...state,
          characterList: [],
          activeCharacterId: null,
          characterOrder: { orderBy: null, isAscending: null },
        };
      }

      if (action.payload.id !== state.activeCharacterId) {
        return {
          ...state,
          characterList: state.characterList.filter((c) => c.id !== action.payload.id),
        };
      }

      activeCharacterIndex = state.characterList.findIndex((c) => c.id === state.activeCharacterId);
      if (activeCharacterIndex === -1) {
        return {
          ...state,
          characterList: state.characterList.filter((c) => c.id !== action.payload.id),
        };
      }

      return {
        ...state,
        activeCharacterId:
          state.characterList[(activeCharacterIndex + 1) % state.characterList.length].id,
        characterList: state.characterList.filter((c) => c.id !== action.payload.id),
      };

    case "DELETE_ALL_CHARACTERS":
      return {
        ...state,
        characterList: [],
        activeCharacterId: null,
        characterOrder: { orderBy: null, isAscending: null },
      };

    case "SORT_CHARACTERS":
      return {
        ...state,
        characterList: [...state.characterList].sort((a, b) =>
          compare(a[action.payload.orderBy], b[action.payload.orderBy], action.payload.isAscending)
        ),
        characterOrder: {
          orderBy: action.payload.orderBy,
          isAscending: action.payload.isAscending,
        },
      };

    case "START_ENCOUNTER":
      if (state.characterList.length === 0) {
        return { ...state, activeCharacterId: null };
      }
      return { ...state, activeCharacterId: state.characterList[0].id };

    case "NEXT_TURN":
      activeCharacterIndex = state.characterList.findIndex((c) => c.id === state.activeCharacterId);
      if (state.characterList.length === 0) {
        return { ...state, activeCharacterId: null };
      }
      if (activeCharacterIndex === -1) {
        return { ...state, activeCharacterId: null };
      }
      return {
        ...state,
        activeCharacterId:
          state.characterList[(activeCharacterIndex + 1) % state.characterList.length].id,
      };

    case "PREVIOUS_TURN":
      activeCharacterIndex = state.characterList.findIndex((c) => c.id === state.activeCharacterId);
      if (state.characterList.length === 0) {
        return { ...state, activeCharacterId: null };
      }
      if (activeCharacterIndex === -1) {
        return { ...state, activeCharacterId: null };
      }
      return {
        ...state,
        activeCharacterId:
          state.characterList[
            (state.characterList.length + activeCharacterIndex - 1) % state.characterList.length
          ].id,
      };

    case "END_ENCOUNTER":
      return { ...state, activeCharacterId: null };

    case "CHECK_FOR_UPDATES":
      return { ...defaultState, ...state };

    default:
      return state;
  }
};

function compare(a, b, isAscending) {
  // Empty text boxes will always be listed last
  if (a === "" && b === "") {
    return 0;
  }
  if (a === "") {
    return 1;
  }
  if (b === "") {
    return -1;
  }

  return descend(a, b) * (isAscending ? -1 : 1);
}

function descend(a, b) {
  // Numbers will be listed after non-numbers
  if (isNaN(a) && !isNaN(b)) {
    return 1;
  }
  if (!isNaN(a) && isNaN(b)) {
    return -1;
  }

  // Numbers will be ordered high to low
  if (!isNaN(a) && !isNaN(b)) {
    return b - a;
  }

  // Non-numbers will be ordered alphabetically
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

export default characterReducer;
