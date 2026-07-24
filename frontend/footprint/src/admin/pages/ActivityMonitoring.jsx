import { useEffect, useState } from "react";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import "../css/ActivityMonitoring.css";

import {
    getAllActivities,
    searchActivities
} from "../services/adminService";

const ActivityMonitoring = () => {

    const [activities, setActivities] = useState([]);

    const [summary, setSummary] = useState({

        totalActivities: 0,

        totalEmission: 0,

        activeUsers: 0

    });

    const [filters, setFilters] = useState({

        category: "",

        activityType: "",

        startDate: "",

        endDate: ""

    });

    useEffect(() => {

        loadActivities();

    }, []);

    const loadActivities = async () => {

        try {

            const response = await getAllActivities();

            setActivities(response.data.activities);

            setSummary({

                totalActivities: response.data.totalActivities,

                totalEmission: response.data.totalEmission,

                activeUsers: response.data.activeUsers

            });

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleSearch = async () => {

        try {

            console.log(filters);

            const response = await searchActivities(

                filters.category,

                filters.activityType,

                filters.startDate,

                filters.endDate

            );

            console.log(response.data);

            setActivities(response.data.activities);

            setSummary({

                totalActivities: response.data.totalActivities,

                totalEmission: response.data.totalEmission,

                activeUsers: response.data.activeUsers

            });

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleReset = () => {

        setFilters({

            category: "",

            activityType: "",

            startDate: "",

            endDate: ""

        });

        loadActivities();

    };
    return (

    <>

        <AdminSidebar />

        <AdminNavbar />

        <div className="admin-content">

            <h1>Activity Monitoring</h1>

            {/* SUMMARY CARDS */}

            <div className="dashboard-cards">

                <div className="dashboard-card">

                    <h3>Total Activities</h3>

                    <h2>{summary.totalActivities}</h2>

                </div>

                <div className="dashboard-card">

                    <h3>Total Emission</h3>

                    <h2>{summary.totalEmission.toFixed(2)} kg</h2>

                </div>

                <div className="dashboard-card">

                    <h3>Active Users</h3>

                    <h2>{summary.activeUsers}</h2>

                </div>

            </div>

            {/* FILTERS */}

            <div className="filter-box">

                {/* Activity */}

                <select

                    value={filters.category || ""}

                    onChange={(e) =>

                        setFilters({

                            ...filters,

                            category: e.target.value

                        })

                    }

                >

                    <option value="">All Activities</option>

                    <option value="CAR">Car</option>

                    <option value="BUS">Bus</option>

                    <option value="TRAIN">Train</option>

                    <option value="BIKE">Bike</option>

                    <option value="FLIGHT">Flight</option>

                    <option value="HOME">Home</option>

                    <option value="VEGETARIAN">Vegetarian</option>

                    <option value="NON_VEGETARIAN">Non Vegetarian</option>

                    <option value="GROCERY">Grocery</option>

                    <option value="CLOTHING">Clothing</option>

                </select>

                {/* Category */}

                <select

                    value={filters.activityType || ""}

                    onChange={(e) =>

                        setFilters({

                            ...filters,

                            activityType: e.target.value

                        })

                    }

                >

                    <option value="">All Categories</option>

                    <option value="TRANSPORT">Transport</option>

                    <option value="FOOD">Food</option>

                    <option value="SHOPPING">Shopping</option>

                    <option value="ELECTRICITY">Electricity</option>

                    <option value="OTHERS">Others</option>

                </select>

                {/* Start Date */}

                <input

                    type="date"

                    value={filters.startDate || ""}

                    onChange={(e) =>

                        setFilters({

                            ...filters,

                            startDate: e.target.value

                        })

                    }

                />

                {/* End Date */}

                <input

                    type="date"

                    value={filters.endDate || ""}

                    onChange={(e) =>

                        setFilters({

                            ...filters,

                            endDate: e.target.value

                        })

                    }

                />

                <button

                    className="search-btn"

                    onClick={handleSearch}

                >

                    Search

                </button>

                <button

                    className="reset-btn"

                    onClick={handleReset}

                >

                    Reset

                </button>

            </div>

            {/* TABLE */}

            <table className="activity-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>User</th>

                        <th>Email</th>

                        <th>Activity</th>

                        <th>Category</th>

                        <th>Quantity</th>

                        <th>Unit</th>

                        <th>Emission</th>

                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        activities.length === 0 ?

                        (

                            <tr>

                                <td colSpan="9">

                                    No Activities Found

                                </td>

                            </tr>

                        )

                        :

                        (

                            activities.map(activity => (

                                <tr key={activity.id}>

                                    <td>{activity.id}</td>

                                    <td>{activity.userName}</td>

                                    <td>{activity.email}</td>

                                    <td>{activity.category}</td>

                                    <td>{activity.activityType}</td>

                                    <td>{activity.value}</td>

                                    <td>{activity.unit}</td>

                                    <td>{activity.emission.toFixed(2)}</td>

                                    <td>{activity.activityDate}</td>

                                </tr>

                            ))

                        )

                    }

                </tbody>

            </table>

        </div>

    </>

);

};

export default ActivityMonitoring;