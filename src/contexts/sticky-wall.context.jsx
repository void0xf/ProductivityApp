"use client";

import { createContext, useReducer } from "react";

export const StickyWallContext = createContext();

const INITIAL_STATE = {
  StickyNote: [],
  activeStickNoteToEdit: null,
  isEditButtonActive: false,
};

const removeStickyNote = (stickyNotes, id) => {
  return stickyNotes.filter((stickyNote) => {
    return stickyNote.id !== id;
  });
};
const updateStickyNote = (stickyNotes, id, data) => {
  return stickyNotes.map((stickyNote) => {
    if (stickyNote.id === id) {
      stickyNote.header = data.header;
      stickyNote.content = data.content;
    }
    return stickyNote;
  });
};

const stickyWallReducer = (state, action) => {
  switch (action.type) {
    case "ADD_STICKY_NOTE":
      return {
        ...state,
        StickyNote: [...state.StickyNote, action.payload],
      };
    case "UPDATE_NOTES":
      return {
        ...state,
        StickyNote: action.payload,
      };
    case "EDIT_STICKY_NOTE":
      const stickyNotesWithUpdatedStickyNote = updateStickyNote(
        state.StickyNote,
        state.activeStickNoteToEdit,
        action.payload
      );
      return {
        ...state,
        StickyNote: stickyNotesWithUpdatedStickyNote,
      };
    case "REMOVE_STICKY_NOTE":
      const stickyNoteIdToDelete = action.payload;
      const stickyNoteFiltered = removeStickyNote(
        state.StickyNote,
        stickyNoteIdToDelete
      );
      return {
        ...state,
        StickyNote: stickyNoteFiltered,
      };
    case "CLOSE_STICKY_NOTE_INFO":
      return {
        ...state,
        activeStickNoteToEdit: null,
        StickyNote: state.StickyNote.filter((note) => note.header !== ""),
      };
    case "OPEN_STICKY_NOTE_INFO":
      return {
        ...state,
        activeStickNoteToEdit: action.payload,
      };
    case "TOGGLE_EDIT_BUTTON":
      return {
        ...state,
        isEditButtonActive: !state.isEditButtonActive,
      };
    default:
      return state;
  }
};

const StickWallProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stickyWallReducer, INITIAL_STATE);

  return (
    <StickyWallContext.Provider value={{ state, dispatch }}>
      {children}
    </StickyWallContext.Provider>
  );
};

export default StickWallProvider;
