import "./TrendSummaryCards.css";

import {
  FaLeaf,
  FaFire,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";

const TrendSummaryCards = ({ summary }) => {

  summary = summary || {
    highestCategory: "",
    highestEmission: 0,
    lowestCategory: "",
    lowestEmission: 0,
    averageEmission: 0,
    carbonScore: 0,
    totalEmission: 0,
  };

  return (

    <div className="trend-summary">

      <div className="trend-card">

        <FaLeaf className="icon green" />

        <h4>Highest Category</h4>

        <h2>{summary.highestCategory}</h2>

        <p>{summary.highestEmission?.toFixed(2)} kg CO₂</p>

      </div>

      <div className="trend-card">

        <FaFire className="icon red" />

        <h4>Lowest Category</h4>

        <h2>{summary.lowestCategory}</h2>

        <p>{summary.lowestEmission?.toFixed(2)} kg CO₂</p>

      </div>

      <div className="trend-card">

        <FaChartLine className="icon blue" />

        <h4>Average Emission</h4>

        <h2>{summary.averageEmission?.toFixed(2)} kg</h2>

      </div>

      <div className="trend-card">

        <FaCalendarAlt className="icon orange" />

        <h4>Total Emission</h4>

        <h2>{summary.totalEmission?.toFixed(2)} kg</h2>

        <p>Carbon Score : {summary.carbonScore}</p>

      </div>

    </div>

  );

};

export default TrendSummaryCards;