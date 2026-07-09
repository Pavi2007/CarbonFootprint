import axios from "axios";

// Create Axios Instance
const API = axios.create({
    baseURL: "http://localhost:8080/api",
});

// Automatically attach JWT token to every request
API.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/* ==========================
   AUTH APIs
========================== */

// Register User
export const registerUser = (userData) => {
    return API.post("/auth/register", userData);
};

// Login User
export const loginUser = (loginData) => {
    return API.post("/auth/login", loginData);
};

// Logout User
export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};

/* ==========================
   DASHBOARD APIs
========================== */

// Dashboard Summary
export const getDashboard = () => {
    return API.get("/dashboard");
};

// Recent Activities
export const getRecentActivities = () => {
    return API.get("/dashboard/recent");
};

/* ==========================
   ACTIVITY APIs
========================== */
export const getWeeklyTrend = () => {
    return API.get("/dashboard/weekly-trend");
};

export const getMonthlyTrend = () => {
    return API.get("/dashboard/monthly-trend");
};

export const getYearlyTrend = () => {
    return API.get("/dashboard/yearly-trend");
};
// Get All Activities
export const getMyActivities = () => {
    return API.get("/activity/my-activities");
};

// Add Activity
export const addActivity = (activityData) => {
    return API.post("/activity/add", activityData);
};

// Update Activity
export const updateActivity = (id, activityData) => {
    return API.put(`/activity/update/${id}`, activityData);
};

// Delete Activity
export const deleteActivity = (id) =>
    API.delete(`/activity/delete/${id}`);