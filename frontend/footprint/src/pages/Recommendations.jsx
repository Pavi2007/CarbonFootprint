import "./Recommendations.css";
import { useEffect, useState } from "react";
import { getTopContributors } from "../services/authService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const recommendations = {

    Transport: {
        title: "Transportation",
        tips: [
            "Use public transport twice this week",
            "Walk for short trips",
            "Carpool whenever possible"
        ],
        saving: "8.5 kg CO₂/month"
    },

    Electricity: {
        title: "Electricity",
        tips: [
            "Turn off unused appliances",
            "Use LED bulbs",
            "Unplug idle chargers"
        ],
        saving: "5.2 kg CO₂/month"
    },

    Food: {
        title: "Food",
        tips: [
            "Reduce food waste",
            "Eat one vegetarian meal",
            "Buy local produce"
        ],
        saving: "4.3 kg CO₂/month"
    },

    Shopping: {
        title: "Shopping",
        tips: [
            "Buy reusable products",
            "Avoid unnecessary purchases",
            "Choose eco-friendly packaging"
        ],
        saving: "3.1 kg CO₂/month"
    },

    Others: {
        title: "Others",
        tips: [
            "Recycle waste",
            "Plant a tree",
            "Reduce paper usage"
        ],
        saving: "2.0 kg CO₂/month"
    }

};

export default function Recommendation() {

    const [data, setData] = useState(null);

    useEffect(() => {
        loadRecommendation();
    }, []);

   async function loadRecommendation() {
    const res = await getTopContributors("monthly");

    console.log(JSON.stringify(res.data, null, 2));

    if (res.data.length > 0) {
        setData(res.data[0]);
    }
}

    if (!data) return null;

    const rec = recommendations[data.category];

    return (
<>
    <Sidebar />
    <Navbar />

    <div className="recommendation-page">

        <div className="header-card">
            <h2>Personalized Recommendations</h2>
            <p>Based on your recent activities</p>
        </div>

        <div className="focus-card">

            <div className="focus-title">
                Primary Focus
            </div>

            <h3>{rec.title}</h3>

            <p>
                This category contributes the most to your carbon footprint.
            </p>

            <div className="emission">
                {data.emission.toFixed(1)} kg CO₂
            </div>

        </div>

        <div className="tips-card">

            <h3>Suggested Actions</h3>

            {rec.tips.map((tip, index) => (

                <div className="tip" key={index}>
                    <span className="dot"></span>
                    {tip}
                </div>

            ))}

        </div>

        <div className="saving-card">

            <div>
                <span>Potential Saving</span>
                <h3>{rec.saving}</h3>
            </div>

            <div>
                <span>Impact</span>
                <h3>High</h3>
            </div>

        </div>

        <div className="eco-tip">

            <h4>Daily Eco Tip</h4>

            <p>
                Small sustainable choices every day create lasting environmental change.
            </p>

        </div>

    </div>

</>
);
}