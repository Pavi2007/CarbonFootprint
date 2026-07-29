import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../css/Reports.css";

const API = "http://localhost:8080/api/admin/reports";

const Reports = () => {

    const [reportType, setReportType] = useState("weekly");
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchReports(reportType);
    }, [reportType]);

    const fetchReports = async (type) => {
        try {
            const response = await axios.get(
                `${API}/${type}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setReports(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    const downloadFile = async (type, format) => {

        try {

            const response = await axios.get(
                `${API}/${type}/${format}`,
                {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement("a");

            link.href = url;
            link.download = `${type}_report.${format}`;

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (error) {
            console.error(error);
        }

    };

    return (
        <>
            <AdminSidebar />
            <AdminNavbar />

            <div className="admin-content">

                <div className="report-header">

                    <h2>Reports</h2>

                    <div className="report-buttons">

                        <button
                            className={reportType === "weekly" ? "active" : ""}
                            onClick={() => setReportType("weekly")}
                        >
                            Weekly
                        </button>

                        <button
                            className={reportType === "monthly" ? "active" : ""}
                            onClick={() => setReportType("monthly")}
                        >
                            Monthly
                        </button>

                    </div>

                </div>

                <div className="export-buttons">

                    <button
                        className="pdf-btn"
                        onClick={() => downloadFile(reportType, "pdf")}
                    >
                        Export PDF
                    </button>

                    <button
                        className="csv-btn"
                        onClick={() => downloadFile(reportType, "csv")}
                    >
                        Export CSV
                    </button>

                </div>

                <table className="report-table">

                    <thead>

                        <tr>

                            <th>User Name</th>
                            <th>Total Activities</th>
                            <th>Total Emission (kg CO₂)</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            reports.length === 0 ?

                                <tr>
                                    <td colSpan="3" className="no-data">
                                        No Reports Available
                                    </td>
                                </tr>

                                :

                                reports.map((report, index) => (

                                    <tr key={index}>

                                        <td>{report.userName}</td>

                                        <td>{report.totalActivities}</td>

                                        <td>{report.totalEmission}</td>

                                    </tr>

                                ))
                        }

                    </tbody>

                </table>

            </div>

        </>
    );

};

export default Reports;