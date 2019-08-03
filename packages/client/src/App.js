/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import Search from "./components/search";
import FileUpload from "./components/file-upload";
import FileList from "./components/file-list";
import AppWrapper from "./components/app-wrapper";
import theme from "./theme";

const files = [
  { name: "HelloWorld.jpg", size: "100kb" },
  { name: "HelloWorld2.jpg", size: "120kb" },
];
function App() {
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
          <FileUpload onFileSelected={e => console.log("e", e)} />
        </div>
        <FileList files={files} />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
