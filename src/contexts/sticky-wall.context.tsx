"use client";

import { createContext, useReducer, ReactNode } from "react";

interface StickyNote {
  id: string | number;
  header: string;
  content: string;
}

interface StickyWallState {
  StickyNote: StickyNote[];
  activeStickNoteToEdit: string | number | null;
  isEditButtonActive: boolean;
}

type StickyWallAction =
  | { type: "ADD_STICKY_NOTE"; payload: StickyNote }
  | { type: "UPDATE_NOTES"; payload: StickyNote[] }
  | { type: "EDIT_STICKY_NOTE"; payload: { header: string; content: string } }
  | { type: "REMOVE_STICKY_NOTE"; payload: string | number }
  | { type: "CLOSE_STICKY_NOTE_INFO" }
  | { type: "OPEN_STICKY_NOTE_INFO"; payload: string | number }
  | { type: "TOGGLE_EDIT_BUTTON" };

interface StickyWallContextType {
  state: StickyWallState;
  dispatch: React.Dispatch<StickyWallAction>;
}

export const StickyWallContext = createContext<
  StickyWallContextType | undefined
>(undefined);

const INITIAL_STATE: StickyWallState = {
  StickyNote: [],
  activeStickNoteToEdit: null,
  isEditButtonActive: false,
};

const removeStickyNote = (
  stickyNotes: StickyNote[],
  id: string | number
): StickyNote[] => {
  return stickyNotes.filter((stickyNote) => stickyNote.id !== id);
};

const updateStickyNote = (
  stickyNotes: StickyNote[],
  id: string | number,
  data: { header: string; content: string }
): StickyNote[] => {
  return stickyNotes.map((stickyNote) => {
    if (stickyNote.id === id) {
      return {
        ...stickyNote,
        header: data.header,
        content: data.content,
      };
    }
    return stickyNote;
  });
};

const stickyWallReducer = (
  state: StickyWallState,
  action: StickyWallAction
): StickyWallState => {
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
      if (state.activeStickNoteToEdit === null) return state;
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

interface StickWallProviderProps {
  children: ReactNode;
}

const StickWallProvider = ({ children }: StickWallProviderProps) => {
  const [state, dispatch] = useReducer(stickyWallReducer, INITIAL_STATE);

  return (
    <StickyWallContext.Provider value={{ state, dispatch }}>
      {children}
    </StickyWallContext.Provider>
  );
};

export default StickWallProvider;
