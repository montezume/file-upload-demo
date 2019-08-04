import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StateProvider } from "./state";
import reducer from "./reducer";
import * as serviceWorker from "./serviceWorker";

const initialState = {
  files: [],
  isLoading: false,
  searchTerm: "",
  hasFileLoadingError: false,
  hasFileDeletionError: false,
  hasFileUploadError: false,
};

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
