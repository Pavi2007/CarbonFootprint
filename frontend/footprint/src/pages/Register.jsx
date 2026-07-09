import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useState } from "react";
import { registerUser } from "../services/authService";
function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        phoneNumber: "",
        gender: "",
        age: "",
        password: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await registerUser(formData);

            alert(response.data.message);

            if (response.data.message === "Registration Successful") {

                navigate("/");

            }

        } catch (error) {

            console.log(error);

            alert("Registration Failed");

        }

    };

    return (

        <div className="register-container">

            {/* Left Panel */}

            <div className="register-left">

                <div className="overlay">

                    <h1>Carbon Footprint Tracker</h1>

                    <p>
                        Join the platform and begin monitoring your carbon footprint with intelligent sustainability insights.
                    </p>

                </div>

            </div>

            {/* Right Panel */}

            <div className="register-right">

                <div className="register-card">

                    <div className="logo">
                        🌿
                    </div>

                    <h2>Create Account</h2>

                    <p className="subtitle">
                        Register to continue
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="input-row">

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="input-row">

                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Mobile Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >

                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>

                            </select>

                        </div>

                        <div className="input-row">

                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="register-btn"
                        >

                            Create Account

                        </button>

                    </form>

                    <p className="login-link">

                        Already have an account?

                        <Link to="/">
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Register;