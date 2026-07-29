import axios from "axios";

const API_URL = "http://localhost:8080/api/badges";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getBadgeProgress = () =>
    axios.get(`${API_URL}/progress`, getAuthHeader());

export const getBadgeCollection = () =>
    axios.get(`${API_URL}/collection`, getAuthHeader());

export const getHeatmap = () =>
    axios.get(`${API_URL}/heatmap`, getAuthHeader());