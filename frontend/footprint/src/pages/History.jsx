import "./History.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";

const History = () => {

    const activities = [

        {
            id:1,
            date:"08-07-2026",
            activity:"TRANSPORT",
            category:"CAR",
            value:34,
            unit:"km",
            emission:"7.14 kg"
        },

        {
            id:2,
            date:"08-07-2026",
            activity:"ELECTRICITY",
            category:"HOME",
            value:150,
            unit:"kWh",
            emission:"127.5 kg"
        },

        {
            id:3,
            date:"08-07-2026",
            activity:"SHOPPING",
            category:"CLOTHING",
            value:1000,
            unit:"₹",
            emission:"200 kg"
        }

    ];

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
        />

    </div>

    <select>

        <option>All Activities</option>

        <option>Transport</option>

        <option>Electricity</option>

        <option>Food</option>

        <option>Shopping</option>

    </select>

    <select>

        <option>All Categories</option>

        <option>Car</option>

        <option>Bike</option>

        <option>Bus</option>

        <option>Home</option>

        <option>Clothing</option>

    </select>

    <input type="date"/>

    <input type="date"/>

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

                                        <td>{item.date}</td>

                                        <td>{item.activity}</td>

                                        <td>{item.category}</td>

                                        <td>{item.value} {item.unit}</td>

                                        <td>{item.emission}</td>

                                        <td>

                                            <button className="edit-btn">

                                                <FaEdit/>

                                            </button>

                                            <button className="delete-btn">

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