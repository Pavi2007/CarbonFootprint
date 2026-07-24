import { useEffect, useState } from "react";

import "../css/Admin.css";

import {

    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer

} from "recharts";

import { getBreakdown }

from "../services/adminService";

const COLORS=[

    "#ed497d",
    "#0e79f3",
    "#f30e0e",
    "#FFC107",
    "#7B1FA2"


];

const AdminPieChart=()=>{

    const[data,setData]=useState([]);

    useEffect(()=>{

        loadData();

    },[]);

    const loadData=async()=>{

        try{

            const response=await getBreakdown();

            const chartData=response.data.map(item=>({

                name:item.category,

                value:item.emission

            }));

            setData(chartData);

        }

        catch(error){

            console.log(error);

        }

    };

    return(

        <div className="chart-card">

            <h2>Emission By Category</h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <PieChart>

    <Pie
    data={data}
    dataKey="value"
    nameKey="name"
    innerRadius={70}
    outerRadius={110}
    paddingAngle={2}
    label={false}
    labelLine={false}
>
    {data.map((entry, index) => (
        <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
        />
    ))}
</Pie>

<Tooltip
    formatter={(value) => [
        `${Number(value).toFixed(2)} kg CO₂`,
        "Emission"
    ]}
/>

<Legend
    verticalAlign="bottom"
    align="center"
    iconType="circle"
/>

</PieChart>

            </ResponsiveContainer>

        </div>

    );

};

export default AdminPieChart;