import React from "react";
import "./BadgeProgressCard.css";
import ProgressBar from "./ProgressBar";

import {
  FaBolt,
  FaMedal,
  FaCrown,
  FaArrowCircleUp,
} from "react-icons/fa";

const BadgeProgressCard = ({ progress }) => {

  const getIcon = (type) => {
    switch (type) {
      case "LOGIN_STREAK":
        return <FaBolt className="card-icon fire" />;

      case "GOAL_COMPLETION":
        return <FaMedal className="card-icon goal" />;

      case "GLOBAL_RANK":
        return <FaCrown className="card-icon rank" />;

      default:
        return null;
    }
  };

  const getTitle = (type) => {
    switch (type) {
      case "LOGIN_STREAK":
        return "Login Streak";

      case "GOAL_COMPLETION":
        return "Goal Completion";

      case "GLOBAL_RANK":
        return "Global Ranking";

      default:
        return "";
    }
  };

  const getDescription = (type) => {
    switch (type) {
      case "LOGIN_STREAK":
        return "Login daily to build your streak.";

      case "GOAL_COMPLETION":
        return "Complete eco goals to unlock rewards.";

      case "GLOBAL_RANK":
        return "Improve your rank among all users.";

      default:
        return "";
    }
  };

  const getUnit = (type) => {
    switch (type) {
      case "LOGIN_STREAK":
        return "Days";

      case "GOAL_COMPLETION":
        return "Goals";

      case "GLOBAL_RANK":
        return "Users";

      default:
        return "";
    }
  };

  return (
    <>
      {progress.map((item, index) => {

        const percentage = Math.min(
          (item.currentProgress / item.targetProgress) * 100,
          100
        );

        const remaining = Math.max(
          item.targetProgress - item.currentProgress,
          0
        );

        return (
          <div className="challenge-card" key={index}>

            <div className="challenge-top">

              <div className="icon-box">
                {getIcon(item.badgeType)}
              </div>

              <div className="title-box">
                <h3>{getTitle(item.badgeType)}</h3>
                <p>{getDescription(item.badgeType)}</p>
              </div>

            </div>

            <div className="badge-info">

              <div className="current-badge">
                🏅 {item.currentLevel}
              </div>

              {item.nextLevel && (
                <div className="next-badge">
                  Next : {item.nextLevel}
                </div>
              )}

            </div>

            <ProgressBar percentage={percentage} />

            <div className="progress-text">
              {item.currentProgress} / {item.targetProgress}{" "}
              {getUnit(item.badgeType)}
            </div>

            {item.nextLevel && (
              <div className="remaining">
                <FaArrowCircleUp />
                Only <b>{remaining}</b> {getUnit(item.badgeType).toLowerCase()} remaining
              </div>
            )}

          </div>
        );
      })}
    </>
  );
};

export default BadgeProgressCard;