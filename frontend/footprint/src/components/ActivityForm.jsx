import "./ActivityForm.css";
import { useState, useEffect } from "react";

function ActivityForm({ onSubmit, editingActivity }) {

    const [activityType, setActivityType] = useState("TRANSPORT");

    const [category, setCategory] = useState("");

    const [value, setValue] = useState("");

    const [unit, setUnit] = useState("km");

    useEffect(() => {

        if(editingActivity){

            setActivityType(editingActivity.activityType);

            setCategory(editingActivity.category);

            setValue(editingActivity.value);

            setUnit(editingActivity.unit);

        }

    },[editingActivity]);

    const transport=["CAR","BIKE","BUS","TRAIN","FLIGHT"];

    const food=["VEGETARIAN","NON_VEGETARIAN","VEGAN"];

    const shopping=["GROCERY","CLOTHING","ELECTRONICS","FURNITURE"];

    const handleActivity=(type)=>{

        setActivityType(type);

        setCategory("");

        setValue("");

        if(type==="TRANSPORT") setUnit("km");

        if(type==="ELECTRICITY") setUnit("kWh");

        if(type==="FOOD") setUnit("Meals");

        if(type==="SHOPPING") setUnit("₹");

    };

    const saveActivity=(e)=>{

        e.preventDefault();

        onSubmit({

            activityType,

            category,

            value:Number(value),

            unit

        });

        setCategory("");

        setValue("");

    };

    return(

        <form className="activity-form" onSubmit={saveActivity}>

            <div className="activity-types">

                <button
                    type="button"
                    className={activityType==="TRANSPORT"?"active":""}
                    onClick={()=>handleActivity("TRANSPORT")}
                >
                    🚗 Transport
                </button>

                <button
                    type="button"
                    className={activityType==="ELECTRICITY"?"active":""}
                    onClick={()=>handleActivity("ELECTRICITY")}
                >
                    ⚡ Electricity
                </button>

                <button
                    type="button"
                    className={activityType==="FOOD"?"active":""}
                    onClick={()=>handleActivity("FOOD")}
                >
                    🍽 Food
                </button>

                <button
                    type="button"
                    className={activityType==="SHOPPING"?"active":""}
                    onClick={()=>handleActivity("SHOPPING")}
                >
                    🛒 Shopping
                </button>

            </div>

            <div className="form-grid">

                <div>

                    <label>Category</label>

                    <select
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}
                        required
                    >

                        <option value="">Select</option>

                        {activityType==="TRANSPORT" &&
                            transport.map(item=>(
                                <option key={item}>{item}</option>
                            ))
                        }

                        {activityType==="FOOD" &&
                            food.map(item=>(
                                <option key={item}>{item}</option>
                            ))
                        }

                        {activityType==="SHOPPING" &&
                            shopping.map(item=>(
                                <option key={item}>{item}</option>
                            ))
                        }

                        {activityType==="ELECTRICITY" &&

                            <option>HOME</option>

                        }

                    </select>

                </div>

                <div>

                    <label>

                        {activityType==="SHOPPING" ? "Amount" : "Value"}

                    </label>

                    <input

                        type="number"

                        value={value}

                        onChange={(e)=>setValue(e.target.value)}

                        required

                    />

                </div>

                <div>

                    <label>Unit</label>

                    <input value={unit} readOnly/>

                </div>

            </div>

            <button className="save-btn">

                Save Activity

            </button>

        </form>

    );

}

export default ActivityForm;