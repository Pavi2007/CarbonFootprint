import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../css/BadgeManagement.css";

const API = "http://localhost:8080/api/admin/badges";

const BadgeManagement = () => {

    const [badges, setBadges] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        badgeName: "",
        description: "",
        requiredScore: ""
    });

    useEffect(() => {
        fetchBadges();
    }, []);

    const fetchBadges = async () => {
        try {
            const res = await axios.get(API, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            setBadges(res.data);

        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const openAddModal = () => {
        setEditingId(null);
        setFormData({
            badgeName: "",
            description: "",
            requiredScore: ""
        });
        setShowModal(true);
    };

    const openEditModal = (badge) => {
        setEditingId(badge.id);
        setFormData(badge);
        setShowModal(true);
    };

    const saveBadge = async () => {

        try {

            if (editingId) {

                await axios.put(
                    `${API}/${editingId}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

            } else {

                await axios.post(
                    API,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

            }

            fetchBadges();
            setShowModal(false);

        } catch (err) {
            console.error(err);
        }
    };

    const deleteBadge = async (id) => {

        if (!window.confirm("Delete this badge?")) return;

        try {

            await axios.delete(`${API}/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            fetchBadges();

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <AdminSidebar />
            <AdminNavbar />

            <div className="admin-content">

                <div className="badge-header">

                    <h1>Badge Management</h1>

                    <button
                        className="add-badge-btn"
                        onClick={openAddModal}
                    >
                        + Add Badge
                    </button>

                </div>

                <table className="badge-table">

                    <thead>

                        <tr>
                            <th>Badge Name</th>
                            <th>Description</th>
                            <th>Required Score</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            badges.length === 0 ?

                                <tr>
                                    <td colSpan="4">No Badges Found</td>
                                </tr>

                                :

                                badges.map((badge) => (

                                    <tr key={badge.id}>

                                        <td>{badge.badgeName}</td>

                                        <td>{badge.description}</td>

                                        <td>{badge.requiredScore}</td>

                                        <td>

                                            <button
                                                className="edit-btn"
                                                onClick={() => openEditModal(badge)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() => deleteBadge(badge.id)}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))
                        }

                    </tbody>

                </table>

                {
                    showModal &&

                    <div className="badge-modal">

                        <div className="badge-modal-content">

                            <h2>
                                {editingId ? "Edit Badge" : "Add Badge"}
                            </h2>

                            <input
                                type="text"
                                name="badgeName"
                                placeholder="Badge Name"
                                value={formData.badgeName}
                                onChange={handleChange}
                            />

                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                            />

                            <input
                                type="number"
                                name="requiredScore"
                                placeholder="Required Score"
                                value={formData.requiredScore}
                                onChange={handleChange}
                            />

                            <div className="modal-actions">

                                <button onClick={saveBadge}>
                                    Save
                                </button>

                                <button
                                    className="cancel-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                }

            </div>
        </>
    );
};

export default BadgeManagement;