import React from "react";
import moxios from "moxios";
import { render, waitForElement } from "./test-utils";
import App from "./App";

const createDocument = custom => ({
  name: "mock-image.png",
  size: 3805,
  type: "image/png",
  id: 1,
  ...custom,
});

// these are "integration" tests
// we don't test the internals, but we test the behaviour
// we mock as little as possible (only API calls)
describe("App", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
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
      beforeEach(() => {
        moxios.stubRequest("http://localhost:3001/documents", {
          status: 200,
          response: [createDocument(), createDocument({ id: 2 })],
        });
      });
      it("should show 2 documents", async () => {
        const { getByText } = await render(<App />);
        // when first rendered, it should show loader
        expect(getByText("Loading ...")).toBeInTheDocument();

        // when moxios resolves, we should get the results
        await waitForElement(() => getByText("2 documents"));
        expect(getByText("2 documents")).toBeInTheDocument();
      });
      describe("when you click to delete the first document", () => {
        it("should delete the document", async () => {
          const { getByText, getAllByText } = await render(<App />);

          // when moxios resolves, we should get the results
          await waitForElement(() => getByText("2 documents"));
          expect(getByText("2 documents")).toBeInTheDocument();
          const deleteButton = getAllByText("Delete")[0];
          expect(deleteButton).toBeInTheDocument();
          deleteButton.click();

          // stub response
          moxios.stubRequest("http://localhost:3001/documents/1", {
            status: 200,
            response: {},
          });
          expect(getByText("Loading ...")).toBeInTheDocument();

          const header = await waitForElement(() => getByText("1 documents"));
          expect(header).toBeInTheDocument();
        });
      });
    });
  });
});
