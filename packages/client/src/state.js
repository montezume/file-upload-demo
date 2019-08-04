// inspo from https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c
import React from "react";

export const StateContext = React.createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={React.useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => React.useContext(StateContext);
