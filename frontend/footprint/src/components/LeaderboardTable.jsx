function LeaderboardTable({ leaderboard }) {

    return (

        <div className="leaderboard-container">

            <table className="leaderboard-table">

                <thead>

                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Total CO₂ (kg)</th>
                        <th>Login Streak</th>
                        <th>Activities</th>
                        <th>Goals</th>
                    </tr>

                </thead>

                <tbody>

                    {leaderboard.map((user) => (

                        <tr
                            key={user.rank}
                            className={user.currentUser ? "current-user" : ""}
                        >

                            <td>

                                {user.rank === 1 && "🥇"}
                                {user.rank === 2 && "🥈"}
                                {user.rank === 3 && "🥉"}
                                {user.rank > 3 && user.rank}

                            </td>

                            <td>{user.username}</td>

                            <td>{user.totalEmission.toFixed(2)}</td>

                            <td>{user.loginStreak}</td>

                            <td>{user.activityCount}</td>

                            <td>{user.completedGoals}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default LeaderboardTable;