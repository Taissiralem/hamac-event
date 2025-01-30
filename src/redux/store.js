import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/authSlice";
import chosenSortieReducer from "./slices/chosenSortieSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "hamac",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: AuthReducer,
    chosenSortie: chosenSortieReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredActionPaths: ["register"],
        ignoredPaths: ["auth.user.someNonSerializablePath"],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);
