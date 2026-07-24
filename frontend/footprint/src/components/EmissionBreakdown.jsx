import { useEffect, useState } from "react";
import "./EmissionBreakdown.css";

import {
  FaCar,
  FaBolt,
  FaUtensils,
  FaShoppingBag,
} from "react-icons/fa";

import { getBreakdown } from "../services/authService";

const icons = {
  Transport: <FaCar />,
  Electricity: <FaBolt />,
  Food: <FaUtensils />,
  Shopping: <FaShoppingBag />,
};

const EmissionBreakdown = () => {

  const [breakdown, setBreakdown] = useState([]);

  useEffect(() => {

    loadBreakdown();

  }, []);

  const loadBreakdown = async () => {

    try {

      const response = await getBreakdown();

      setBreakdown(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="breakdown-card">

      <h2>Emission Breakdown</h2>

      {

        breakdown.map((item, index) => (

          <div
            className="breakdown-item"
            key={index}
          >

            <div className="breakdown-left">

              <span className="icon">

                {icons[item.category]}

              </span>

              <span>

                {item.category}

              </span>

            </div>

            <span className="value">

              {item.emission.toFixed(2)} kg

            </span>

          </div>

        ))

      }

    </div>

  );

};

export default EmissionBreakdown;