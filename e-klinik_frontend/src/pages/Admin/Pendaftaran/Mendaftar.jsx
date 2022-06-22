import { Toolbar } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../../components/Layouts/Dashoard/Dashboard";
import { isResepsionis } from "../../../Helpers/checkUser";
import { UserContext } from "../../../Helpers/Context";
const Mendaftar = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isResepsionis()) {
            navigate('/')
        }
    }, [user])
    return (
        <Dashboard
            halaman="Pasien Mendaftar"
        >
            <Toolbar />
        </Dashboard>
    )
}
export default Mendaftar