import React from "react";
import moxios from "moxios";
import { render, waitForElement } from "./test-utils";
// import { StateContext } from "./state";
import App from "./App";

const createDocument = custom => ({
  name: "mock-image.png",
  size: 3805,
  type: "image/png",
  id: 1,
  ...custom,
});

describe("App", () => {
  beforeEach(function() {
    // import and pass your custom axios instance to this method
    moxios.install();
  });

  afterEach(function() {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });

  describe("rendering", () => {
    describe("when no files have been uploaded yet", () => {
      it("should show 0 documents", async () => {
        moxios.stubRequest("http://localhost:3001/documents", {
          status: 200,
          response: [],
        });

        const { getByText } = await render(<App />);
        // when first rendered, it should show loader
        expect(getByText("Loading ...")).toBeInTheDocument();

        // when moxios resolves, we should get the results
        await waitForElement(() => getByText("0 documents"));
        expect(getByText("0 documents")).toBeInTheDocument();
      });
    });
    describe("when 2 files have been uploaded", () => {
      it("should show 2 documents", async () => {
        moxios.stubRequest("http://localhost:3001/documents", {
          status: 200,
          response: [createDocument(), createDocument({ id: 2 })],
        });

        const { getByText } = await render(<App />);
        // when first rendered, it should show loader
        expect(getByText("Loading ...")).toBeInTheDocument();

        // when moxios resolves, we should get the results
        await waitForElement(() => getByText("2 documents"));
        expect(getByText("2 documents")).toBeInTheDocument();
      });
    });
  });
});
