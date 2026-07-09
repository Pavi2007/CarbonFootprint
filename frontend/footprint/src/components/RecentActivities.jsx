import "./RecentActivities.css";

function RecentActivities({ activities }) {

    if (!activities) {
        return <h3>Loading Activities...</h3>;
    }

    if (activities.length === 0) {
        return (
            <div className="recent-card">
                <h2>Recent Activities</h2>
                <p>No activities found.</p>
            </div>
        );
    }

    return (

        <div className="recent-card">

            <h2>Recent Activities</h2>

            <table>

                <thead>

                    <tr>

                        <th>Activity</th>

                        <th>Value</th>

                        <th>Unit</th>

                        <th>Emission</th>

                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>

                    {activities.map((activity) => (

                        <tr key={activity.id}>

                            <td>{activity.activityType}</td>

                            <td>{activity.value}</td>

                            <td>{activity.unit}</td>

                            <td>{activity.emission} kg</td>

                            <td>{activity.activityDate}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default RecentActivities;