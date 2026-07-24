import { useEffect, useState } from "react";
import "./TopContributors.css";

import { getTopContributors } from "../services/authService";

const medals = ["🥇", "🥈", "🥉", "4️⃣"];

const TopContributors = ({ period }) => {

  const [contributors, setContributors] = useState([]);

  useEffect(() => {

    loadContributors();

  }, [period]);

  const loadContributors = async () => {

    try {

      const response = await getTopContributors(period);

      setContributors(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const maxEmission =
    contributors.length > 0
      ? Math.max(...contributors.map(item => item.emission))
      : 1;

  return (

    <div className="top-card">

      <h2>🏆 Top Contributors</h2>

      {

        contributors.map((item, index) => (

          <div
            className="top-item"
            key={index}
          >

            <div className="top-header">

              <span>

                {medals[index]} {item.category}

              </span>

              <span>

                {item.emission.toFixed(2)} kg

              </span>

            </div>

            <div className="progress">

              <div
                className="progress-fill"
                style={{
                  width: `${(item.emission / maxEmission) * 100}%`
                }}
              />

            </div>

          </div>

        ))

      }

    </div>

  );

};

export default TopContributors;