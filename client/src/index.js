import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import RootProvider from "./contexts";
import throttle from "lodash/throttle";

import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

// To use Redux Devtools, follow the browser configuration instructions at https://github.com/reduxjs/redux-devtools/tree/main/extension
const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(
  throttle(() => {
    saveState({
      characters: store.getState().characters,
    });
  }, 1000)
);

ReactDOM.render(
  <RootProvider>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </RootProvider>,
  document.getElementById("root")
);
