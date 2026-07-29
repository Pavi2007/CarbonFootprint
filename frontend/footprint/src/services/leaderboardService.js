import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const getLeaderboard = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/leaderboard`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};