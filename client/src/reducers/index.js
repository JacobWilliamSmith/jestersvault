import characterReducer from "./Characters";
import tableLayoutReducer from "./TableLayout";
import turnsReducer from "./Turns";

import { combineReducers } from "redux";

const rootReducer = combineReducers ({
  characters: characterReducer,
  tableLayout: tableLayoutReducer,
  turns: turnsReducer
})

export default rootReducer