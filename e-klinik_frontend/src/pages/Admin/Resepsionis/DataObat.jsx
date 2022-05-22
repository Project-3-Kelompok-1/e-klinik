import { Toolbar } from "@mui/material";
import React from "react";
import Dashboard from "../../../components/Layouts/Dashoard/Dashboard";
import DataObatNav from "../../../components/Navigations/DataObatNav";
const DataObat = () => {
    return (
        <>
            <Dashboard
                halaman="Data Obat"
            >
                <Toolbar />
                <DataObatNav />
            </Dashboard>
        </>
    )
}
export default DataObat