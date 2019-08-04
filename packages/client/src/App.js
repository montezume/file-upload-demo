/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import axios from "axios";
import Search from "./components/search";
import FileUpload from "./components/file-upload";
import FileList from "./components/file-list";
import AppWrapper from "./components/app-wrapper";
import ErrorMessage from "./components/error-message";
import { useStateValue } from "./state";
import theme from "./theme";

export const instance = axios.create({
  headers: {
    "content-security-policy": "script-src 'self'",
    "x-xss-protection": "1; mode=block",
    "X-Content-Type-Options": "nosniff",
  },
});

export const baseURL = "http://localhost:3001";

const App = () => {
  const [state, dispatch] = useStateValue();

  const fetchData = React.useCallback(
    async () => {
      dispatch({ type: "LOAD_FILES" });

      try {
        const queryParam = state.searchTerm ? `?q=${state.searchTerm}` : "";
        const response = await instance.get(
          `${baseURL}/documents${queryParam}`,
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
        const response = await instance.post(`${baseURL}/documents`, data);
        const content = response.data;
        dispatch({ type: "CREATE_FILE_SUCCESS", payload: content });
      } catch (e) {
        dispatch({ type: "CREATE_FILE_ERROR" });
      }
    },
    [dispatch],
  );

  const onClientSideFileError = React.useCallback(
    () => {
      dispatch({ type: "CREATE_FILE_ERROR" });
    },
    [dispatch],
  );

  const onFileDelete = React.useCallback(
    async id => {
      dispatch({ type: "DELETE_FILE" });
      try {
        await instance.delete(`${baseURL}/documents/${id}`);
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
                align-items: center;
              }
            `}
          >
            <Search
              placeholder="Search documents"
              onDebouncedValueChange={onSearchTermChange}
            />
            <div
              css={customTheme => css`
                @media (min-width: ${customTheme.breakpointDesktop}) {
                  margin-left: auto;
                }
              `}
            >
              <FileUpload
                onFileSelected={onFileSelected}
                onError={onClientSideFileError}
              />
            </div>
          </div>
          {state.hasFileDeletionError && (
            <ErrorMessage>Error deleting file. Please try again.</ErrorMessage>
          )}
          {state.hasFileUploadError && (
            <ErrorMessage>Error uploading file. Please try again.</ErrorMessage>
          )}

          {state.hasFileLoadingError && (
            <ErrorMessage>
              Error loading files. Please refresh the page and try again
            </ErrorMessage>
          )}
          {!state.hasFileLoadingError && (
            <FileList onFileDelete={onFileDelete} />
          )}
        </div>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
