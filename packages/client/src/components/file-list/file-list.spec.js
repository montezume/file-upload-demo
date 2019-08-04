import React from "react";
import { render } from "../../test-utils";
import { StateContext } from "../../state";
import FileList from "./file-list";

const getState = custom => ({
  files: [],
  isLoading: false,
  ...custom,
});

const dispatch = jest.fn();

describe("FileUpload", () => {
  describe("when no files provided", () => {
    it("should show 0 documents", () => {
      const { getByText } = render(<FileList />);
      expect(getByText("0 documents")).toBeInTheDocument();
    });
  });
  describe("when files provided", () => {
    const files = [{ name: "foo.jpg", size: 10000, id: 1 }];
    it("should show number of documents", () => {
      const { getByText } = render(
        <StateContext.Provider value={[getState({ files: files }), dispatch]}>
          <FileList files={files} />
        </StateContext.Provider>,
      );
      expect(getByText("1 documents")).toBeInTheDocument();
    });
    it("should show file cards", () => {
      const { getByText } = render(
        <StateContext.Provider value={[getState({ files: files }), dispatch]}>
          <FileList files={files} />
        </StateContext.Provider>,
      );
      expect(getByText("foo.jpg")).toBeInTheDocument();
      expect(getByText("9.77 KB")).toBeInTheDocument();
    });
  });
});
