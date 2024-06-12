import { createSlice } from "@reduxjs/toolkit";

const chartSlice = createSlice({
  name: "chartData",
  initialState: [],
  reducers: {
    setChartData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setChartData } = chartSlice.actions;
export default chartSlice.reducer;
