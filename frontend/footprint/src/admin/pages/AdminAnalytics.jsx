import { useEffect, useState } from "react";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import { getOrganizationDetails } from "../services/organizationService";

import "../css/Admin.css";

const Organization = () => {

    const [organization, setOrganization] = useState(null);

    useEffect(() => {

        loadOrganization();

    }, []);

    const loadOrganization = async () => {

        try {

            const data = await getOrganizationDetails();

            setOrganization(data);

        }

        catch (err) {

            console.log(err);

        }

    };

    if (!organization) {

        return (

            <>
                <AdminSidebar />
                <AdminNavbar />

                <div className="admin-content">

                    <h1>Organization Dashboard</h1>

                    <p>Loading...</p>

                </div>
            </>

        );

    }

    return (

        <>

            <AdminSidebar />

            <AdminNavbar />

            <div className="admin-content">

                <h1>Organization Dashboard</h1>

                <div className="organization-card">

                    <h2>{organization.organizationName}</h2>

                    <p>📍 {organization.location}</p>

                </div>

                <div className="organization-grid">

                    <div className="organization-box">

                        <h3>👥 Total Users</h3>

                        <p>{organization.totalUsers}</p>

                    </div>

                    <div className="organization-box">

                        <h3>📋 Total Activities</h3>

                        <p>{organization.totalActivities}</p>

                    </div>

                    <div className="organization-box">

                        <h3>🌱 Total Emission</h3>

                        <p>{organization.totalEmission} kg</p>

                    </div>

                    <div className="organization-box">

                        <h3>🏆 Top Performer</h3>

                        <p>{organization.topPerformer}</p>

                    </div>

                    <div className="organization-box">

                        <h3>🚗 Highest Emission</h3>

                        <p>{organization.highestEmissionCategory}</p>

                    </div>

                </div>

            </div>

        </>

    );

};

export default Organization;