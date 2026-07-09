import "./Dashboard.css";
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import CarbonPieChart from "../components/PieChart";
import CarbonLineChart from "../components/LineChart";
import GoalProgress from "../components/GoalProgress";
import CarbonInsights from "../components/CarbonInsights";

import { getDashboard } from "../services/authService";

import {
  FaClipboardList,
  FaLeaf,
  FaStar,
  FaBullseye,
} from "react-icons/fa";

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({
    totalActivities: 0,
    totalEmission: 0,
    carEmission: 0,
    busEmission: 0,
    trainEmission: 0,
    flightEmission: 0,
    electricityEmission: 0,
    foodEmission: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const response = await getDashboard();

        setDashboardData(response.data);

      } catch (error) {

        console.error("Dashboard Error:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchDashboard();

  }, []);

  // Temporary calculation until backend provides these values
  const carbonScore = Math.max(
    0,
    Math.round(100 - dashboardData.totalEmission / 10)
  );

  const goalCompletion = Math.min(
    100,
    carbonScore
  );

  if (loading) {

    return (
      <>
        <Sidebar />
        <Navbar />

        <main className="dashboard">

          <h2>Loading Dashboard...</h2>

        </main>
      </>
    );

  }

  return (
    <>
      <Sidebar />
      <Navbar />

      <main className="dashboard">

        {/* Welcome */}

        <section className="welcome-section">

          <h1>Welcome Back 👋</h1>

          <p>
            Track your carbon footprint and achieve your sustainability goals.
          </p>

        </section>

        {/* Cards */}

        <section className="cards-grid">

          <DashboardCard
            title="Activities"
            value={dashboardData.totalActivities}
            icon={<FaClipboardList />}
            color="#1976D2"
          />

          <DashboardCard
            title="CO₂ Emission"
            value={`${dashboardData.totalEmission.toFixed(2)} kg`}
            icon={<FaLeaf />}
            color="#2E7D32"
          />

          <DashboardCard
            title="Carbon Score"
            value={carbonScore}
            icon={<FaStar />}
            color="#F9A825"
          />

          <DashboardCard
            title="Goal Completion"
            value={`${goalCompletion}%`}
            icon={<FaBullseye />}
            color="#D32F2F"
          />

        </section>

        {/* Charts */}

        <div className="charts-container">

          <div className="pie-box">

            <CarbonPieChart dashboardData={dashboardData} />

          </div>

          <div className="line-box">

            <CarbonLineChart dashboardData={dashboardData} />

          </div>

        </div>

        {/* Goal */}

        <div className="goal-box">

          <GoalProgress
            progress={goalCompletion}
          />

        </div>

        {/* Insights */}

        <CarbonInsights
          dashboardData={dashboardData}
        />

      </main>
    </>
  );
};

export default Dashboard;