import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import thunkMiddleware from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import {
  reducer as voxeetReducer,
  getUxKitContext,
} from "./VoxeetReactComponents";
import Main from "./components/main/Main";

import "../styles/main.less";

const ASSET_PATH = process.env.ASSET_PATH || "/";

const reducers = combineReducers({
  voxeet: voxeetReducer,
});

const configureStore = () => createStore(reducers, applyMiddleware(thunkMiddleware));

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