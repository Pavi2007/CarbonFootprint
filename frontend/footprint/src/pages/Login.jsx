import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        email: "",
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

        const response = await loginUser(formData);

        alert(response.data.message);

        if (response.data.message === "Login Successful") {

            localStorage.setItem("token", response.data.token);

            localStorage.setItem("role", response.data.role);
            localStorage.setItem("name", response.data.name);

            if (response.data.role === "ADMIN") {

                navigate("/admin/dashboard");

            } else {

                navigate("/dashboard");

            }

        } else if (response.data.message === "User not found") {

            alert("User not found. Please Register First.");

            navigate("/register");

        } else if (response.data.message === "Invalid Password") {

            alert("Invalid Password");

        }

    } catch (error) {

        console.log(error);

        alert("Login Failed");

    }

};

    return (

        <div className="login-container">

            {/* Left Panel */}

            <div className="left-panel">

                <div className="overlay">

                    <h1>Carbon Footprint Tracker</h1>

                    <p>
                        Track your daily carbon footprint and build a greener tomorrow.
                    </p>

                </div>

            </div>

            {/* Right Panel */}

            <div className="right-panel">

                <div className="login-card">

                    <div className="logo">
                        🌿
                    </div>

                    <h2>Welcome Back</h2>

                    <p className="subtitle">
                        Sign in to continue
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>
                        <div className="forgot-password">

    <Link to="/forgot-password">

        Forgot Password?

    </Link>

</div>

                        <button
                            type="submit"
                            className="login-btn"
                        >

                            Login

                        </button>

                    </form>

                    <p className="register-text">

                        Don't have an account?

                        <Link to="/register">

                            Register

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;