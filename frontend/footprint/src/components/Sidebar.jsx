import "./Sidebar.css";

import { NavLink } from "react-router-dom";
import {  useNavigate } from "react-router-dom";
import { FaAward } from "react-icons/fa";
import {
  FaLeaf,
  FaHome,
  FaClipboardList,
  FaChartPie,
  FaHistory,
  FaBullseye,
  FaLightbulb,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

const Sidebar = () => {
  
  const navigate = useNavigate();

    const handleLogout = () => {

        // Remove JWT Token
        localStorage.removeItem("token");

        // If you store user details
        localStorage.removeItem("user");

        // Redirect to Home Page
        navigate("/", { replace: true });

    };

  return (
    <div className="sidebar">

      <div className="sidebar-top">

        {/* Logo */}

        <div className="logo">
    <div className="logo-circle">
        <FaLeaf className="leaf-icon" />
    </div>

    <h2>CarbonTrack</h2>
</div>

        {/* Menu */}

        <ul className="menu">

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

          <NavLink to="/goal" className="menu-link">
            <li>
              <FaBullseye />
              Sustainability Goals
            </li>
          </NavLink>

          <li>
          <NavLink to="/badges">
            <FaAward className="menu-icon" />
            <span>Badges</span>
          </NavLink>
        </li>
          

          <NavLink to="/recommendations" className="menu-link">
            <li>
              <FaLightbulb />
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

      </div>

      {/* Logout */}

      <button
    className="logout-btn"
    onClick={handleLogout}
>

    <FaSignOutAlt />

    Logout

</button>

    </div>
  );
};

export default Sidebar;