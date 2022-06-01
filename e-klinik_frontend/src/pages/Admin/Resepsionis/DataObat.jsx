import { Snackbar, Toolbar, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../../../components/Layouts/Dashoard/Dashboard";
import DataObatNav from "../../../components/Navigations/DataObatNav";
import TabelObat from "../../../components/Tables/TabelObat";
import { useTheme } from "@mui/material/styles";
import FormObat from "../../../components/Forms/FormObat";
import { DOMAIN_SERVER } from "../../../config";
import { UserContext } from "../../../Helpers/Context";
import { useNavigate } from "react-router-dom";
import HapusObat from "../../../components/Forms/HapusObat";
import Alert from "../../../components/Feedback/Alert";
const url = {
    index: DOMAIN_SERVER + '/api/data-obat'
}
const DataObat = () => {
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [dataObat, setDataObat] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [selectedObat, setSelectedObat] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        let unMounted = false;
        if (user?.role !== 'resepsionis' || !user) {
            navigate('/login');
            return () => {
                unMounted = true
            }
        }
    }, [user])
    const fetchData = () => {
        setLoading(true)
        fetch(url.index, {
            headers: new Headers({
                'Authorization': `Bearer ${user.token}`
            })
        })
            .then(response => response.json())
            .then(data => {
                setDataObat(data?.obat)
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
            })
    }
    useEffect(() => {
        fetchData();
    }, [])
    const handleShowDelete = (data) => {
        setShowDelete(true);
        setSelectedObat(data);
    }
    const handleHideDelete = () => {
        setShowDelete(false);
        setSelectedObat(null);
    }
    const handleShowForm = () => {
        setShowForm(true);
    }
    const handleHideForm = () => {
        setShowForm(false);
    }
    const handleShowAlert = (type, message) => {
        setSeverity(type);
        setAlertMessage(message);
        setOpenAlert(true);
    }
    const handleHideAlert = () => {
        setAlertMessage('');
        setOpenAlert(false);
    }
    return (
        <>
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
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Dashboard
                halaman="Data Obat"
            >
                <Toolbar />
                <DataObatNav handleShowForm={handleShowForm} />
                <TabelObat
                    dataObat={dataObat}
                    loading={loading}
                    handleShowDelete={handleShowDelete}
                />
            </Dashboard>
            <FormObat
                fullScreen={fullScreen}
                showForm={showForm}
                handleHideForm={handleHideForm}
                fetchData={fetchData}
                user={user}
                handleShowAlert={handleShowAlert}
            />
            <HapusObat
                showDelete={showDelete}
                handleHideDelete={handleHideDelete}
                obat={selectedObat}
                user={user}
                fetchData={fetchData}
                handleShowAlert={handleShowAlert}
            />
        </>
    )
}
export default DataObat