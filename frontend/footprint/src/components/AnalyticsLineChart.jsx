import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const weekData = [
  { time: "Mon", emission: 12 },
  { time: "Tue", emission: 15 },
  { time: "Wed", emission: 10 },
  { time: "Thu", emission: 18 },
  { time: "Fri", emission: 14 },
  { time: "Sat", emission: 20 },
  { time: "Sun", emission: 16 },
];

const monthData = [
  { time: "Jan", emission: 120 },
  { time: "Feb", emission: 95 },
  { time: "Mar", emission: 140 },
  { time: "Apr", emission: 110 },
  { time: "May", emission: 130 },
  { time: "Jun", emission: 100 },
];

const yearData = [
  { time: "2022", emission: 1600 },
  { time: "2023", emission: 1450 },
  { time: "2024", emission: 1320 },
  { time: "2025", emission: 1180 },
];

const AnalyticsLineChart = () => {

  const [view, setView] = useState("month");

  const data =
    view === "week"
      ? weekData
      : view === "month"
      ? monthData
      : yearData;

  return (
    <div className="chart-card">

      <div className="chart-header">

        <h2>Emission Trend</h2>

        <div className="chart-buttons">

          <button onClick={() => setView("week")}>Week</button>

          <button onClick={() => setView("month")}>Month</button>

          <button onClick={() => setView("year")}>Year</button>

        </div>

      </div>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="emission"
            stroke="#1976D2"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
};

export default AnalyticsLineChart;