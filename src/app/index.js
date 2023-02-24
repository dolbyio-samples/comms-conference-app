import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import thunkMiddleware from "redux-thunk";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import { reducer, getUxKitContext } from "./VoxeetReactComponents";
import Main from "./components/main/Main";

import "../styles/main.less";

const ASSET_PATH = process.env.ASSET_PATH || "/";

const configureStore = () => {
  const reducers = combineReducers({
    voxeet: reducer,
  });

  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
          actionsBlacklist: [
            "SILENCE",
            "INCREMENT_TIMER",
            "PARTICIPANT_SPEAKING",
            "PARTICIPANT_QUALITY_UPDATED",
          ],
        })
      : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware)
    // other store enhancers if any
  );
  return createStore(reducers, enhancer);
};

console.group('Dolby.io Conference Application');
console.log('GitHub repository: https://github.com/dolbyio-samples/comms-conference-app');
console.groupEnd();

const store = configureStore();
const context = getUxKitContext();

ReactDOM.render(
  <Provider store={store} context={context}>
    <Router basename={ASSET_PATH}>
        <Main />
    </Router>
  </Provider>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept();
}
