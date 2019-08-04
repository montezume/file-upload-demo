import React from "react";
import { render } from "./test-utils";
import { StateContext } from "./state";
import App from "./App";

const dispatch = jest.fn();

const state = {
  files: [],
  searchTerm: "",
};

describe("App", () => {
  describe("when no files have been uploaded yet", () => {
    it("should show 0 documents", () => {
      const { getByText } = render(<App />);
      expect(getByText("0 documents")).toBeInTheDocument();
    });
  });
  describe("callbacks", () => {
    describe("on mount", () => {
      it("should dispatch LOAD_FILES action", async () => {
        const dispatch = jest.fn();
        await render(
          <StateContext.Provider value={[state, dispatch]}>
            <App />
          </StateContext.Provider>,
        );
        expect(dispatch).toHaveBeenCalledWith({
          type: "LOAD_FILES",
        });
      });
    });
  });
});
