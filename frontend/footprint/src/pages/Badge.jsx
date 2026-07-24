import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Badge.css";

function Badge() {
    return (
        <div className="dashboard-container">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="badge-container">

                    <h1>🏅 Badges</h1>

                    {/* Badge content goes here */}

                </div>

            </div>

        </div>
    );
}

export default Badge;