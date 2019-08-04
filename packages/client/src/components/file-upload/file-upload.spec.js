import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { processFileAndGetMimetype } from "../../utils/file";
import FileUpload from "./file-upload";

// we mock the processFileAndGetMimetype method,
// because it deals with file io
jest.mock("../../utils/file", () => {
  return {
    processFileAndGetMimetype: jest.fn(),
  };
});

const largeFileSize = 1000000 * 11;

const createTestFile = custom => ({
  name: "foo.jpg",
  size: 1000000,
  type: "image/jpeg",
  ...custom,
});

describe("FileUpload", () => {
  beforeEach(() => {
    processFileAndGetMimetype.mockImplementation(() => "image/jpeg");
  });
  describe("with valid input", () => {
    it("should update the value when changing the value", async () => {
      const onFileSelected = jest.fn();
      const onError = jest.fn();
      const { getByLabelText } = render(
        <FileUpload onFileSelected={onFileSelected} onError={onError} />,
      );
      const event = {
        target: {
          files: [createTestFile()],
        },
      };
      await fireEvent.change(getByLabelText("Upload"), event);

      expect(onError).not.toHaveBeenCalled();
      expect(onFileSelected).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "foo.jpg",
          size: 1000000,
          blob: "foo.jpg",
          type: "image/jpeg",
        }),
      );
    });
  });
  describe("with invalid input", () => {
    describe("when file size is too large", () => {
      it("should call onError and not call onFileSelected", async () => {
        const file = createTestFile({ size: largeFileSize });
        const onFileSelected = jest.fn();
        const onError = jest.fn();
        const { getByLabelText } = render(
          <FileUpload onFileSelected={onFileSelected} onError={onError} />,
        );
        const event = {
          target: { files: [file] },
        };
        await fireEvent.change(getByLabelText("Upload"), event);
        expect(onFileSelected).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalledWith(
          expect.objectContaining({ size: true }),
        );
      });
    });
    describe("when wrong format", () => {
      beforeEach(() => {
        processFileAndGetMimetype.mockImplementation(() => "Unknown format");
      });

      it("should call onError and not call onFileSelected", async () => {
        const file = createTestFile({ type: "application/pdf" });
        const onFileSelected = jest.fn();
        const onError = jest.fn();
        const { getByLabelText } = render(
          <FileUpload onFileSelected={onFileSelected} onError={onError} />,
        );
        const event = {
          target: { files: [file] },
        };
        await fireEvent.change(getByLabelText("Upload"), event);
        expect(onFileSelected).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalledWith(
          expect.objectContaining({ format: true }),
        );
      });
    });
    describe("when wrong format and too large", () => {
      beforeEach(() => {
        processFileAndGetMimetype.mockImplementation(() => "Unknown format");
      });

      it("should call onError and not call onFileSelected", async () => {
        const file = createTestFile({
          size: largeFileSize,
          type: "application/pdf",
        });
        const onFileSelected = jest.fn();
        const onError = jest.fn(() => {});
        const { getByLabelText } = render(
          <FileUpload onFileSelected={onFileSelected} onError={onError} />,
        );
        const event = {
          target: { files: [file] },
        };
        await fireEvent.change(getByLabelText("Upload"), event);
        expect(onFileSelected).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalledWith(
          expect.objectContaining({ format: true }),
        );
      });
    });
  });
});
