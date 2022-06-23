import { Slide, Snackbar, Toolbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/Feedback/Alert";
import ChangeAppointmentStatus from "../../../components/Forms/ChangeAppointmentStatus";
import Dashboard from "../../../components/Layouts/Dashoard/Dashboard";
import AdminPageNavigation from "../../../components/Navigations/AdminPageNavigation";
import PasienMenunggu from "../../../components/Tables/PasienMenunggu";
import { DOMAIN_SERVER } from "../../../config";
import { isResepsionis } from "../../../Helpers/checkUser";
import { UserContext } from "../../../Helpers/Context";
import useAlert from "../../../Helpers/CustomHooks/useAlert";
import useDialog from "../../../Helpers/CustomHooks/useDialog";
const Menunggu = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [appointment, setAppointment] = useState([])
    const [selectedAppoitment, setSelectedAppointment] = useState(null)
    const [loading, setLoading] = useState(false)
    const [open, handleClickStatus, handleClose] = useDialog()
    const [
        openAlert,
        severity,
        message,
        handleShowAlert,
        handleHideAlert
    ] = useAlert()

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (!isResepsionis()) {
            navigate('/')
        }
    }, [user])
    const fetchAppointment = () => {
        setLoading(true)
        const params = {
            headers: new Headers({
                'Authorization': `Bearer ${user.token}`
            })
        }
        fetch(DOMAIN_SERVER + '/api/appointment/todays_waiting?search=' + search, params)
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
    useEffect(() => {
        fetchAppointment()
    }, [search])
    return (
        <Dashboard
            halaman="Pasien Menunggu"
        >
            <Toolbar />
            <AdminPageNavigation
                halaman="Pasien Menunggu"
                link="/resepsionis/pendaftaran/menunggu"
                search
                value={search}
                onChange={handleChangeSearch}
            />
            <PasienMenunggu
                appointment={appointment}
                loading={loading}
                handleClickStatus={handleClickStatus}
                setSelectedAppointment={setSelectedAppointment}
            />
            <ChangeAppointmentStatus
                TransitionComponent={Slide}
                fullWidth
                selectedAppoitment={selectedAppoitment}
                status="diperiksa"
                open={open}
                fetchAppoitment={fetchAppointment}
                onClose={() => {
                    handleClose(() => {
                        setSelectedAppointment(null)
                    })
                }}
                handleShowAlert={handleShowAlert}
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
export default Menunggu