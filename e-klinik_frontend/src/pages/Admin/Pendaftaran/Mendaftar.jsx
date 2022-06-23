import { Slide, Snackbar, Toolbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/Feedback/Alert";
import ChangeAppointmentStatus from "../../../components/Forms/ChangeAppointmentStatus";
import Dashboard from "../../../components/Layouts/Dashoard/Dashboard";
import AdminPageNavigation from "../../../components/Navigations/AdminPageNavigation";
import PasienMendaftar from "../../../components/Tables/PasienMendaftar";
import { DOMAIN_SERVER } from "../../../config";
import { isResepsionis } from "../../../Helpers/checkUser";
import { UserContext } from "../../../Helpers/Context";
import useAlert from "../../../Helpers/CustomHooks/useAlert";
import useDialog from "../../../Helpers/CustomHooks/useDialog";
const Mendaftar = () => {
    const [appointment, setAppointment] = useState([])
    const [selectedAppoitment, setSelectedAppointment] = useState(null)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [open, handleClickStatus, handleClose] = useDialog()
    const [
        openAlert,
        severity,
        message,
        handleShowAlert,
        handleHideAlert
    ] = useAlert()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isResepsionis()) {
            navigate('/')
        }
    }, [user])
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
        fetch(DOMAIN_SERVER + '/api/appointment/todays_registration?search=' + search, params)
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
                handleShowAlert("error", 'Server Error')
            })
    }
    useEffect(() => {
        fetchAppointment()
    }, [search])
    return (
        <Dashboard
            halaman="Pasien Mendaftar"
        >
            <Toolbar />
            <AdminPageNavigation
                halaman="Pasien Mendaftar"
                link="/resepsionis/pendaftaran/mendaftar"
                search
                value={search}
                onChange={handleChangeSearch}
            />
            <PasienMendaftar
                appointment={appointment}
                loading={loading}
                handleClickStatus={handleClickStatus}
                setSelectedAppointment={setSelectedAppointment}
            />
            <ChangeAppointmentStatus
                TransitionComponent={Slide}
                fullWidth
                selectedAppoitment={selectedAppoitment}
                status="menunggu"
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
export default Mendaftar