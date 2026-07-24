import "../css/AdminSidebar.css";

import { NavLink, useNavigate } from "react-router-dom";

import {
    FaLeaf,
    FaHome,
    FaUsers,
    FaClipboardList,
    FaGlobe,
    FaBuilding,
    FaAward,
    FaChartBar,
    FaFileAlt,
    FaSignOutAlt
} from "react-icons/fa";

const AdminSidebar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/", { replace: true });

    };

    return (

        <div className="sidebar">

            <div className="sidebar-top">

                {/* Logo */}

                <div className="logo">

    <div className="logo-circle">

        <FaLeaf className="leaf-icon"/>

    </div>

    <div className="logo-text">

        <h2>CarbonTrack</h2>

        <span>Admin Panel</span>

    </div>

</div>

                {/* Menu */}

                <ul className="menu">

                    <NavLink
                        to="/admin/dashboard"
                        className="menu-link"
                    >
                        <li>

                            <FaHome/>

                            Dashboard

                        </li>
                    </NavLink>

                    <NavLink
                        to="/admin/users"
                        className="menu-link"
                    >
                        <li>

                            <FaUsers/>

                            User Management

                        </li>
                    </NavLink>

                    <NavLink
                        to="/admin/activity"
                        className="menu-link"
                    >
                        <li>

                            <FaClipboardList/>

                            Activity Monitoring

                        </li>
                    </NavLink>

                    <NavLink
                        to="/admin/emission"
                        className="menu-link"
                    >
                        <li>

                            <FaGlobe/>

                            Emission Factors

                        </li>
                    </NavLink>

                    <NavLink
                        to="/admin/organization"
                        className="menu-link"
                    >
                        <li>

                            <FaBuilding/>

                            Organization

                        </li>
                    </NavLink>

                    <NavLink
                        to="/admin/badges"
                        className="menu-link"
                    >
                        <li>

                            <FaAward/>

                            Badge Management

                        </li>
                    </NavLink>

                    <NavLink
                        to="/admin/reports"
                        className="menu-link"
                    >
                        <li>

                            <FaFileAlt/>

                            Reports

                        </li>
                    </NavLink>

                    <NavLink
                        to="/admin/analytics"
                        className="menu-link"
                    >
                        <li>

                            <FaChartBar/>

                            Analytics

                        </li>
                    </NavLink>

                </ul>

            </div>

            {/* Logout */}

            <button
                className="logout-btn"
                onClick={handleLogout}
            >

                <FaSignOutAlt/>

                Logout

            </button>

        </div>

    );

};

export default AdminSidebar;