import { Snackbar, Toolbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/Feedback/Alert";
import Dashboard from "../../../components/Layouts/Dashoard/Dashboard";
import AdminPageNavigation from "../../../components/Navigations/AdminPageNavigation";
import PasienDiperiksa from "../../../components/Tables/PasienDiperiksa";
import { DOMAIN_SERVER } from "../../../config";
import { isResepsionis } from "../../../Helpers/checkUser";
import { UserContext } from "../../../Helpers/Context";
import useAlert from "../../../Helpers/CustomHooks/useAlert";
const Diperiksa = () => {
    // State Managements
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [appointment, setAppointment] = useState([])
    const [selectedAppoitment, setSelectedAppointment] = useState(null)
    const [loading, setLoading] = useState(false)
    const [
        openAlert,
        severity,
        message,
        handleShowAlert,
        handleHideAlert
    ] = useAlert()

    // Handle functions
    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }
    const fetchAppointment = () => {
        setLoading(true)
        const params = {
            headers: new Headers({
                'Authorization': `Bearer ${user.token}`
            })
        }
        fetch(DOMAIN_SERVER + '/api/appointment/todays_checking?search=' + search, params)
            .then(response => response.json())
            .then(data => {
                if (data?.status !== 'success') {
                    throw data
                }
                setAppointment(data?.todays_appointment)
                setLoading(false)
            })
            .catch(error => {
                setLoading(true)
                handleShowAlert("error", "Server Error")
            })
    }

    // Lifecycles
    useEffect(() => {
        if (!isResepsionis()) {
            navigate('/')
        }
    }, [user])
    useEffect(() => {
        fetchAppointment()
    }, [search])
    return (
        <Dashboard
            halaman="Pasien Diperiksa"
        >
            <Toolbar />
            <AdminPageNavigation
                halaman="Pasien Diperiksa"
                link="/resepsionis/pendaftaran/diperiksa"
                search
                value={search}
                onChange={handleChangeSearch}
            />
            <PasienDiperiksa
                appointment={appointment}
                loading={loading}
                setSelectedAppointment={setSelectedAppointment}
            />
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleHideAlert}
            >
                <Alert
                    onClose={handleHideAlert}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Dashboard>
    )
}
export default Diperiksa