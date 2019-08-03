import React from "react";
import { render } from "@testing-library/react";
import File from "./file";

const createBaseProps = custom => ({
  id: 1,
  name: "Foo",
  size: 1000,
});

describe("File", () => {
  it("should display name and size", () => {
    const props = createBaseProps();
    const { getByText } = render(<File {...props} />);
    expect(getByText("Foo")).toBeInTheDocument();
    expect(getByText("1000")).toBeInTheDocument();
  });
  describe("callbacks", () => {
    it("should call `onFileDelete` with the id", () => {
      const onFileDelete = jest.fn();
      const props = createBaseProps();
      const { getByText } = render(
        <File {...props} onFileDelete={onFileDelete} />,
      );
      getByText("Delete").click();
      expect(onFileDelete).toHaveBeenCalledWith(1);
    });
  });
});
