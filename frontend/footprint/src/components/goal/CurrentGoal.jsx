import React from "react";

function CurrentGoal({ goal, progress, onEdit }) {

  if (!goal || !goal.id) {
    return (
      <div className="current-goal card">
        <h2>🎯 Goal Details</h2>
        <p>Select an active goal to view its details.</p>
      </div>
    );
  }

  return (
    <div className="current-goal card">

      <div className="card-header">

        <h2>🎯 Goal Details</h2>

        <span className={`status-badge ${goal.status.toLowerCase()}`}>
          {goal.status}
        </span>

      </div>

      <div className="goal-info">

        <div className="info-item">
          <label>Goal Name</label>
          <p>{goal.goalName}</p>
        </div>

        <div className="info-item">
          <label>Target Emission</label>
          <p>{goal.targetEmission} kg CO₂</p>
        </div>

        <div className="info-item">
          <label>Reduction Target</label>
          <p>{goal.targetReductionPercentage}%</p>
        </div>

        <div className="info-item">
          <label>Start Date</label>
          <p>{goal.startDate}</p>
        </div>

        <div className="info-item">
          <label>End Date</label>
          <p>{goal.endDate}</p>
        </div>

      </div>

      {progress && (

        <>
          <h3 className="progress-title">
            📊 Goal Progress
          </h3>

          <div className="progress-details">

            <div>
              <strong>Current</strong>
              <p>{progress.currentEmission} kg</p>
            </div>

            <div>
              <strong>Remaining</strong>
              <p>{progress.remainingEmission} kg</p>
            </div>

            <div>
              <strong>Days Left</strong>
              <p>{progress.daysRemaining}</p>
            </div>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${Math.min(progress.progressPercentage, 100)}%`,
              }}
            />

          </div>

          <div className="progress-text">
            {progress.progressPercentage.toFixed(1)}% Completed
          </div>

        </>

      )}

      <div className="goal-actions">

        <button
          className="edit-btn"
          onClick={() => onEdit(goal)}
        >
          ✏ Edit Goal
        </button>

      </div>

    </div>
  );
}

export default CurrentGoal;