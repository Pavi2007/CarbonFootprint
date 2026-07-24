import { useEffect, useState } from "react";
import "./SmartInsights.css";

import { getInsights } from "../services/authService";

const SmartInsights = ({ period }) => {

  const [insights, setInsights] = useState([]);

  useEffect(() => {

    loadInsights();

  }, [period]);

  const loadInsights = async () => {

    try {

      const response = await getInsights(period);

      setInsights(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="insights-card">

      <h2>💡 Smart Insights</h2>

      {

        insights.map((item, index) => (

          <div
            className="insight-item"
            key={index}
          >

            <h4>{item.title}</h4>

            <p>{item.message}</p>

          </div>

        ))

      }

    </div>

  );

};

export default SmartInsights;