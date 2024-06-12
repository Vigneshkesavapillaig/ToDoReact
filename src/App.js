import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import ChartList from "./Component/ChartList";
import LineChartComponent from "./Component/LineChartList";
import "./Chart.css"
import DonutChartComponent from "./Component/DonutChartList";


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ChartList />
        <LineChartComponent/>
        <DonutChartComponent/>
      </div>
    </Provider>
  );
}

export default App;
