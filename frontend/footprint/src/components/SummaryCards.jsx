import "./SummaryCards.css";

import {
    FaClipboardList,
    FaLeaf,
    FaCar,
    FaBolt
} from "react-icons/fa";

function SummaryCards({ dashboard }) {

    if (!dashboard) {

        return <h3>Loading Dashboard...</h3>;

    }

    return (

        <div className="summary-container">

            <div className="summary-card">

                <FaClipboardList className="summary-icon"/>

                <h4>Total Activities</h4>

                <h2>{dashboard.totalActivities}</h2>

            </div>

            <div className="summary-card">

                <FaLeaf className="summary-icon"/>

                <h4>Total Emission</h4>

                <h2>

                    {dashboard.totalEmission.toFixed(2)} kg

                </h2>

            </div>

            <div className="summary-card">

                <FaCar className="summary-icon"/>

                <h4>Transport Emission</h4>

                <h2>

                   {dashboard?.totalEmission?.toFixed(2) || "0.00"} kg

                </h2>

            </div>

            <div className="summary-card">

                <FaBolt className="summary-icon"/>

                <h4>Electricity</h4>

                <h2>

                    {dashboard.electricityEmission.toFixed(2)} kg

                </h2>

            </div>

        </div>

    );

}

export default SummaryCards;