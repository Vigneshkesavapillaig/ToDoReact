// App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import ChartComponent from "./Component/ChartComponent";
import LineChartComponent from "./Component/LineChartComponent";
import "./ToDOList.css"
import DonutComponent from "./Component/DonutComponent";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ChartComponent />
        <LineChartComponent/>
        <DonutComponent/>
      </div>
    </Provider>
  );
}

export default App;
