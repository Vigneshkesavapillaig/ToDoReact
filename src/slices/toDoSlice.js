import { createSlice } from "@reduxjs/toolkit";

const chartSlice = createSlice({
  name: "chartData",
  initialState: [], // Initial state can be an empty array or an object depending on your data structure
  reducers: {
    setChartData: (state, action) => {
      return action.payload;
    },
    // You can add more reducers for updating chart data as needed
  },
});

export const { setChartData } = chartSlice.actions;
export default chartSlice.reducer;
