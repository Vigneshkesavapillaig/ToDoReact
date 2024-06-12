import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const DonutChartComponent = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    series: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getChartLists"
        );
        const data = response.data;

        if (Array.isArray(data)) {
          const categories = data.map((entry) => entry.title);
          const seriesData = data.map((entry) => entry.item_count);

          setChartData({
            labels: categories,
            series: seriesData,
          });
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
      <h1 className="chart-header">Donut Chart ToDo</h1>
      <div className="chart-box">
        <Chart
          options={{
            labels: chartData.labels,
          }}
          series={chartData.series}
          type="donut"
          width="100%"
        />
      </div>
    </div>
  );
};

export default DonutChartComponent;
