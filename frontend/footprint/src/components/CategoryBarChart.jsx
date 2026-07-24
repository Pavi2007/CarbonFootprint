import { useEffect, useState } from "react";
import "./CategoryBarChart.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

import { getBreakdown } from "../services/authService";

const COLORS = [
  "#f38864",
  "#1976D2",
  "#65da65",
  "#8E24AA",
  "#c64d69"
];

const CategoryBarChart = ({ period }) => {

  const [data, setData] = useState([]);

  useEffect(() => {

    loadData();

  }, [period]);

  const loadData = async () => {

    try {

      const response = await getBreakdown(period);

      setData(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };
console.log("Selected period:", period);
  return (

    <div className="bar-card">

      <h1 style={{ color: "#2b7030", marginBottom: "20px" }}>
        Emission by Category
      </h1>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <BarChart
          data={data}
          layout="vertical"
        >

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis type="number"/>

          <YAxis
            type="category"
            dataKey="category"
            width={120}
          />

          <Tooltip/>

          <Bar
            dataKey="emission"
            radius={[0,8,8,0]}
          >

            {
              data.map((entry,index)=>(
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))
            }

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>
    

  );

};

export default CategoryBarChart;