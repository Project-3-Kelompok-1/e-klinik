import { Dialog, Slide, Snackbar, Toolbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Alert from "../../../components/Feedback/Alert";
import DaftarkanPasien from "../../../components/Forms/DaftarkanPasien";
import FormPasien from "../../../components/Forms/FormPasien";
import HapusPasien from "../../../components/Forms/HapusPasien";
import Dashboard from "../../../components/Layouts/Dashoard/Dashboard";
import AdminPageNavigation from "../../../components/Navigations/AdminPageNavigation";
import TabelPasien from "../../../components/Tables/TabelPasien";
import { DOMAIN_SERVER } from "../../../config";
import { UserContext } from "../../../Helpers/Context";
import useAlert from "../../../Helpers/CustomHooks/useAlert";
import useDialog from "../../../Helpers/CustomHooks/useDialog";
const DataPasien = () => {
    const { user } = useContext(UserContext)
    const [pasien, setPasien] = useState([])
    const [selectedPasien, setSelectedPasien] = useState(null)
    const [open, handleClickOpen, handleClose] = useDialog()
    const [openDelete, handleClickDelete, handleCancelDelete] = useDialog()
    const [
        openRegistration,
        handleClickRegistration,
        handleCancelRegistration
    ] = useDialog()
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
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
    const fetchPasien = () => {
        setLoading(true)
        const params = {
            headers: new Headers({
                'Authorization': `Bearer ${user.token}`
            })
        }
        fetch(DOMAIN_SERVER + '/api/pasien?search=' + search, params)
            .then(response => response.json())
            .then(data => {
                if (data?.status !== 'success') {
                    throw data
                }
                setPasien(data?.data_pasien)
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(true)
            })
    }
    useEffect(() => {
        fetchPasien()
    }, [search])
    return (
        <>
            <Dashboard
                halaman="Data Pasien"
            >
                <Toolbar />
                <AdminPageNavigation
                    halaman="Data Pasien"
                    link="/resepsionis/data-pasien"
                    pageData="pasien"
                    handleShowForm={() => {
                        handleClickOpen(() => {
                            console.log("Hello world");
                        })
                    }}
                    value={search}
                    onChange={handleChangeSearch}
                    search
                />
                <TabelPasien
                    pasien={pasien}
                    setSelectedPasien={setSelectedPasien}
                    handleClickOpen={handleClickOpen}
                    handleClickDelete={handleClickDelete}
                    handleClickRegistration={handleClickRegistration}
                    loading={loading}
                />
            </Dashboard>
            <FormPasien
                TransitionComponent={Slide}
                fullWidth={true}
                maxWidth="md"
                selectedPasien={selectedPasien}
                fetchPasien={fetchPasien}
                open={open}
                onClose={() => {
                    handleClose(() => {
                        setSelectedPasien(null)
                    })
                }}
                handleShowAlert={handleShowAlert}
            />
            <HapusPasien
                TransitionComponent={Slide}
                fullWidth
                selectedPasien={selectedPasien}
                open={openDelete}
                fetchPasien={fetchPasien}
                onClose={() => {
                    handleCancelDelete(() => {
                        setSelectedPasien(null)
                    })
                }}
                handleShowAlert={handleShowAlert}
            />
            <DaftarkanPasien
                TransitionComponent={Slide}
                fullWidth
                selectedPasien={selectedPasien}
                fetchPasien={fetchPasien}
                open={openRegistration}
                onClose={() => {
                    handleCancelRegistration(() => {
                        setSelectedPasien(null)
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
        </>
    )
}
export default DataPasien