import React from "react";
import "./Heatmap.css";

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

const Heatmap = ({ heatmap = [] }) => {

    const dataMap = {};

    heatmap.forEach((item) => {

    let level = 0;

    if (item.emission > 0)
        level = 1;

    if (item.emission >= 5)
        level = 2;

    if (item.emission >= 10)
        level = 3;

    if (item.emission >= 20)
        level = 4;

    dataMap[item.date] = {
        emission: item.emission,
        level
    };

});


    const today = new Date();

    const year = today.getFullYear();

    const months = [];

    for (let month = 0; month < 12; month++) {

        const firstDay = new Date(year, month, 1);

        const lastDay = new Date(year, month + 1, 0);

        const days = [];

        for (let i = 0; i < firstDay.getDay(); i++) {

            days.push(null);

        }

        for (let d = 1; d <= lastDay.getDate(); d++) {

            const current = new Date(year, month, d);

            const key = current.toISOString().split("T")[0];

            const activity = dataMap[key] || {

                count: 0,

                level: 0

            };

           days.push({

                date: current,

                emission: activity.emission,

                level: activity.level

            });

        }

        while (days.length % 7 !== 0) {

            days.push(null);

        }

                const weeks = [];

            const TOTAL_COLUMNS = 6;

            for (let i = 0; i < TOTAL_COLUMNS; i++) {

                weeks.push([]);

            }

            days.forEach((day, index) => {

                const column = Math.floor(index / 7);

                weeks[column].push(day);

            });

            weeks.forEach((week) => {

                while (week.length < 7) {

                    week.push(null);

                }

        });

        months.push({

            name: monthNames[month],

            weeks

        });

    };
return (

    <div className="heatmap-container">

        <div className="months-wrapper">

            {months.map((month, monthIndex) => (

                <div
                    key={monthIndex}
                    className="month-card"
                >

                    <div className="month-title">
                        {month.name}
                    </div>

                    <div className="month-grid">

                        {month.weeks.map((week, weekIndex) => (

                            <div
                                key={weekIndex}
                                className="week-column"
                            >

                                {week.map((day, dayIndex) => {

                                    if (!day) {

                                        return (

                                            <div
                                                key={dayIndex}
                                                className="cell empty"
                                            />

                                        );

                                    }

                                    return (

                                        <div
                                            key={dayIndex}
                                            className={`cell level-${day.level}`}
                                            title={`${day.emission} kg CO₂ • ${day.date.toLocaleDateString()}`}
                                        />

                                    );

                                })}

                            </div>

                        ))}

                    </div>

                </div>

            ))}

        </div>

        <div className="legend">

            <span>Less</span>

            <div className="cell level-0"></div>
            <div className="cell level-1"></div>
            <div className="cell level-2"></div>
            <div className="cell level-3"></div>
            <div className="cell level-4"></div>

            <span>More</span>

        </div>

    </div>

);

};

export default Heatmap;