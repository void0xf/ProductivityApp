"use client";

import { createContext, useReducer, ReactNode } from "react";

interface SearchState {
  search: string;
}

type SearchAction = { type: "UPDATE_SEARCH_BAR"; payload: string };

interface SearchContextType {
  state: SearchState;
  dispatch: React.Dispatch<SearchAction>;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

const INITIAL_STATE: SearchState = {
  search: "",
};

const searchReducer = (
  state: SearchState,
  action: SearchAction
): SearchState => {
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

interface SearchProviderProps {
  children: ReactNode;
}

const SearchProvider = ({ children }: SearchProviderProps) => {
  const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
