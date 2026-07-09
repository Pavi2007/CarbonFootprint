import "./PieChart.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#2E7D32",
  "#1976D2",
  "#FF9800",
  "#E53935",
  "#8E24AA",
  "#26A69A",
];

const CarbonPieChart = ({ dashboardData }) => {

const data = [
  {
    name: "Car",
    value: dashboardData?.carEmission || 0,
  },
  {
    name: "Bus",
    value: dashboardData?.busEmission || 0,
  },
  {
    name: "Train",
    value: dashboardData?.trainEmission || 0,
  },
  {
    name: "Flight",
    value: dashboardData?.flightEmission || 0,
  },
  {
    name: "Electricity",
    value: dashboardData?.electricityEmission || 0,
  },
  {
    name: "Food",
    value: dashboardData?.foodEmission || 0,
  },
];

  return (
    <div className="chart-card">

      <h2>Carbon Emission Distribution</h2>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            innerRadius={45}
            paddingAngle={3}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend verticalAlign="bottom" height={36} />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
};

export default CarbonPieChart;