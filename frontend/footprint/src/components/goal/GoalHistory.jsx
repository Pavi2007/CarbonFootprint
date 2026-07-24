import React from "react";

function GoalHistory({ goals, onEdit }) {

  const historyGoals = goals.filter(
    (goal) =>
      goal.status === "COMPLETED" ||
      goal.status === "FAILED" ||
      goal.status === "EXPIRED"
  );

  return (
    <div className="goal-history">

      <div className="section-header">
        <h2>📜 Goal History</h2>
      </div>

      {historyGoals.length === 0 ? (

        <div className="empty-card">
          <p>No completed or failed goals found.</p>
        </div>

      ) : (

        <table className="history-table">

          <thead>

            <tr>
              <th>Goal Name</th>
              <th>Target</th>
              <th>Reduction</th>
              <th>Status</th>
              <th>Completed On</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {historyGoals.map((goal) => (

              <tr key={goal.id}>

                <td>{goal.goalName}</td>

                <td>{goal.targetEmission} kg</td>

                <td>{goal.targetReductionPercentage}%</td>

                <td>

                  <span
                    className={`status-badge ${goal.status.toLowerCase()}`}
                  >
                    {goal.status}
                  </span>

                </td>

                <td>
                  {goal.completedDate || "-"}
                </td>

                <td>

                  <button
                    className="view-btn"
                    onClick={() => onEdit(goal)}
                  >
                    👁 View
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

export default GoalHistory;