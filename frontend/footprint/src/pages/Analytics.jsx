import "./Analytics.css";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import AnalyticsPieChart from "../components/AnalyticsPieChart";
import AnalyticsLineChart from "../components/AnalyticsLineChart";
import AnalyticsBarChart from "../components/AnalyticsBarChart";
import EmissionBreakdown from "../components/EmissionBreakdown";

import { FaLeaf, FaChartLine, FaChartPie } from "react-icons/fa";

const Analytics = () => {

    return (

        <>
            <Sidebar />

            <Navbar />

            <div className="analytics-page">

                <div className="analytics-header">

                    <div>

                        <h1>Analytics Dashboard</h1>

                        <p>
                            Analyze your carbon footprint trends and monitor sustainability performance.
                        </p>

                    </div>

                    <button className="report-btn">
                        Download Report
                    </button>

                </div>

                {/* Summary */}

                <div className="analytics-summary">

                    <div className="summary-card">

                        <FaLeaf className="summary-icon green"/>

                        <h4>Total Emission</h4>

                        <h2>425 kg CO₂</h2>

                    </div>

                    <div className="summary-card">

                        <FaChartLine className="summary-icon blue"/>

                        <h4>Average / Week</h4>

                        <h2>61 kg</h2>

                    </div>

                    <div className="summary-card">

                        <FaChartPie className="summary-icon orange"/>

                        <h4>Best Category</h4>

                        <h2>Electricity</h2>

                    </div>

                </div>

                {/* Charts */}

                <div className="analytics-charts">

                    <div className="left-chart">

                        <AnalyticsPieChart/>

                    </div>

                    <div className="right-chart">

                        <AnalyticsLineChart/>

                    </div>

                </div>

                {/* Bottom */}

                <div className="analytics-bottom">

                    <div className="bar-card">

                        <AnalyticsBarChart/>

                    </div>

                    <div className="breakdown-card">

                        <EmissionBreakdown/>

                    </div>

                </div>

            </div>

        </>

    );

};

export default Analytics;