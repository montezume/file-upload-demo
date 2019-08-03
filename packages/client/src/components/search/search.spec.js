import React from "react";
import { act } from "react-dom/test-utils";
import { render, fireEvent } from "@testing-library/react";
import Search from "./search";

jest.useFakeTimers();

describe("Search", () => {
  it("should have a placeholder", () => {
    const { container } = render(<Search />);
    expect(container.querySelector("input")).toHaveAttribute(
      "placeholder",
      "Search documents",
    );
  });

  it("should update the value when changing the value", () => {
    const { container } = render(<Search />);
    const event = { target: { value: "foo" } };
    fireEvent.change(container.querySelector("input"), event);
    expect(container.querySelector("input")).toHaveAttribute("value", "foo");
  });

  it("should call onDebouncedValueChange after the time limit", async () => {
    const onDebouncedValueChange = jest.fn();
    const { container } = render(
      <Search onDebouncedValueChange={onDebouncedValueChange} />,
    );
    const event = { target: { value: "foo" } };
    fireEvent.change(container.querySelector("input"), event);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(onDebouncedValueChange).toHaveBeenCalledWith("foo");
  });
});
