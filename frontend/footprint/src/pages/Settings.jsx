import "./Settings.css";
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  FaUserCircle,
  FaLeaf,
  FaCamera,
  FaSave,
} from "react-icons/fa";

import {
  getProfile,
  updateProfile,
} from "../services/authService";

const Settings = () => {
  
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();
      setProfile(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateProfile(profile);
      alert("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <>
      <Sidebar />
      <Navbar />

      <div className="settings-page">

        <div className="settings-banner"></div>

        <div className="settings-container">

          {/* Left Card */}

          <div className="profile-card">

            <div className="profile-image">
              <FaUserCircle />
            </div>

            <button className="change-photo">
              <FaCamera />
              Change Photo
            </button>

            <h2>{profile.name}</h2>

            <p>{profile.email}</p>

            <div className="profile-info">

              

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

          {/* Right Card */}

          <div className="settings-card">

            <h2>
              <FaLeaf />
              Account Settings
            </h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Name</label>

                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  value={profile.email}
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>

                <input
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Age</label>

                <input
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Gender</label>

                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                >
                 
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

            </div>

            <button
              className="save-btn"
              onClick={handleSave}
            >
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