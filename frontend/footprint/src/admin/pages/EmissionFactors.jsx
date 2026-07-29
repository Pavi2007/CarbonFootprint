import { useEffect, useState } from "react";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import EmissionFactorForm from "../components/EmissionFactorForm";

import "../css/Admin.css";
import "../css/EmissionFactors.css";

import {
    getAllFactors,
    addFactor
} from "../services/emissionFactorService";

const EmissionFactors = () => {

    const [factors, setFactors] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadFactors();
    }, []);

    const loadFactors = async () => {
        try {
            const data = await getAllFactors();
            setFactors(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async (factor) => {
        try {
            await addFactor(factor);
            setShowForm(false);
            loadFactors();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <AdminSidebar />

            <div className="admin-main">

                <AdminNavbar />

                <div className="admin-content">

                    <div className="page-header">
                        <div>
                            <h1>Emission Factor Management</h1>
                            <p>
                                Manage carbon emission factors used for carbon footprint calculations.
                            </p>
                        </div>
                    </div>

                    <div className="factor-card">

                        <div className="factor-toolbar">

                            <div className="search-box">
                                <input
                                    type="text"
                                    placeholder="Search Activity..."
                                />
                            </div>

                            <button
                                className="add-btn"
                                onClick={() => setShowForm(true)}
                            >
                                + Add Factor
                            </button>

                        </div>

                        <table className="factor-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Activity Type</th>
                                    <th>Category</th>
                                    <th>Emission Factor</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {factors.length > 0 ? (

                                    factors.map((factor) => (

                                        <tr key={factor.id}>

                                            <td>{factor.id}</td>
                                            <td>{factor.activityType}</td>
                                            <td>{factor.category}</td>
                                            <td>{factor.factor}</td>

                                            <td>

                                                <div className="action-buttons">

                                                    <button className="edit-btn">
                                                        Edit
                                                    </button>

                                                    <button className="delete-btn">
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td
                                            colSpan="5"
                                            style={{
                                                textAlign: "center",
                                                padding: "25px"
                                            }}
                                        >
                                            No Emission Factors Found
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

                {showForm && (
                    <EmissionFactorForm
                        onSave={handleSave}
                        onClose={() => setShowForm(false)}
                    />
                )}

            </div>

        </>
    );
};

export default EmissionFactors;