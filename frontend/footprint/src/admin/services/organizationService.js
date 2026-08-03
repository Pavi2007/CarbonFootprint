import axios from "axios";

const API = "http://localhost:8080/api/admin/organization";

const getToken = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getOrganizationDetails = async () => {

    const response = await axios.get(API, getToken());

    return response.data;

};