/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import Search from "./components/search";
import FileUpload from "./components/file-upload";
import FileList from "./components/file-list";
import AppWrapper from "./components/app-wrapper";
import { useStateValue } from "./state";
import theme from "./theme";
import { create, list, remove } from "./fakeApi";

const App = () => {
  const [state, dispatch] = useStateValue();

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
    [dispatch, state.searchTerm],
  );

  const onSearchTermChange = React.useCallback(
    async searchTerm => {
      dispatch({ type: "SET_SEARCH_TERM", payload: searchTerm });
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onFileSelected = React.useCallback(
    async data => {
      console.log("here on fileSelected", data);
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

  const onFileDelete = React.useCallback(
    async id => {
      dispatch({ type: "DELETE_FILE" });
      try {
        await remove(id);
        dispatch({ type: "DELETE_FILE_SUCCESS", payload: id });
      } catch (e) {
        dispatch({ type: "DELETE_FILE_ERROR" });
      }
    },
    [dispatch],
  );

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
        <div
          css={customTheme => css`
            display: flex;
            flex-direction: column;

            @media (min-width: ${customTheme.breakpointDesktop}) {
              flex-direction: row;
              margin: 0 ${customTheme.spacingS};
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
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
