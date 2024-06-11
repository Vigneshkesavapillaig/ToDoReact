import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const DonutComponent = () => {
  const [chartData, setChartData] = useState({
    options: {
      labels: [],
    },
    series: [],
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
        setChartData({
          options: {
            labels: categories,
          },
          series: seriesData,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <h1 className="chart-header">Donut Chart</h1>
      <div className="chart">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          width="100%"
        />
      </div>
    </div>
  );
};

export default DonutComponent;
