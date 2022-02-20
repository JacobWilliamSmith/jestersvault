import characterReducer from "./Characters";
import { drawerOpenReducer, drawerWidthReducer } from "./Drawer";

import { combineReducers } from "redux";

const rootReducer = combineReducers ({
  characters: characterReducer,
  isDrawerOpen: drawerOpenReducer,
  drawerWidth: drawerWidthReducer
})

export default rootReducer