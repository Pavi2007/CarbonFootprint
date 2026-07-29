import axios from "axios";

const API = "http://localhost:8080/api/support";

const getToken = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const createTicket = async (ticket) => {
    const response = await axios.post(API, ticket, getToken());
    return response.data;
};

export const getMyTickets = async () => {
    const response = await axios.get(`${API}/my-tickets`, getToken());
    return response.data;
};

export const getTicketById = async (id) => {
    const response = await axios.get(`${API}/${id}`, getToken());
    return response.data;
};