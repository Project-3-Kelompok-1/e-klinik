import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../../components/Layouts/Dashoard/Dashboard";
import { UserContext } from "../../../Helpers/Context";

const Dokter = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    useEffect(() => {
        let unMounted = false;
        if (user?.role !== 'dokter' || !user) {
            navigate('/');
            return () => {
                unMounted = true;
            }
        }
    }, [user])
    return (
        <Dashboard halaman="Dashboard Dokter">
            <div>
                <h1>
                    Halaman Dokter
                </h1>
            </div>
        </Dashboard>
    )
}
export default Dokter;