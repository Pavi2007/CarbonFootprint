import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [

{ category:"Transport", emission:180 },

{ category:"Electricity", emission:130 },

{ category:"Food", emission:90 },

{ category:"Shopping", emission:70 }

];

const AnalyticsBarChart = () => {

  return (

    <div className="chart-card">

      <h2>Emission Comparison</h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis dataKey="category"/>

          <YAxis/>

          <Tooltip/>

          <Bar
            dataKey="emission"
            fill="#43A047"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

};

export default AnalyticsBarChart;