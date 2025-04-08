import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface StickyNote {
  id: string | number;
  header: string;
  content: string;
}

interface StickyWallState {
  stickyNotes: StickyNote[];
  activeStickNoteToEdit: string | number | null;
  isEditButtonActive: boolean;
}

const initialState: StickyWallState = {
  stickyNotes: [],
  activeStickNoteToEdit: null,
  isEditButtonActive: false,
};

export const stickyWallSlice = createSlice({
  name: "stickyWall",
  initialState,
  reducers: {
    addStickyNote: (state, action: PayloadAction<StickyNote>) => {
      state.stickyNotes.push(action.payload);
    },
    updateNotes: (state, action: PayloadAction<StickyNote[]>) => {
      state.stickyNotes = action.payload;
    },
    editStickyNote: (
      state,
      action: PayloadAction<{ header: string; content: string }>
    ) => {
      if (state.activeStickNoteToEdit === null) return;

      const noteIndex = state.stickyNotes.findIndex(
        (note) => note.id === state.activeStickNoteToEdit
      );

      if (noteIndex !== -1) {
        state.stickyNotes[noteIndex] = {
          ...state.stickyNotes[noteIndex],
          header: action.payload.header,
          content: action.payload.content,
        };
      }
    },
    removeStickyNote: (state, action: PayloadAction<string | number>) => {
      state.stickyNotes = state.stickyNotes.filter(
        (note) => note.id !== action.payload
      );
    },
    closeStickyNoteInfo: (state) => {
      state.activeStickNoteToEdit = null;
      state.stickyNotes = state.stickyNotes.filter(
        (note) => note.header !== ""
      );
    },
    openStickyNoteInfo: (state, action: PayloadAction<string | number>) => {
      state.activeStickNoteToEdit = action.payload;
    },
    toggleEditButton: (state) => {
      state.isEditButtonActive = !state.isEditButtonActive;
    },
  },
});

// Export actions
export const {
  addStickyNote,
  updateNotes,
  editStickyNote,
  removeStickyNote,
  closeStickyNoteInfo,
  openStickyNoteInfo,
  toggleEditButton,
} = stickyWallSlice.actions;

export default stickyWallSlice.reducer;
