import { useEffect, useState } from "react";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import AdminLineChart from "./AdminLineChart";
import AdminPieChart from "./AdminPieChart";

import "../css/Admin.css";

import { getDashboard } from "../services/adminService";

import {
    FaUsers,
    FaClipboardList,
    FaLeaf,
    FaBolt
} from "react-icons/fa";

const AdminDashboard = () => {

    const [dashboard, setDashboard] = useState({

        totalUsers: 0,
        totalActivities: 0,
        totalEmission: 0,
        activeUsers: 0

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getDashboard();

            console.log(response.data);

            setDashboard(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <>
            <AdminSidebar />
            <AdminNavbar />

            <div className="admin-content">

                <h1>Admin Dashboard</h1>

                <p>Welcome to CarbonTrack Admin Panel 👋</p>

                <div className="dashboard-cards">

                    <div className="dashboard-card">

                        <FaUsers className="card-icon" />

                        <h3>Total Users</h3>

                        <h2>{dashboard.totalUsers}</h2>

                    </div>

                    <div className="dashboard-card">

                        <FaClipboardList className="card-icon" />

                        <h3>Total Activities</h3>

                        <h2>{dashboard.totalActivities}</h2>

                    </div>

                    <div className="dashboard-card">

                        <FaLeaf className="card-icon" />

                        <h3>Total Emission</h3>

                        <h2>{dashboard.totalEmission.toFixed(2)} kg</h2>

                    </div>

                    <div className="dashboard-card">

                        <FaBolt className="card-icon" />

                        <h3>Active Users</h3>

                        <h2>{dashboard.activeUsers}</h2>

                    </div>

                </div>
                <div className="admin-chart-grid">

    <AdminLineChart/>

    <AdminPieChart/>

</div>

            </div>

            

        </>

    );

};

export default AdminDashboard;