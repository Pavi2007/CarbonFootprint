import React from "react";

function ActiveGoals({ goals, onEdit, onDelete }) {

  const activeGoals = goals.filter(
    (goal) => goal.status === "ACTIVE"
  );

  return (
    <div className="active-goals">

      <div className="section-header">
        <h2>📋 Active Goals</h2>
      </div>

      {activeGoals.length === 0 ? (

        <div className="empty-card">
          <p>No Active Goals Available.</p>
        </div>

      ) : (

        <div className="goal-grid">

          {activeGoals.map((goal) => (

            <div className="goal-card" key={goal.id}>

              <div className="goal-card-header">

                <div>

                  <h3>{goal.goalName}</h3>

                  <span className="status-badge active">
                    {goal.status}
                  </span>

                </div>

              </div>

              <div className="goal-card-body">

                <div className="goal-detail">
                  <span>🎯 Target Emission</span>
                  <strong>{goal.targetEmission} kg CO₂</strong>
                </div>

                <div className="goal-detail">
                  <span>📉 Reduction</span>
                  <strong>{goal.targetReductionPercentage}%</strong>
                </div>

                <div className="goal-detail">
                  <span>📅 Start Date</span>
                  <strong>{goal.startDate}</strong>
                </div>

                <div className="goal-detail">
                  <span>🏁 End Date</span>
                  <strong>{goal.endDate}</strong>
                </div>

                <div className="goal-progress">

                  <h4>📊 Progress</h4>

                  <div className="progress-stats">

                    <div className="progress-box">
                      <span>Current</span>
                      <strong>
                        {goal.progress?.currentEmission ?? 0} kg
                      </strong>
                    </div>

                    <div className="progress-box">
                      <span>Remaining</span>
                      <strong>
                        {goal.progress?.remainingEmission ?? 0} kg
                      </strong>
                    </div>

                    <div className="progress-box">
                      <span>Days Left</span>
                      <strong>
                        {goal.progress?.daysRemaining ?? 0}
                      </strong>
                    </div>

                  </div>

                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${Math.min(
                          goal.progress?.progressPercentage || 0,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                  <div className="progress-text">
                    {(goal.progress?.progressPercentage ?? 0).toFixed(1)}%
                    Completed
                  </div>

                </div>

              </div>

              <div className="goal-card-footer">

                <button
                  className="edit-btn"
                  onClick={() => onEdit(goal)}
                >
                  ✏ Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => onDelete(goal.id)}
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ActiveGoals;