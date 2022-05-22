import { NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs, Button, Stack } from "@mui/material";
import React from "react";
import LeftNavigation from "./LeftNavigation";
const DataObatNav = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '1rem 2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}
        >
         <LeftNavigation
            halaman="Data Obat"
            link="/resepsionis/data-obat"
         />
        </Box>
    )
}
export default DataObatNav