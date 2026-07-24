import { useEffect, useState } from "react";
import "../css/Admin.css";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

import {
    getWeeklyTrend,
    getMonthlyTrend,
    getYearlyTrend
} from "../services/adminService";

const AdminLineChart = () => {

    const [view, setView] = useState("month");
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        loadTrend();
    }, [view]);

    const loadTrend = async () => {

        try {

            let response;

            if (view === "week") {
                response = await getWeeklyTrend();
            }
            else if (view === "month") {
                response = await getMonthlyTrend();
            }
            else {
                response = await getYearlyTrend();
            }

            setChartData(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="line-card">

            <div className="chart-header">

                <h2>Overall Carbon Emission Trend</h2>

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

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <AreaChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 0
                    }}
                >

                    <defs>

                        <linearGradient
                            id="colorEmission"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="5%"
                                stopColor="#c2617b"
                                stopOpacity={0.8}
                            />

                            <stop
                                offset="95%"
                                stopColor="#754d4d"
                                stopOpacity={0.05}
                            />

                        </linearGradient>

                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="time"
                        tick={{ fontSize: 12 }}
                    />

                    <YAxis
                        tick={{ fontSize: 12 }}
                    />

                    <Tooltip
                        formatter={(value) => [
                            `${Number(value).toFixed(2)} kg CO₂`,
                            "Emission"
                        ]}
                    />

                    <Area
                        type="monotone"
                        dataKey="emission"
                        stroke="#cd3f62"
                        strokeWidth={3}
                        fill="url(#colorEmission)"
                        activeDot={{ r: 6 }}
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>

    );

};

export default AdminLineChart;