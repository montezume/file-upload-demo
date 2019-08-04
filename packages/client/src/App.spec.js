import React from "react";
import { render } from "@testing-library/react";
import { StateProvider } from "./state";
import App from "./App";
import reducer from "./reducer";

const initialState = {
  isLoading: true,
  searchTerm: "",
  files: [],
};

describe("App", () => {
  describe("when no files have been uploaded yet", () => {
    it("should show 0 documents", () => {
      const { getAllByText } = render(
        <StateProvider initialState={initialState} reducer={reducer}>
          <App />
        </StateProvider>,
      );
      // console.log(getAllByText("0 documents").map(a => a.value));
      // expect(getAllByText("0 documents")).toBeInTheDocument();
    });
  });
  it("when adding a file", () => {
    const { getByLabelText } = render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>,
    );
    // console.log("getByLabelText", getByLabelText("Upload"));
  });
});
