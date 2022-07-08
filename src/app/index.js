import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import thunkMiddleware from "redux-thunk";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import {
  reducer as voxeetReducer,
  getUxKitContext,
} from "./VoxeetReactComponents";
import Main from "./components/main/Main";

import "../styles/main.less";

const ASSET_PATH = process.env.ASSET_PATH || "/";

const configureStore = () => {
  const reducers = combineReducers({
    voxeet: voxeetReducer,
  });

  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
          actionsBlacklist: ["SILENCE", "INCREMENT_TIMER"],
        })
      : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware)
    // other store enhancers if any
  );
  return createStore(reducers, enhancer);
};

window.addEventListener("storage", function (e) {
  console.log('Conference ID', sessionStorage.getItem("conferenceId"));
});

console.group('Dolby.io Conference Application');
console.log('GitHub repository: https://github.com/dolbyio-samples/comms-conference-app');
console.groupEnd();

ReactDOM.render(
  <Provider store={configureStore()} context={getUxKitContext()}>
    <Router basename={ASSET_PATH}>
        <Main />
    </Router>
  </Provider>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept();
}