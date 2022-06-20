import { Dialog, Slide, Toolbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import FormPasien from "../../../components/Forms/FormPasien";
import Dashboard from "../../../components/Layouts/Dashoard/Dashboard";
import AdminPageNavigation from "../../../components/Navigations/AdminPageNavigation";
import TabelPasien from "../../../components/Tables/TabelPasien";
import { DOMAIN_SERVER } from "../../../config";
import { UserContext } from "../../../Helpers/Context";
import useDialog from "../../../Helpers/CustomHooks/useDialog";
const DataPasien = () => {
    const { user } = useContext(UserContext)
    const [pasien, setPasien] = useState([])
    const [selectedPasien, setSelectedPasien] = useState(null)
    const [open, handleClickOpen, handleClose] = useDialog()
    const fetchPasien = () => {
        const params = {
            headers: new Headers({
                'Authorization': `Bearer ${user.token}`
            })
        }
        fetch(DOMAIN_SERVER + '/api/pasien', params)
            .then(response => response.json())
            .then(data => {
                if (data?.status !== 'success') {
                    throw data
                }
                setPasien(data?.data_pasien)
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        fetchPasien()
    }, [])
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
                />
                <TabelPasien
                    pasien={pasien}
                    setSelectedPasien={setSelectedPasien}
                    handleClickOpen={handleClickOpen}
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
            />
        </>
    )
}
export default DataPasien