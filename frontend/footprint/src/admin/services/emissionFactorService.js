import axios from "axios";

const API_URL = "http://localhost:8080/api/admin/emission-factors";

const getToken = () => localStorage.getItem("token");

const config = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getAllFactors = async () => {
    const res = await axios.get(API_URL, config());
    return res.data;
};

export const addFactor = async (factor) => {
    const res = await axios.post(API_URL, factor, config());
    return res.data;
};

export const updateFactor = async (id, factor) => {
    const res = await axios.put(`${API_URL}/${id}`, factor, config());
    return res.data;
};

export const deleteFactor = async (id) => {
    await axios.delete(`${API_URL}/${id}`, config());
};