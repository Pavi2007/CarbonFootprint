import React from "react";

function GoalForm({
  goal,
  setGoal,
  editing,
  emptyGoal,
  onSubmit,
  onCancel,
}) {

  const handleChange = (e) => {
    setGoal({
      ...goal,
      [e.target.name]: e.target.value,
    });
  };

  return (

    <div className="goal-form card">

      <div className="form-header">

        <h2>
          {editing ? "✏ Update Goal" : "➕ Create New Goal"}
        </h2>

        <button
          className="close-btn"
          onClick={onCancel}
          type="button"
        >
          ✖
        </button>

      </div>

      <form onSubmit={onSubmit}>

        <div className="form-group">

          <label>Goal Name</label>

          <input
            type="text"
            name="goalName"
            value={goal.goalName}
            onChange={handleChange}
            placeholder="Enter Goal Name"
            required
          />

        </div>

        <div className="form-group">

          <label>Target Emission (kg CO₂)</label>

          <input
            type="number"
            name="targetEmission"
            value={goal.targetEmission}
            onChange={handleChange}
            placeholder="Enter Target Emission"
            required
          />

        </div>

        <div className="form-group">

          <label>Reduction Target (%)</label>

          <input
            type="number"
            name="targetReductionPercentage"
            value={goal.targetReductionPercentage}
            onChange={handleChange}
            placeholder="Enter Reduction Percentage"
            required
          />

        </div>

        <div className="form-row">

          <div className="form-group">

            <label>Start Date</label>

            <input
              type="date"
              name="startDate"
              value={goal.startDate}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>End Date</label>

            <input
              type="date"
              name="endDate"
              value={goal.endDate}
              onChange={handleChange}
              required
            />

          </div>

        </div>

        <div className="button-group">

          <button
            type="button"
            className="clear-btn"
            onClick={() => {
              setGoal(emptyGoal);
            }}
          >
            Clear
          </button>

          <button
            type="submit"
            className="save-btn"
          >
            {editing ? "Update Goal" : "Create Goal"}
          </button>

        </div>

      </form>

    </div>

  );

}

export default GoalForm;