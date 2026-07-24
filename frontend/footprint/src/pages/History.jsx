import "./History.css";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";

import {
    getHistory,
    deleteActivity
} from "../services/authService";

const History = () => {

    const [activities, setActivities] = useState([]);

const [search, setSearch] = useState("");

const [activityType, setActivityType] = useState("");

const [category, setCategory] = useState("");

const [startDate, setStartDate] = useState("");

const [endDate, setEndDate] = useState("");
useEffect(() => {

    loadHistory();

}, [search, activityType, category, startDate, endDate]);

const loadHistory = async () => {

    try {

        const params = {};

        if (search) params.search = search;

        if (activityType) params.activityType = activityType;

        if (category) params.category = category;

        if (startDate) params.startDate = startDate;

        if (endDate) params.endDate = endDate;

        const response = await getHistory(params);

        console.log(response.data);

        setActivities(response.data);

    } catch (error) {

        console.log(error);

    }

};
const handleDelete = async(id)=>{

    if(!window.confirm("Delete this activity?")) return;

    await deleteActivity(id);

    loadHistory();

}
    return (

        <>
            <Sidebar/>
            <Navbar/>

            <div className="history-page">

                <div className="history-header">

                    <div>

                        <h1>Activity History</h1>

                        <p>
                            View and manage all your recorded activities.
                        </p>

                    </div>

                </div>

                <div className="history-toolbar">

    <div className="search-box">

        <FaSearch />

        <input
    type="text"
    placeholder="Search activity..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
/>

    </div>

    <select
    value={activityType}
    onChange={(e)=>setActivityType(e.target.value)}
>

<option value="">All Activities</option>

<option value="TRANSPORT">Transport</option>

<option value="ELECTRICITY">Electricity</option>

<option value="FOOD">Food</option>

<option value="SHOPPING">Shopping</option>

</select>


    <select
    value={category}
    onChange={(e)=>setCategory(e.target.value)}
>

<option value="">All Categories</option>

<option value="CAR">Car</option>

<option value="BUS">Bus</option>

<option value="TRAIN">Train</option>

<option value="FLIGHT">Flight</option>

<option value="HOME">Home</option>

<option value="CLOTHING">Clothing</option>

<option value="GROCERY">Grocery</option>

<option value="VEGETARIAN">Vegetarian</option>

<option value="NON_VEGETARIAN">Non Vegetarian</option>

</select>
    <input
    type="date"
    value={startDate}
    onChange={(e)=>setStartDate(e.target.value)}
/>

    <input
    type="date"
    value={endDate}
    onChange={(e)=>setEndDate(e.target.value)}
/>

    <div className="export-buttons">

        <button className="csv-btn">

            Export CSV

        </button>

        <button className="pdf-btn">

            Export PDF

        </button>

    </div>

</div>

                <div className="history-table">

                    <table>

                        <thead>

                            <tr>

                                <th>Date</th>

                                <th>Activity</th>

                                <th>Category</th>

                                <th>Value</th>

                                <th>Emission</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

{

activities.map((item)=>(

<tr key={item.id}>

<td>

{new Date(item.activityDate).toLocaleDateString()}

</td>

<td>

{item.activityType}

</td>

<td>

{item.category}

</td>

<td>

{item.value} {item.unit}

</td>

<td>

{item.emission.toFixed(2)} kg

</td>

<td>



<button
className="delete-btn"
onClick={()=>handleDelete(item.id)}
>

<FaTrash/>

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

export default History;