import axios from "axios";

const API = "http://localhost:8080/api/dashboard";

const getToken = () => localStorage.getItem("token");

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

export const getDashboard = async () => {
  const response = await axios.get(API, config());
  return response.data;
};