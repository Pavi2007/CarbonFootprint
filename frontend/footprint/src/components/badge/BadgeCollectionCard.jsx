import React from "react";
import "./BadgeCollectionCard.css";

import {
  FaMedal,
  FaCalendarAlt,
  FaBolt,
  FaBullseye,
  FaTrophy,
} from "react-icons/fa";

const getBadgeColor = (level) => {
  switch (level) {
    case "BRONZE":
      return "#CD7F32";
    case "SILVER":
      return "#BFC5CE";
    case "GOLD":
      return "#FFD700";
    default:
      return "#999";
  }
};

const getIcon = (type) => {
  switch (type) {
    case "LOGIN_STREAK":
      return <FaBolt />;
    case "GOAL_COMPLETION":
      return <FaBullseye />;
    case "GLOBAL_RANK":
      return <FaTrophy />;
    default:
      return <FaMedal />;
  }
};

const priority = {
  BRONZE: 1,
  SILVER: 2,
  GOLD: 3,
};

const BadgeCollectionCard = ({ badges }) => {

  const earned = badges.filter((b) => b.earned);

  const highestBadges = {};

  earned.forEach((badge) => {

    const existing = highestBadges[badge.badgeType];

    if (
      !existing ||
      priority[badge.badgeLevel] >
        priority[existing.badgeLevel]
    ) {
      highestBadges[badge.badgeType] = badge;
    }

  });

  const displayBadges = Object.values(highestBadges);

  if (displayBadges.length === 0) {
    return (
      <div className="no-badges">

        <FaMedal className="empty-icon" />

        <h2>No Achievements Yet</h2>

        <p>
          Complete your challenges to unlock your first achievement.
        </p>

      </div>
    );
  }

  return (

    <div className="badge-grid">

      {displayBadges.map((badge, index) => (

        <div
          key={index}
          className="badge-card earned"
        >

          <div
            className="badge-icon"
            style={{
              color: getBadgeColor(badge.badgeLevel),
            }}
          >
            {getIcon(badge.badgeType)}
          </div>

          <h3>{badge.title}</h3>

          <span
            className="badge-level"
            style={{
              background: getBadgeColor(
                badge.badgeLevel
              ),
            }}
          >
            {badge.badgeLevel}
          </span>

          <p>{badge.description}</p>

          <div className="requirement">
            🎯 {badge.requirement}
          </div>

          <div className="earned-date">
            <FaCalendarAlt />
            Earned on {badge.earnedDate}
          </div>

        </div>

      ))}

    </div>

  );
};

export default BadgeCollectionCard;