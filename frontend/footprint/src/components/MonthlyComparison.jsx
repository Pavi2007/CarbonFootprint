import { useEffect, useState } from "react";
import "./MonthlyComparison.css";

import { getMonthlyComparison } from "../services/authService";

const MonthlyComparison = ({ period }) => {

    const [data, setData] = useState({});

    useEffect(() => {

        loadData();

    }, [period]);

    const loadData = async () => {

        try{

            const response =
                await getMonthlyComparison(period);

            setData(response.data);

        }

        catch(error){

            console.log(error);

        }

    };

    return(

        <div className="comparison-card">

            <h2>Monthly Comparison</h2>

            <div className="comparison-row">

                <span>Current Month</span>

                <strong>

                    {(data.currentMonth ?? 0).toFixed(2)} kg

                </strong>

            </div>

            <div className="comparison-row">

                <span>Previous Month</span>

                <strong>

                    {(data.previousMonth ?? 0).toFixed(2)} kg

                </strong>

            </div>

            <div className="comparison-row">

                <span>Difference</span>

                <strong>

                    {(data.difference ?? 0).toFixed(2)} kg

                </strong>

            </div>

            <div className="comparison-row">

                <span>Change</span>

                <strong>

                    {(data.percentage ?? 0).toFixed(1)}%

                </strong>

            </div>

        </div>

    );

};

export default MonthlyComparison;