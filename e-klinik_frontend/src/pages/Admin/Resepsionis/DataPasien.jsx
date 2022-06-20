import { Toolbar } from "@mui/material";
import React from "react";
import Dashboard from "../../../components/Layouts/Dashoard/Dashboard";
import AdminPageNavigation from "../../../components/Navigations/AdminPageNavigation";
import TabelPasien from "../../../components/Tables/TabelPasien";
const DataPasien = () => {
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
                        console.log("Hello world");
                    }}
                />
                <TabelPasien />
            </Dashboard>
        </>
    )
}
export default DataPasien