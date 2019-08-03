/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import Search from "./components/search";
import FileUpload from "./components/file-upload";
import FileList from "./components/file-list";
import AppWrapper from "./components/app-wrapper";
import theme from "./theme";

const createFileFactory = () => {
  let id = 1;
  return file => ({
    id: id++,
    ...file,
  });
};

const createFile = createFileFactory();

const initialState = { files: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case "add": {
      return { ...state, files: state.files.concat(action.payload) };
    }
    case "delete": {
      return {
        ...state,
        files: state.files.filter(file => file.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onFileSelected = React.useCallback(
    file => {
      const newFile = createFile(file);
      dispatch({ type: "add", payload: newFile });
    },
    [dispatch],
  );

  const onFileDelete = React.useCallback(
    id => {
      dispatch({ type: "delete", payload: id });
    },
    [dispatch],
  );

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <div>Hello World</div>
        <Search placeholder="Search documents" />
        <div
          css={css`
            margin-top: 1em;
            width: 200px;
          `}
        >
          <FileUpload onFileSelected={onFileSelected} />
        </div>
        <FileList files={state.files} onFileDelete={onFileDelete} />
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
