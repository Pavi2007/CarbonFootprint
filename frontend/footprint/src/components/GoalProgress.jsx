import "./GoalProgress.css";

const GoalProgress = () => {
  return (
    <div className="goal-card">

      <h2>Monthly Sustainability Goals</h2>

      <div className="goal">

        <p>Transport</p>

        <progress value="80" max="100"></progress>

        <span>80%</span>

      </div>

      <div className="goal">

        <p>Electricity</p>

        <progress value="60" max="100"></progress>

        <span>60%</span>

      </div>

      <div className="goal">

        <p>Food</p>

        <progress value="90" max="100"></progress>

        <span>90%</span>

      </div>

    </div>
  );
};

export default GoalProgress;