import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import GoalSummary from "../components/goal/GoalSummary";
import GoalForm from "../components/goal/GoalForm";
import ActiveGoals from "../components/goal/ActiveGoals";
import GoalHistory from "../components/goal/GoalHistory";

import {
  createGoal,
  updateGoal,
  deleteGoal,
  getAllGoals,
  getGoalSummary,
  getGoalProgress
} from "../services/goalService";

import "./Goal.css";

function Goal() {

  const emptyGoal = {
    id: null,
    goalName: "",
    targetEmission: "",
    targetReductionPercentage: "",
    startDate: "",
    endDate: "",
  };

  const [goal, setGoal] = useState(emptyGoal);
  const [goals, setGoals] = useState([]);
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [summary, setSummary] = useState({
    totalGoals: 0,
    activeGoals: 0,
    completedGoals: 0,
    failedGoals: 0,
  });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {

  try {

    const allGoals = await getAllGoals();

    const goalsWithProgress = await Promise.all(

      allGoals.map(async (goal) => {

        if (goal.status === "ACTIVE") {

          const progress = await getGoalProgress(goal.id);

          return {
            ...goal,
            progress,
          };

        }

        return goal;

      })

    );

    setGoals(goalsWithProgress);

    const summaryData = await getGoalSummary();

    setSummary(summaryData);

  } catch (err) {

    console.log(err);

  }

};
  const handleView = async (selectedGoal) => {
    setGoal(selectedGoal);

    const progressData = await getGoalProgress(selectedGoal.id);

    setProgress(progressData);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editing) {
        await updateGoal(goal.id, goal);
        alert("Goal Updated Successfully!");
      } else {
        await createGoal(goal);
        alert("Goal Created Successfully!");
      }

      setGoal(emptyGoal);
      setEditing(false);
      setShowForm(false);

      loadGoals();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        err.response?.data ||
        "Operation Failed"
      );
    }
  };

  const handleEdit = (selectedGoal) => {
    setGoal(selectedGoal);
    setEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this goal?")) return;

    try {

      await deleteGoal(id);

      alert("Goal Deleted");

      setGoal(emptyGoal);
      setEditing(false);
      setShowForm(false);

      loadGoals();

    } catch (err) {

      console.log(err);

      alert("Unable to delete goal.");

    }
  };
 

  return (

    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <Navbar />

        <div className="goal-page">

          <h1 className="page-title">
            🎯 Sustainability Goals
          </h1>

          <GoalSummary summary={summary} />

          <div className="goal-action">

            <button
              className="create-goal-btn"
              onClick={() => {
                setGoal(emptyGoal);
                setEditing(false);
                setShowForm(true);
              }}
            >
              ➕ Create New Goal
            </button>

          </div>

          {showForm && (

            <GoalForm
              goal={goal}
              setGoal={setGoal}
              editing={editing}
              emptyGoal={emptyGoal}
              onSubmit={handleSubmit}
              onCancel={() => {
                setGoal(emptyGoal);
                setEditing(false);
                setShowForm(false);
              }}
            />

          )}

          <ActiveGoals
    goals={goals}
    onView={handleView}
    onEdit={handleEdit}
    onDelete={handleDelete}
/>

          <GoalHistory
            goals={goals}
            onEdit={handleEdit}
          />

        </div>

      </div>

    </div>

  );

}

export default Goal;