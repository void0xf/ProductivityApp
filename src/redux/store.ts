import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import stickyWallReducer from "./slices/stickyWallSlice";
import userReducer from "./slices/userSlice";
import tasksReducer from "./slices/tasksSlice";
import filterReducer from "./slices/filterSlice";
import searchReducer from "./slices/searchSlice";
import uiStateReducer from "./slices/uiStateSlice";
const rootReducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer,
  filter: filterReducer,
  search: searchReducer,
  stickyWall: stickyWallReducer,
  uiState: uiStateReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
