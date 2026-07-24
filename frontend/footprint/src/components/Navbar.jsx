import "./Navbar.css";
import {
  FaBell,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";

import { useState, useEffect } from "react";

import NotificationPanel from "./NotificationPanel";

import { getUnreadCount } from "../services/notificationService";
import { getDashboard } from "../services/dashboardService";

const Navbar = () => {

  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const userName = localStorage.getItem("name");
  const [dashboard, setDashboard] = useState({
    carbonScore: 0,
  });

  useEffect(() => {
    loadUnreadCount();
    loadDashboard();
  }, []);

  const loadUnreadCount = async () => {
    try {
      const count = await getUnreadCount();
      setUnreadCount(count);
    } catch (err) {
      console.log(err);
    }
  };

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar">

      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      <div className="navbar-right">

        <div className="score-card">
          🌿 Carbon Score :
          <span>{dashboard.carbonScore}</span>
        </div>

        <div
          className="notification-container"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <FaBell className="nav-icon" />

          {unreadCount > 0 && (
            <span className="notification-badge">
              {unreadCount}
            </span>
          )}
        </div>

        {showNotifications && (
          <NotificationPanel
            close={() => setShowNotifications(false)}
            refreshUnread={loadUnreadCount}
          />
        )}

        <div className="profile-section">
    <FaUserCircle className="profile" />

    <span className="user-name">
        {userName || "User"}
    </span>
</div>

      </div>

    </nav>
  );
};

export default Navbar;