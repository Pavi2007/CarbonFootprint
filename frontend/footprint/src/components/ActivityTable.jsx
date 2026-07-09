import "./ActivityTable.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function ActivityTable({ activities, onEdit, onDelete }) {

    return (

        <div className="activity-table-card">

            <h2>Recent Activities</h2>

            {activities.length === 0 ? (

                <div className="empty-state">

                    🌿 No activities found.

                </div>

            ) : (

                <table className="activity-table">

                    <thead>

                        <tr>

                            <th>Date</th>
                            <th>Activity</th>
                            <th>Category</th>
                            <th>Value</th>
                            <th>Emission</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {activities.map((activity) => (

                            <tr key={activity.id}>

                                <td>{activity.activityDate}</td>

                                <td>{activity.activityType}</td>

                                <td>

                                    <span
                                        className={`badge ${activity.activityType.toLowerCase()}`}
                                    >

                                        {activity.category}

                                    </span>

                                </td>

                                <td>

                                    {activity.value} {activity.unit}

                                </td>

                                <td>

                                    {activity.emission.toFixed(2)} kg

                                </td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() => onEdit(activity)}
                                    >

                                        <FaEdit />

                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => onDelete(activity.id)}
                                    >

                                        <FaTrash />

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>

    );

}

export default ActivityTable;