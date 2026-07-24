import "./Timeline.css";
import { useEffect, useState } from "react";
import { getTimeline } from "../services/authService";

import {
    FaCar,
    FaBolt,
    FaUtensils,
    FaShoppingBag
} from "react-icons/fa";

const Timeline = () => {

    const [activities,setActivities]=useState([]);

    useEffect(()=>{

        loadTimeline();

    },[]);

    const loadTimeline=async()=>{

        try{

            const response=await getTimeline();

            setActivities(response.data);

        }

        catch(err){

            console.log(err);

        }

    };

    const getIcon=(activity)=>{

        switch(activity){

            case "TRANSPORT":
                return <FaCar/>;

            case "ELECTRICITY":
                return <FaBolt/>;

            case "FOOD":
                return <FaUtensils/>;

            case "SHOPPING":
                return <FaShoppingBag/>;

            default:
                return <FaCar/>;

        }

    };

    return(

        <div className="timeline-card">

            <h2>🕒 Recent Activity Timeline</h2>

            {

                activities.map((item,index)=>(

                    <div
                        key={index}
                        className="timeline-item"
                    >

                        <div className="timeline-left">

                            <div className="timeline-icon">

                                {getIcon(item.activity)}

                            </div>

                            <div>

                                <h4>{item.activity}</h4>

                                <span>{item.date}</span>

                            </div>

                        </div>

                        <div className="timeline-right">

                            {item.emission.toFixed(2)} kg

                        </div>

                    </div>

                ))

            }

        </div>

    );

};

export default Timeline;