// LineChartComponent.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const LineChartComponent = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-line",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Sales",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/sales/chartData"
        );
        const data = response.data;
        const categories = data.map((entry) => entry.year);
        const seriesData = data.map((entry) => entry.sales);
        setChartData((prevState) => ({
          ...prevState,
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: categories,
            },
          },
          series: [
            {
              ...prevState.series[0],
              data: seriesData,
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <h1 className="chart-header"> Line Chart</h1>
      <div className="chart">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          width="100%"
        />
      </div>
    </div>
  );
};

export default LineChartComponent;