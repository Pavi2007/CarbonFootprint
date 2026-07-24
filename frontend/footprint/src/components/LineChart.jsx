import { useEffect, useState } from "react";
import "./LineChart.css";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  getWeeklyTrend,
  getMonthlyTrend,
  getYearlyTrend,
} from "../services/authService";

const CarbonLineChart = () => {

  const [view, setView] = useState("month");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchTrend();
  }, [view]);

  const fetchTrend = async () => {

    try {

      let response;

      if (view === "week") {

        response = await getWeeklyTrend();

      } else if (view === "month") {

        response = await getMonthlyTrend();

      } else {

        response = await getYearlyTrend();

      }

      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {

        setChartData(response.data);

      } else {

        console.error("Expected an array but got:", response.data);

        setChartData([]);

      }

    } catch (error) {

      console.error("Trend API Error:", error);

      setChartData([]);

    }

  };

  return (

    <div className="line-card">

      <div className="chart-header">

        <h2>Carbon Emission Trend</h2>

        <div className="chart-buttons">

          <button
            className={view === "week" ? "active" : ""}
            onClick={() => setView("week")}
          >
            Week
          </button>

          <button
            className={view === "month" ? "active" : ""}
            onClick={() => setView("month")}
          >
            Month
          </button>

          <button
            className={view === "year" ? "active" : ""}
            onClick={() => setView("year")}
          >
            Year
          </button>

        </div>

      </div>

      <ResponsiveContainer width="100%" height={280}>

        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="emission"
            stroke="#ae3b4e"
            strokeWidth={4}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

};

export default CarbonLineChart;