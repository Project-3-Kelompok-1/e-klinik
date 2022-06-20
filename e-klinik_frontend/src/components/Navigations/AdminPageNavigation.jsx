import { AddCircleOutline } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import LeftNavigation from "./LeftNavigation";
const AdminPageNavigation = ({ handleShowForm, halaman, link, pageData }) => {
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
            <LeftNavigation halaman={halaman} link={link} />
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
                Tambah {pageData}
            </Button>
        </Box>
    )
}
export default AdminPageNavigation