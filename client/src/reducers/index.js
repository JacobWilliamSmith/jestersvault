import characterReducer from "./Characters";
import tableLayoutReducer from "./TableLayout";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  characters: characterReducer,
  tableLayout: tableLayoutReducer,
});

export default rootReducer;
