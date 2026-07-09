import "./Settings.css";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import {
  FaUserCircle,
  FaLeaf,
  FaCamera,
  FaSave,
} from "react-icons/fa";

const Settings = () => {
  return (
    <>
      <Sidebar />
      <Navbar />

      <div className="settings-page">

        {/* Banner */}

        <div className="settings-banner"></div>

        <div className="settings-container">

          {/* LEFT PROFILE CARD */}

          <div className="profile-card">

            <div className="profile-image">

              <FaUserCircle />

            </div>

            <button className="change-photo">

              <FaCamera />

              Change Photo

            </button>

            <h2>Pavithra K</h2>

            <p>pavithra@gmail.com</p>

            <div className="profile-info">

              <div>

                <span>Carbon Score</span>

                <h3>82</h3>

              </div>

              <div>

                <span>Eco Level</span>

                <h3>🌿 Green Explorer</h3>

              </div>

              <div>

                <span>Member Since</span>

                <h3>July 2026</h3>

              </div>

            </div>

          </div>

          {/* RIGHT SETTINGS CARD */}

          <div className="settings-card">

            <h2>

              <FaLeaf />

              Account Settings

            </h2>

            <div className="form-grid">

              <div className="form-group">

                <label>First Name</label>

                <input
                  type="text"
                  placeholder="Pavithra"
                />

              </div>

              <div className="form-group">

                <label>Last Name</label>

                <input
                  type="text"
                  placeholder="K"
                />

              </div>

              <div className="form-group">

                <label>Email</label>

                <input
                  type="email"
                  placeholder="pavithra@gmail.com"
                />

              </div>

              <div className="form-group">

                <label>Phone Number</label>

                <input
                  type="text"
                  placeholder="+91 9876543210"
                />

              </div>

              <div className="form-group">

                <label>Gender</label>

                <select>

                  <option>Female</option>

                  <option>Male</option>

                  <option>Other</option>

                </select>

              </div>

              <div className="form-group">

                <label>Country</label>

                <select>

                  <option>India</option>

                  <option>USA</option>

                  <option>Canada</option>

                </select>

              </div>

            </div>

            {/* Sustainability */}

            <div className="preferences">

              <h3>Sustainability Preference</h3>

              <select>

                <option>Public Transport</option>

                <option>Car</option>

                <option>Bike</option>

                <option>Walk</option>

                <option>Cycle</option>

              </select>

            </div>

            {/* Notifications */}

            <div className="notifications">

              <h3>Notifications</h3>

              <label>

                <input type="checkbox" defaultChecked />

                Weekly Carbon Report

              </label>

              <label>

                <input type="checkbox" defaultChecked />

                Eco Tips

              </label>

              <label>

                <input type="checkbox" />

                Monthly Sustainability Report

              </label>

            </div>

            {/* Theme */}

            <div className="theme">

<h3>Theme</h3>

<label>
    <input
        type="radio"
        name="theme"
        defaultChecked
    />
    Light
</label>

<label>
    <input
        type="radio"
        name="theme"
    />
    Dark
</label>

</div>

            <button className="save-btn">

              <FaSave />

              Save Changes

            </button>

          </div>

        </div>

      </div>

    </>
  );
};

export default Settings;