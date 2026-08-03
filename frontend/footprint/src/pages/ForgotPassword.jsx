import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";
import "./Auth.css";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {

            alert("Passwords do not match");

            return;

        }

        try {

            const message = await forgotPassword(formData);

            alert(message);

            navigate("/");

        }

        catch (err) {

            alert(
                err.response?.data || "Unable to update password."
            );

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>Forgot Password</h2>

                <p className="auth-subtitle">
                    Reset your password using your registered email.
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Update Password
                    </button>

                </form>

                <div className="auth-footer">

                    <Link to="/">
                        Back to Login
                    </Link>

                </div>

            </div>

        </div>

    );

};

export default ForgotPassword;