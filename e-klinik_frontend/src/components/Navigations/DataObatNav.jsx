import { AddCircleOutline, NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs, Button, Stack } from "@mui/material";
import React from "react";
import LeftNavigation from "./LeftNavigation";
const DataObatNav = ({ handleShowForm }) => {
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
            <Button
                variant="contained"
                component="span"
                endIcon={<AddCircleOutline />}
                sx={{
                    textTransform: 'capitalize',
                    gap: '0.5rem'
                }}
                onClick={handleShowForm}
            >
                Tambah obat
            </Button>
        </Box>
    )
}
export default DataObatNav