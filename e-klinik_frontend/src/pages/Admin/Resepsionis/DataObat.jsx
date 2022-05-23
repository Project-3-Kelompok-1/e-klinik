import { Toolbar, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import Dashboard from "../../../components/Layouts/Dashoard/Dashboard";
import DataObatNav from "../../../components/Navigations/DataObatNav";
import TabelObat from "../../../components/Tables/TabelObat";
import { useTheme } from "@mui/material/styles";
import FormObat from "../../../components/Forms/FormObat";

const DataObat = () => {
    const [showForm, setShowForm] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleShowForm = () => {
        setShowForm(true);
    }
    const handleHideForm = () => {
        setShowForm(false);
    }
    return (
        <>
            <Dashboard
                halaman="Data Obat"
            >
                <Toolbar />
                <DataObatNav handleShowForm={handleShowForm} />
                <TabelObat />
            </Dashboard>
            <FormObat
                fullScreen={fullScreen}
                showForm={showForm}
                handleHideForm={handleHideForm}
            />
        </>
    )
}
export default DataObat