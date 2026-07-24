import axios from "axios";

const API = axios.create({

    baseURL: "http://localhost:8080/api/admin"

});

API.interceptors.request.use(config => {

    const token = localStorage.getItem("token");

    if(token){

        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

});

export const getDashboard = () => API.get("/dashboard");

export const getUsers = () => API.get("/users");

export const getActivities = () => API.get("/activities");

export const getAnalytics = () => API.get("/analytics");

export const getReports = () => API.get("/reports");

export const getWeeklyTrend=()=>API.get("/trend/week");

export const getMonthlyTrend=()=>API.get("/trend/month");

export const getYearlyTrend=()=>API.get("/trend/year");

export const getBreakdown=()=>API.get("/breakdown");



export const deleteUser = (id) => API.delete(`/users/${id}`);



export const searchActivities=(

    category,

    activityType,

    startDate,

    endDate

)=>

API.get("/activities/search",{

    params:{

        category,

        activityType,

        startDate,

        endDate

    }

});

export const getAllActivities = () =>
    API.get("/activities");