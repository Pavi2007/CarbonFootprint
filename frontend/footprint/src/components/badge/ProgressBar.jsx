import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-wrapper">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;