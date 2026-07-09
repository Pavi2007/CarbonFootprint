import "./Recommendations.css";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  FaCar,
  FaBolt,
  FaShoppingBag,
  FaUtensils,
  FaLeaf
} from "react-icons/fa";

const tips = [

  {
    icon: <FaCar />,
    title: "Transport",
    description:
      "Use public transport or carpool twice a week to reduce carbon emissions.",
    saving: "Save up to 18 kg CO₂ / month",
  },

  {
    icon: <FaBolt />,
    title: "Electricity",
    description:
      "Switch off unused appliances and replace bulbs with LED lights.",
    saving: "Save up to 12 kg CO₂ / month",
  },

  {
    icon: <FaUtensils />,
    title: "Food",
    description:
      "Reduce food waste and include more plant-based meals.",
    saving: "Save up to 8 kg CO₂ / month",
  },

  {
    icon: <FaShoppingBag />,
    title: "Shopping",
    description:
      "Buy reusable products and avoid unnecessary purchases.",
    saving: "Save up to 10 kg CO₂ / month",
  },

];

const Recommendations = () => {

  return (

    <>

      <Sidebar />

      <Navbar />

      <div className="recommend-page">

        <div className="recommend-header">

          <h1>Smart Recommendations 🌱</h1>

          <p>
            Personalized suggestions to reduce your carbon footprint.
          </p>

        </div>

        <div className="saving-card">

          <FaLeaf className="leaf-icon" />

          <div>

            <h2>Total Potential Reduction</h2>

            <h1>48 kg CO₂ / Month</h1>

          </div>

        </div>

        <div className="recommend-grid">

          {tips.map((item, index) => (

            <div className="recommend-card" key={index}>

              <div className="recommend-icon">

                {item.icon}

              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <span>{item.saving}</span>

            </div>

          ))}

        </div>

        <div className="daily-tip">

          <h2>🌍 Tip of the Day</h2>

          <p>

            Walking just 2 km instead of driving can reduce nearly

            <strong> 0.5 kg of CO₂ </strong>

            every day.

          </p>

        </div>

      </div>

    </>

  );

};

export default Recommendations;