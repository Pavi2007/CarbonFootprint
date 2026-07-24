import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CategoryBarChart from "../components/CategoryBarChart";
import MonthlyComparison from "../components/MonthlyComparison";
import TopContributors from "../components/TopContributors";
import SmartInsights from "../components/SmartInsights";
import Timeline from "../components/Timeline";
import TrendSummaryCards from "../components/TrendSummaryCards";
import { getAnalyticsSummary } from "../services/authService";
import "./Analytics.css";

const Analytics = () => {

    const [period, setPeriod] = useState("monthly");
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        loadSummary();
    }, [period]);

    const loadSummary = async () => {
        try {
            const res = await getAnalyticsSummary(period);
            setSummary(res.data);
        } catch (err) {
            console.error(err);
        }
    };
  return (
    <>
      <Sidebar />
      <Navbar />

      <main className="analytics">

    <div className="analytics-header">

         <h2>📊 Analytics Dashboard</h2>

        <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
        >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
        </select>

    </div>

    <TrendSummaryCards summary={summary} />

    <div className="analytics-grid">

        <div className="analytics-row">

            <CategoryBarChart period={period} />

            <MonthlyComparison period={period} />

        </div>

        <div className="analytics-row">

 <SmartInsights period={period} />
<TopContributors period={period} />


        </div>

<Timeline period={period} />

    </div>

</main>
    </>
  );

};

export default Analytics;