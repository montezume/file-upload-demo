import React from "react";
import { render } from "@testing-library/react";
import { StateProvider } from "./state";
import reducer from "./reducer";

const initialState = { files: [], isLoading: false, searchTerm: "" };

const customRender = (node, { ...rtlOptions } = {}) => ({
  ...render(
    <StateProvider initialState={initialState} reducer={reducer}>
      {node}
    </StateProvider>,
    rtlOptions,
  ),
});

export * from "@testing-library/react";

export { customRender as render };
