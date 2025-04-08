import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState, FilterType } from "@/types/filter.types";
import { RootState } from "../store";

const initialState: FilterState = {
  filter: "Upcoming",
  listFilter: "None",
  tagsFilter: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    updateListFilter: (state, action: PayloadAction<string>) => {
      state.listFilter = action.payload;
    },
    updateTagsFilter: (state, action: PayloadAction<string[]>) => {
      state.tagsFilter = action.payload;
    },
    resetFilter: (state) => {
      state.filter = "Upcoming";
      state.listFilter = "None";
      state.tagsFilter = [];
    },
  },
});

// Export actions
export const { updateFilter, updateListFilter, updateTagsFilter, resetFilter } =
  filterSlice.actions;

// Export selectors
export const selectFilter = (state: RootState) => state.filter.filter;
export const selectListFilter = (state: RootState) => state.filter.listFilter;
export const selectTagsFilter = (state: RootState) => state.filter.tagsFilter;

export default filterSlice.reducer;
