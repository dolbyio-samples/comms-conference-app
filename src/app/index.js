import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import thunkMiddleware from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";

import {
  VoxeetProvider,
  reducer as voxeetReducer,
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
console.log('GitHub repository: https://github.com/FabienLavocat/comms-conference-app');
console.groupEnd();

ReactDOM.render(
  <VoxeetProvider store={configureStore()}>
    <Router basename={ASSET_PATH}>
      <Main />
    </Router>
  </VoxeetProvider>,
  document.getElementById("app")
);
