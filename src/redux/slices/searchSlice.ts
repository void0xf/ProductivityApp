import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchState } from "@/types/search.types";

const initialState: SearchState = {
  search: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    clearSearch: (state) => {
      state.search = "";
    },
  },
});

// Export actions
export const { updateSearch, clearSearch } = searchSlice.actions;

// Export selector
export const selectSearch = (state: SearchState) => state.search;

export default searchSlice.reducer;
