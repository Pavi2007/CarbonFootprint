import axios from "axios";

const API = "http://localhost:8080/api/admin/support";

const getToken = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getAllTickets = async () => {
    const response = await axios.get(API, getToken());
    return response.data;
};

export const getTicketById = async (id) => {
    const response = await axios.get(`${API}/${id}`, getToken());
    return response.data;
};

export const replyTicket = async (id, data) => {
    const response = await axios.put(`${API}/${id}/reply`, data, getToken());
    return response.data;
};

export const updateStatus = async (id, status) => {
    const response = await axios.put(
        `${API}/${id}/status`,
        { status },
        getToken()
    );
    return response.data;
};

export const deleteTicket = async (id) => {
    await axios.delete(`${API}/${id}`, getToken());
};