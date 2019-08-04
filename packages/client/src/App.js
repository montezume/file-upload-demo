/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import Search from "./components/search";
import FileUpload from "./components/file-upload";
import FileList from "./components/file-list";
import AppWrapper from "./components/app-wrapper";
import theme from "./theme";
import { create, list, remove } from "./fakeApi";

const initialState = { files: [], isLoading: false, searchTerm: "" };
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM": {
      return {
        ...state,
        searchTerm: action.payload,
      };
    }

    case "CREATE_FILE": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "CREATE_FILE_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        files: state.files.concat(action.payload),
      };
    }
    case "CREATE_FILE_ERROR": {
      return {
        ...state,
        isLoading: false,
      };
    }

    case "DELETE_FILE": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "DELETE_FILE_SUCCESS": {
      return {
        ...state,
        files: state.files.filter(file => file.id !== action.payload),
        isLoading: false,
      };
    }
    case "DELETE_FILE_ERROR": {
      return {
        ...state,
        isLoading: false,
      };
    }

    case "LOAD_FILES": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "LOAD_FILES_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        files: action.payload,
      };
    }

    case "LOAD_FILES_ERROR": {
      return {
        ...state,
        isLoading: false,
        files: [],
      };
    }

    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const fetchData = React.useCallback(
    async () => {
      dispatch({ type: "LOAD_FILES" });

      try {
        const result = await list(state.searchTerm);
        dispatch({ type: "LOAD_FILES_SUCCESS", payload: result });
      } catch (e) {
        dispatch({ type: "LOAD_FILES_ERROR" });
      }
    },
    [state.searchTerm],
  );

  const onSearchTermChange = React.useCallback(
    async searchTerm => {
      dispatch({ type: "SET_SEARCH_TERM", payload: searchTerm });
      fetchData();
    },
    [fetchData],
  );

  const onFileSelected = React.useCallback(
    async data => {
      dispatch({ type: "CREATE_FILE" });
      try {
        const file = await create(data);
        dispatch({ type: "CREATE_FILE_SUCCESS", payload: file });
      } catch (e) {
        dispatch({ type: "CREATE_FILE_ERROR" });
      }
    },
    [dispatch],
  );

  const onFileDelete = React.useCallback(async id => {
    dispatch({ type: "DELETE_FILE" });
    try {
      await remove(id);
      dispatch({ type: "DELETE_FILE_SUCCESS", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_FILE_ERROR" });
    }
  }, []);

  // runs on mount
  React.useEffect(
    () => {
      fetchData();
    },
    [dispatch, fetchData, state.searchTerm],
  );

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <div>Hello World</div>
        <Search
          placeholder="Search documents"
          onDebouncedValueChange={onSearchTermChange}
        />
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
