/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import axios from "axios";
import Search from "./components/search";
import FileUpload from "./components/file-upload";
import FileList from "./components/file-list";
import AppWrapper from "./components/app-wrapper";
import { useStateValue } from "./state";
import theme from "./theme";

const App = () => {
  const [state, dispatch] = useStateValue();

  const fetchData = React.useCallback(
    async () => {
      dispatch({ type: "LOAD_FILES" });

      try {
        const queryParam = state.searchTerm ? `?q=${state.searchTerm}` : "";
        const response = await axios.get(
          `http://localhost:3001/documents${queryParam}`,
        );
        dispatch({ type: "LOAD_FILES_SUCCESS", payload: response.data });
      } catch (e) {
        dispatch({ type: "LOAD_FILES_ERROR" });
      }
    },
    [dispatch, state.searchTerm],
  );

  const onSearchTermChange = React.useCallback(
    searchTerm => {
      dispatch({ type: "SET_SEARCH_TERM", payload: searchTerm });
    },
    [dispatch],
  );

  const onFileSelected = React.useCallback(
    async data => {
      dispatch({ type: "CREATE_FILE" });
      try {
        const response = await axios.post(
          "http://localhost:3001/documents",
          data,
        );
        const content = response.data;
        dispatch({ type: "CREATE_FILE_SUCCESS", payload: content });
      } catch (e) {
        dispatch({ type: "CREATE_FILE_ERROR" });
      }
    },
    [dispatch],
  );

  const onFileDelete = React.useCallback(
    async id => {
      dispatch({ type: "DELETE_FILE" });
      try {
        await axios.delete(`http://localhost:3001/documents/${id}`);
        dispatch({ type: "DELETE_FILE_SUCCESS", payload: id });
      } catch (e) {
        dispatch({ type: "DELETE_FILE_ERROR" });
      }
    },
    [dispatch],
  );

  // runs on mount and searchTerm change
  React.useEffect(
    () => {
      fetchData(state.searchTerm);
    },
    [dispatch, fetchData, state.searchTerm],
  );

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <div
          css={customTheme => css`
            margin: 0 ${customTheme.spacingM};
          `}
        >
          <div
            css={customTheme => css`
              display: flex;
              flex-direction: column;

              @media (min-width: ${customTheme.breakpointDesktop}) {
                flex-direction: row;
              }
            `}
          >
            <Search
              placeholder="Search documents"
              onDebouncedValueChange={onSearchTermChange}
            />
            <FileUpload onFileSelected={onFileSelected} />
          </div>
          <FileList onFileDelete={onFileDelete} />
        </div>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
