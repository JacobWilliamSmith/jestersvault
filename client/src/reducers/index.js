import characterReducer from "./Characters";
import { drawerOpenReducer, drawerWidthReducer } from "./Drawer";
import tableLayoutReducer from "./TableLayout";

import { combineReducers } from "redux";

const rootReducer = combineReducers ({
  characters: characterReducer,
  isDrawerOpen: drawerOpenReducer,
  drawerWidth: drawerWidthReducer,
  tableLayout: tableLayoutReducer
})

export default rootReducer