import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "./slices/toDoSlice";

const store = configureStore({
  reducer: {
    toDo: toDoReducer,
  },
});

export default store;
