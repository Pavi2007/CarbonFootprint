import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import LeaderboardTable from "../components/LeaderboardTable";
import { getLeaderboard } from "../services/leaderboardService";
import "../pages/leaderboard.css";

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const data = await getLeaderboard();
            setLeaderboard(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="leaderboard-layout">

            <Sidebar />

            <div className="leaderboard-main">

                <Navbar />

                <div className="leaderboard-content">

                    <h2>🏆 Community Leaderboard</h2>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <LeaderboardTable leaderboard={leaderboard} />
                    )}

                </div>

            </div>

        </div>
    );
}

export default Leaderboard;