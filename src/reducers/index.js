import characterReducer from "./Characters";

import { combineReducers } from "redux";

const rootReducer = combineReducers ({
  characters: characterReducer
})

export default rootReducer