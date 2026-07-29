import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../css/Admin.css";

import {
    getAllTickets,
    getTicketById,
    replyTicket,
    updateStatus,
    deleteTicket
} from "../services/adminSupportService";

const AdminSupport = () => {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        loadTickets();
    }, []);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [reply, setReply] = useState("");
    const [status, setStatus] = useState("");
        const loadTickets = async () => {
        try {
            const data = await getAllTickets();
            setTickets(data);
        } catch (err) {
            console.log(err);
        }
    };
    const handleReply = async (id) => {
    try {
        const data = await getTicketById(id);

        setSelectedTicket(data);
        setReply(data.reply || "");
        setStatus(data.status);

        setShowModal(true);

    } catch (err) {
        console.log(err);
    }
};
const handleSave = async () => {

    try {

        await replyTicket(selectedTicket.id, {
            reply: reply
        });

        await updateStatus(selectedTicket.id, status);

        alert("Ticket updated successfully.");

        setShowModal(false);

        loadTickets();

    } catch (err) {
        console.log(err);
    }

};

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this support ticket?")) return;

        try {
            await deleteTicket(id);
            loadTickets();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <AdminSidebar />
            <AdminNavbar />

            <div className="admin-content">

                <h1>Support Tickets</h1>

                <table className="admin-table">

                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {tickets.length === 0 ? (

                            <tr>
                                <td colSpan="5">
                                    No support tickets found.
                                </td>
                            </tr>

                        ) : (

                            tickets.map(ticket => (

                                <tr key={ticket.id}>

                                    <td>{ticket.userName}</td>

                                    <td>{ticket.subject}</td>

                                    <td>{ticket.status}</td>

                                    <td>
                                        {new Date(ticket.createdAt).toLocaleDateString()}
                                    </td>

                                    <td>

                                        <button
                                            className="edit-btn"
                                            onClick={() => handleReply(ticket.id)}
                                        >
                                            Reply
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(ticket.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>
        {showModal && selectedTicket && (

            <div className="modal-overlay">

                <div className="ticket-modal">

                    <h2>Reply to Support Ticket</h2>

                    <p><strong>User:</strong> {selectedTicket.userName}</p>

                    <p><strong>Subject:</strong> {selectedTicket.subject}</p>

                    <p><strong>Message:</strong></p>

                    <textarea
                        value={selectedTicket.message}
                        readOnly
                        rows="4"
                    />

                    <p><strong>Reply</strong></p>

                    <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        rows="4"
                    />

                    <p><strong>Status</strong></p>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="OPEN">OPEN</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="RESOLVED">RESOLVED</option>
                    </select>

                    <div className="modal-buttons">

                        <button
                            className="save-btn"
                            onClick={handleSave}
                        >
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

            )}
        </>
    );

};

export default AdminSupport;