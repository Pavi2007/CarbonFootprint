import axios from "axios";

const API = "http://localhost:8080/api/goals";

const getToken = () => localStorage.getItem("token");

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

// Create Goal
export const createGoal = async (goal) => {
  const response = await axios.post(API, goal, config());
  return response.data;
};

// Get All Goals
export const getAllGoals = async () => {
  const response = await axios.get(API, config());
  return response.data;
};

// Get Active Goals
export const getActiveGoals = async () => {
  const response = await axios.get(`${API}/active`, config());
  return response.data;
};

// Get Goal History
export const getGoalHistory = async () => {
  const response = await axios.get(`${API}/history`, config());
  return response.data;
};

// Get Goal Summary
export const getGoalSummary = async () => {
  const response = await axios.get(`${API}/summary`, config());
  return response.data;
};

// Get Goal Progress
export const getGoalProgress = async (id) => {
  const response = await axios.get(`${API}/${id}/progress`, config());
  return response.data;
};

// Update Goal
export const updateGoal = async (id, goal) => {
  const response = await axios.put(`${API}/${id}`, goal, config());
  return response.data;
};

// Delete Goal
export const deleteGoal = async (id) => {
  const response = await axios.delete(`${API}/${id}`, config());
  return response.data;
};