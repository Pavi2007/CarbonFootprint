import React from "react";

function GoalSummary({ summary }) {

  return (

    <div className="goal-summary">

      <div className="summary-card total">

        <div className="summary-icon">🎯</div>

        <div className="summary-content">
          <h4>Total Goals</h4>
          <h2>{summary.totalGoals}</h2>
        </div>

      </div>

      <div className="summary-card active">

        <div className="summary-icon">🟢</div>

        <div className="summary-content">
          <h4>Active Goals</h4>
          <h2>{summary.activeGoals}</h2>
        </div>

      </div>

      <div className="summary-card completed">

        <div className="summary-icon">✅</div>

        <div className="summary-content">
          <h4>Completed</h4>
          <h2>{summary.completedGoals}</h2>
        </div>

      </div>

      <div className="summary-card failed">

        <div className="summary-icon">❌</div>

        <div className="summary-content">
          <h4>Failed</h4>
          <h2>{summary.failedGoals}</h2>
        </div>

      </div>

    </div>

  );

}

export default GoalSummary;