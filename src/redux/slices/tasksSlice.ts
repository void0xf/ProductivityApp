import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, List, TasksState } from "@/types/task.types";

const initialState: TasksState = {
  tasks: [],
  lists: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setLists: (state, action: PayloadAction<List[]>) => {
      state.lists = action.payload;
    },
    addList: (state, action: PayloadAction<List>) => {
      state.lists.push(action.payload);
    },
    removeList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter((list) => list.name !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  removeTask,
  setLists,
  addList,
  removeList,
  setLoading,
  setError,
} = tasksSlice.actions;

export default tasksSlice.reducer;
