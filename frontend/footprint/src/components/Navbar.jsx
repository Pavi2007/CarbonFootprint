import "./Navbar.css";
import {
  FaBell,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";

const Navbar = () => {
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
          <span>82</span>
        </div>

        <FaBell className="nav-icon"/>

        <FaUserCircle className="profile"/>

      </div>

    </nav>
  );
};

export default Navbar;