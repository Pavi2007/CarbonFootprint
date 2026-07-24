import { useEffect, useState } from "react";
import "./PieChart.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { getBreakdown } from "../services/authService";

const COLORS = [
  "#d5760a",
  "#034fa6",
  "#51e349",
  "#ca4c4c",
  "#d88d1d"
];

const CarbonPieChart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const response = await getBreakdown();

      const chartData = response.data.map(item => ({

        name: item.category,

        value: item.emission,

      }));

      setData(chartData);

    }

    catch(error){

      console.log(error);

    }

  };

  return (

    <div className="chart-card">

      <h2>Carbon Emission Distribution</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={95}
            innerRadius={50}
            label
          >

            {

              data.map((entry,index)=>(

                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />

              ))

            }

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

};

export default CarbonPieChart;