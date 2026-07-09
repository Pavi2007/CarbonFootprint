import "./Sidebar.css";
import {  NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

import {
  FaHome,
  FaClipboardList,
  FaChartPie,
  FaHistory,
  FaLeaf,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

const Sidebar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {

    const confirmLogout = window.confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    logoutUser();

    navigate("/login");

};

  return (

    <div className="sidebar">

      <div className="logo">

        <div className="logo-circle">

          <FaLeaf />

        </div>

        <h2>CarbonTrack</h2>

      </div>

      <ul className="sidebar-menu">

        <NavLink to="/dashboard" className="menu-link">
          <li>
            <FaHome />
            Dashboard
          </li>
        </NavLink>

        <NavLink to="/activity" className="menu-link">
          <li>
            <FaClipboardList />
            Activity Log
          </li>
        </NavLink>

        <NavLink to="/analytics" className="menu-link">
          <li>
            <FaChartPie />
            Analytics
          </li>
        </NavLink>

        <NavLink to="/history" className="menu-link">
          <li>
            <FaHistory />
            History
          </li>
        </NavLink>

        <NavLink to="/recommendations" className="menu-link">
          <li>
            <FaLeaf />
            Recommendations
          </li>
        </NavLink>

        <NavLink to="/settings" className="menu-link">
          <li>
            <FaCog />
            Settings
          </li>
        </NavLink>

      </ul>

      <li>

    <button
        className="logout-link"
        onClick={handleLogout}
    >

        <FaSignOutAlt />

        <span>Logout</span>

    </button>

</li>

    </div>

  );

};

export default Sidebar;