import "./Dashboard.css";
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import CarbonPieChart from "../components/PieChart";
import CarbonLineChart from "../components/LineChart";
import EmissionBreakdown from "../components/EmissionBreakdown";

import { getDashboard } from "../services/authService";

import {
  FaClipboardList,
  FaLeaf,
  FaCalendarDay,
  FaStar,
} from "react-icons/fa";

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({

    totalActivities: 0,
    totalEmission: 0,
    todayEmission: 0,
    monthlyEmission: 0,
    carbonScore: 0,

  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const response = await getDashboard();

      console.log(response.data);

      setDashboardData(response.data);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

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

        {/* Dashboard Cards */}

        <section className="cards-grid">

          <DashboardCard
            title="Activities"
            value={dashboardData.totalActivities}
            icon={<FaClipboardList />}
            color="#9fc5eb"
          />

          <DashboardCard
            title="Total Emission"
            value={`${(dashboardData.totalEmission ?? 0).toFixed(2)} kg`}
            icon={<FaLeaf />}
            color="#7df683"
          />

          <DashboardCard
            title="Today's Emission"
            value={`${(dashboardData.todayEmission ?? 0).toFixed(2)} kg`}
            icon={<FaCalendarDay />}
            color="#e6b3cd"
          />

          <DashboardCard
            title="Carbon Score"
            value={dashboardData.carbonScore ?? 0}
            icon={<FaStar />}
            color="#2ee4ed"
          />

        </section>

        {/* Charts */}

        <div className="charts-container">

          <div className="pie-box">

            <CarbonPieChart />

          </div>

          <div className="line-box">

            <CarbonLineChart />

          </div>

        </div>

        {/* Breakdown */}

        <EmissionBreakdown />

      </main>

    </>

  );

};

export default Dashboard;