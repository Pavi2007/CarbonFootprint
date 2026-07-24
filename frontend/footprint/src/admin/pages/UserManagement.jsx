import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../css/UserManagement.css";

import {
    getUsers,
    deleteUser
} from "../services/adminService";

const UserManagement = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

    try {

        const response = await getUsers();

        console.log(response.data);   // Add this

        setUsers(response.data);

    } catch (error) {

        console.log(error);

    }

};
    const handleDelete = async (id) => {

        if (!window.confirm("Delete this user?")) return;

        try {

            await deleteUser(id);

            loadUsers();

        } catch (error) {

            console.log(error);

            alert("Unable to delete user.");

        }

    };

    return (

        <>
            <AdminSidebar />
            <AdminNavbar />

            <div className="admin-content">

                <h1>User Management</h1>

                <table className="user-table">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            users.map(user => (

                                <tr key={user.id}>

                                    <td>{user.id}</td>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>{user.role}</td>

                                    <td>

                                        {

                                            user.role === "ADMIN"

                                            ?

                                            <button

                                                className="disabled-btn"

                                                disabled

                                            >

                                                Protected

                                            </button>

                                            :

                                            <button

                                                className="delete-btn"

                                                onClick={() => handleDelete(user.id)}

                                            >

                                                Delete

                                            </button>

                                        }

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </>

    );

};

export default UserManagement;