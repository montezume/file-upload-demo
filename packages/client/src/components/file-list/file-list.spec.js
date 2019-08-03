import React from "react";
import { render } from "@testing-library/react";
import FileList from "./file-list";

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
      const { getByText } = render(<FileList files={files} />);
      expect(getByText("1 documents")).toBeInTheDocument();
    });
    it("should show file cards", () => {
      const { getByText } = render(<FileList files={files} />);
      expect(getByText("foo.jpg")).toBeInTheDocument();
      expect(getByText("10000")).toBeInTheDocument();
    });
  });
});
