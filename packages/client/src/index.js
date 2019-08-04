import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StateProvider } from "./state";
import reducer from "./reducer";

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
