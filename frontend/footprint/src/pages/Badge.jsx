import React, { useEffect, useState } from "react";
import "./Badge.css";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import BadgeProgressCard from "../components/badge/BadgeProgressCard";
import BadgeCollectionCard from "../components/badge/BadgeCollectionCard";
import Heatmap from "../components/badge/Heatmap";

import {
  getBadgeProgress,
  getBadgeCollection,
  getHeatmap,
} from "../services/badgeService";

import { FaAward } from "react-icons/fa";

const Badge = () => {
  const [progress, setProgress] = useState([]);
  const [collection, setCollection] = useState([]);
  const [heatmap, setHeatmap] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const progressRes = await getBadgeProgress();
      const collectionRes = await getBadgeCollection();
      const heatmapRes = await getHeatmap();

      setProgress(progressRes.data);
      setCollection(collectionRes.data);
      setHeatmap(heatmapRes.data);
    } catch (error) {
      console.error("Error loading badge data", error);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
     <div className="badge-page">

        <Navbar />

        <div className="badge-container">

          {/* Header */}
          <div className="badge-header">

            <div className="badge-header-content">

              <h1>
                <FaAward />
                Achievements
              </h1>

              <p>
                Earn badges by maintaining sustainable habits,
                completing eco goals and climbing the global rankings.
              </p>

            </div>

          </div>

          {/* Progress */}

          <section className="badge-section">

            <h2>Your Progress</h2>

            <div className="progress-grid">

              <BadgeProgressCard progress={progress} />

            </div>

          </section>

          {/* Badge Collection */}

          <section className="badge-section">

            <h2>Badge Collection</h2>

            <BadgeCollectionCard badges={collection} />

          </section>


          <section className="badge-section">

            <h2>Carbon Activity Calendar</h2>

            <Heatmap heatmap={heatmap} />

          </section>

        </div>

      </div>
    </div>
  );
};

export default Badge;