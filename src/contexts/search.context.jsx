"use client";

import { createContext, useReducer } from "react";

export const SearchContext = createContext();

const INITIAL_STATE = {
  search: "",
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH_BAR":
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};

const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
