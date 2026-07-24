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
export const getBreakdown = (period) => {

    return API.get("/dashboard/breakdown", {

        params: {

            period

        }

    });

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

export const getAnalyticsSummary = (period) => {
    return API.get("/analytics/summary", {
        params: {
            period
        }
    });
};
export const getMonthlyComparison = (period) => {

    return API.get("/analytics/monthly-comparison", {

        params: {
            period
        }

    });

};
export const getTopContributors = (period) => {

    return API.get("/analytics/top-contributors", {

        params: {
            period
        }

    });

};

export const getInsights = (period) => {

    return API.get("/analytics/insights", {

        params: {
            period
        }

    });

};
export const getTrendSummary = (period) => {

    return API.get("/analytics/trend-summary", {

        params: {
            period
        }

    });

};
export const getTimeline = (period) => {

    return API.get("/analytics/timeline", {

        params: {
            period
        }

    });

};
export const getHistory = (params) => {

    return API.get("/activity/history",{

        params

    });

};
// ==========================
// PROFILE APIs
// ==========================

export const getProfile = () => {

    return API.get("/user/profile");

};

export const updateProfile = (profile) => {

    return API.put("/user/profile", profile);

};