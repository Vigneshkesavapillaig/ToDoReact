import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const ChartComponent = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
        height: 300,
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Item Count",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getChartLists"
        );
        console.log("Response from server:", response.data);
        const data = response.data;

        if (Array.isArray(data)) {
          const categories = data.map((entry) => entry.title);
          const seriesData = data.map((entry) => entry.item_count);

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
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-component-container">
      <h1 className="chart-header">Bar Chart ToDo</h1>
      <div className="chart-box">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          width="150%"
        />
      </div>
    </div>
  );
};

export default ChartComponent;
