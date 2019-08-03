import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  describe("when no files have been uploaded yet", () => {
    it("should show 0 documents", () => {
      const { getAllByText } = render(<App />);
      // console.log(getAllByText("0 documents").map(a => a.value));
      // expect(getAllByText("0 documents")).toBeInTheDocument();
    });
  });
  it("when adding a file", () => {
    const { getByLabelText } = render(<App />);
    // console.log("getByLabelText", getByLabelText("Upload"));
  });
});
