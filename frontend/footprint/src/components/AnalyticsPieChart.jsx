import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Transport", value: 42 },
  { name: "Electricity", value: 28 },
  { name: "Food", value: 18 },
  { name: "Shopping", value: 12 },
];

const COLORS = [
  "#43A047",
  "#1E88E5",
  "#FB8C00",
  "#8E24AA",
];

const AnalyticsPieChart = () => {
  return (
    <div className="chart-card">

      <h2>Emission by Category</h2>

      <ResponsiveContainer width="100%" height={320}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            innerRadius={50}
            paddingAngle={4}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
};

export default AnalyticsPieChart;