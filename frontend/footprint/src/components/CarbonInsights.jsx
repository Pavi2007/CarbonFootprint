import "./CarbonInsights.css";
import { FaLeaf, FaCar, FaBolt, FaUtensils } from "react-icons/fa";

const CarbonInsights = () => {
  return (
    <div className="insights-card">

      <h2>Carbon Insights</h2>

      <div className="insight">

        <FaCar className="insight-icon"/>

        <div>
          <h4>Transport</h4>
          <p>Highest contributor this week</p>
        </div>

      </div>

      <div className="insight">

        <FaBolt className="insight-icon"/>

        <div>
          <h4>Electricity</h4>
          <p>Reduced by 12%</p>
        </div>

      </div>

      <div className="insight">

        <FaUtensils className="insight-icon"/>

        <div>
          <h4>Food</h4>
          <p>Average emission maintained</p>
        </div>

      </div>

      <div className="tip">

        <FaLeaf />

        <span>
          Tip: Walk or cycle twice a week to lower your carbon footprint.
        </span>

      </div>

    </div>
  );
};

export default CarbonInsights;