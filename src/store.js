import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./slices/toDoSlice";

const store = configureStore({
  reducer: {
    chartData: chartReducer,
  },
});

export default store;
