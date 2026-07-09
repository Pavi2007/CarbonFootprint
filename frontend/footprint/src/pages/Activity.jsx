import "./Activity.css";
import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  addActivity,
  getMyActivities,
  updateActivity,
  deleteActivity,
} from "../services/authService";
const Activity = () => {
const [activities, setActivities] = useState([]);
    const [activityType, setActivityType] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [category, setCategory] = useState("");
    const [value, setValue] = useState("");
    const [unit, setUnit] = useState("");
    const [date, setDate] = useState("");

    const [categories, setCategories] = useState([]);
useEffect(() => {

    loadActivities();

}, []);

const loadActivities = async () => {

    try{

        const response = await getMyActivities();

        setActivities(response.data);

    }

    catch(error){

        console.log(error);

    }

};
const resetForm = () => {

    setActivityType("");
    setCategory("");
    setValue("");
    setUnit("");
    setDate("");
    setCategories([]);
    setEditingId(null);

};
    const handleActivityType = (e) => {

        const type = e.target.value;

        setActivityType(type);

        setCategory("");

        switch (type) {

            case "TRANSPORT":
                setCategories([
                    "CAR",
                    "BIKE",
                    "BUS",
                    "TRAIN",
                    "FLIGHT"
                ]);
                setUnit("km");
                break;

            case "ELECTRICITY":
                setCategories([
                    "HOME",
                    "HOSTEL",
                    "OFFICE"
                ]);
                setUnit("kWh");
                break;

            case "FOOD":
                setCategories([
                    "VEGETARIAN",
                    "NON_VEGETARIAN",
                    "FAST_FOOD"
                ]);
                setUnit("kg");
                break;

            case "SHOPPING":
                setCategories([
                    "CLOTHING",
                    "ELECTRONICS",
                    "GROCERY",
                    "FURNITURE"
                ]);
                setUnit("₹");
                break;

            default:
                setCategories([]);
                setUnit("");
        }

    };

    const handleSubmit = async(e) => {

        e.preventDefault();

        const activity = {

            activityType,
            category,
            value,
            unit,
            activityDate: date

        };

try{

    if(editingId){

        await updateActivity(editingId,activity);

    }

    else{

        await addActivity(activity);

    }

    loadActivities();

    resetForm();

}

catch(error){

    console.log(error);

}

        // Later we'll call Spring Boot API here

    };
    const handleEdit = (activity) => {

    setEditingId(activity.id);

    setActivityType(activity.activityType);

    setCategory(activity.category);

    setValue(activity.value);

    setUnit(activity.unit);

    setDate(activity.activityDate);

    switch (activity.activityType) {

      case "TRANSPORT":

        setCategories([
          "CAR",
          "BIKE",
          "BUS",
          "TRAIN",
          "FLIGHT",
        ]);

        break;

      case "ELECTRICITY":

        setCategories([
          "HOME",
          "HOSTEL",
          "OFFICE",
        ]);

        break;

      case "FOOD":

        setCategories([
          "VEGETARIAN",
          "NON_VEGETARIAN",
          "FAST_FOOD",
        ]);

        break;

      case "SHOPPING":

        setCategories([
          "CLOTHING",
          "ELECTRONICS",
          "GROCERY",
          "FURNITURE",
        ]);

        break;

      default:

        setCategories([]);

    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this activity?")) return;

    try {

      await deleteActivity(id);

      alert("Activity Deleted Successfully!");

      loadActivities();

    } catch (error) {

      console.error(error);

      alert("Delete Failed!");

    }

  };


    return (

        <>
            <Sidebar />
            <Navbar />

            <div className="activity-page">

                <h1>Activity Logging</h1>

                <div className="activity-card">

                    <h2>Add Activity</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>Activity Type</label>

                                <select
                                    value={activityType}
                                    onChange={handleActivityType}
                                    required
                                >

                                    <option value="">
                                        Select Activity
                                    </option>

                                    <option value="TRANSPORT">
                                        Transport
                                    </option>

                                    <option value="ELECTRICITY">
                                        Electricity
                                    </option>

                                    <option value="FOOD">
                                        Food
                                    </option>

                                    <option value="SHOPPING">
                                        Shopping
                                    </option>

                                </select>

                            </div>

                            <div className="form-group">

                                <label>Category</label>

                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    {
                                        categories.map((item, index) => (

                                            <option
                                                key={index}
                                                value={item}
                                            >
                                                {item}
                                            </option>

                                        ))
                                    }

                                </select>

                            </div>

                            <div className="form-group">

                                <label>Value</label>

                                <input
                                    type="number"
                                    placeholder="Enter Value"
                                    value={value}
                                    onChange={(e) =>
                                        setValue(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>Unit</label>

                                <input
                                    type="text"
                                    value={unit}
                                    readOnly
                                />

                            </div>

                            <div className="form-group">

                                <label>Date</label>

                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) =>
                                        setDate(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>

                        <button
                            className="save-btn"
                            type="submit"
                        >
                            Save Activity
                        </button>

                    </form>

                </div>

                <div className="activity-table">

                    <h2>Recent Activities</h2>

                    <table>

                        <thead>

                            <tr>

                                <th>Date</th>

                                <th>Activity</th>

                                <th>Category</th>

                                <th>Value</th>

                                <th>Unit</th>

                                <th>Emission</th>

                            </tr>

                        </thead>

                        <tbody>

       {
activities.map(activity=>(

<tr key={activity.id}>

<td>{activity.activityDate}</td>

<td>{activity.activityType}</td>

<td>{activity.category}</td>

<td>{activity.value}</td>

<td>{activity.unit}</td>

<td>{activity.emission}</td>

<td className="action-buttons">

    <button
        className="edit-btn"
        onClick={() => handleEdit(activity)}
    >
        Edit
    </button>

    <button
        className="delete-btn"
        onClick={() => handleDelete(activity.id)}
    >
        Delete
    </button>

</td>

</tr>

))
}

                            
    

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

};

export default Activity;