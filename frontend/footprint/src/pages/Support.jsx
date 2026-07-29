import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Support.css";

import {
    createTicket,
    getMyTickets,
    getTicketById
} from "../services/supportService";

const Support = () => {

    const [tickets, setTickets] = useState([]);

    const [form, setForm] = useState({
        subject: "",
        message: ""
    });

    const [showModal, setShowModal] = useState(false);

    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const data = await getMyTickets();
            setTickets(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createTicket(form);

            alert("Support ticket submitted successfully.");

            setForm({
                subject: "",
                message: ""
            });

            loadTickets();

        } catch (err) {
            console.log(err);
        }
    };

    const handleView = async (id) => {

        try {

            const data = await getTicketById(id);

            setSelectedTicket(data);

            setShowModal(true);

        } catch (err) {
            console.log(err);
        }
    };

    return (

        <>
            <Sidebar />
            <Navbar />

            <div className="main-content">

                <div className="support-container">

                    <h2>Support Center</h2>

                    <p>
                        Need help? Submit a support ticket and our admin will reply.
                    </p>

                    <form
                        className="support-form"
                        onSubmit={handleSubmit}
                    >

                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={form.subject}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="message"
                            placeholder="Describe your issue..."
                            value={form.message}
                            onChange={handleChange}
                            rows="5"
                            required
                        />

                        <button type="submit">
                            Submit Ticket
                        </button>

                    </form>

                    <h3>My Support Tickets</h3>

                    <table className="support-table">

                        <thead>

                            <tr>

                                <th>Subject</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>View</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                tickets.length === 0 ?

                                    <tr>

                                        <td colSpan="4">
                                            No support tickets found.
                                        </td>

                                    </tr>

                                    :

                                    tickets.map(ticket => (

                                        <tr key={ticket.id}>

                                            <td>{ticket.subject}</td>

                                            <td>

                                                <span className={`status ${ticket.status.toLowerCase()}`}>

                                                    {ticket.status}

                                                </span>

                                            </td>

                                            <td>

                                                {new Date(ticket.createdAt).toLocaleDateString()}

                                            </td>

                                            <td>

                                                <button
                                                    className="view-btn"
                                                    onClick={() => handleView(ticket.id)}
                                                >

                                                    View

                                                </button>

                                            </td>

                                        </tr>

                                    ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

            {

                showModal && selectedTicket &&

                <div className="modal-overlay">

                    <div className="ticket-modal">

                        <h2>Support Ticket</h2>

                        <p>

                            <strong>Subject:</strong>

                            {selectedTicket.subject}

                        </p>

                        <p>

                            <strong>Message:</strong>

                            {selectedTicket.message}

                        </p>

                        <p>

                            <strong>Admin Reply:</strong>

                            {

                                selectedTicket.reply ?

                                    selectedTicket.reply

                                    :

                                    "Waiting for admin response..."

                            }

                        </p>

                        <p>

                            <strong>Status:</strong>

                            {selectedTicket.status}

                        </p>

                        <button
                            onClick={() => setShowModal(false)}
                        >

                            Close

                        </button>

                    </div>

                </div>

            }

        </>

    );

};

export default Support;