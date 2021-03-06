import { AddCircleOutline, NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs, Button, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
const JadwalPraktekNav = ({ formVisibilityChange }) => {
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
            <Stack
                spacing={2}
            >
                <Breadcrumbs
                    separator={<NavigateNext fontSize="small" />}
                    aria-label="breadcumb"
                    sx={{ color: 'black' }}
                >
                    <NavLink
                        to="/resepsionis"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        Resepsionis
                    </NavLink>
                    <NavLink
                        to="/resepsionis/jadwal-praktek"
                        style={{ textDecoration: 'none', color: 'inherit', cursor: 'default', fontWeight: 'bold' }}
                    >
                        Jadwal Praktek
                    </NavLink>
                </Breadcrumbs>
            </Stack>
            <Button
                variant="contained"
                component="span"
                endIcon={<AddCircleOutline />}
                sx={{
                    textTransform: 'capitalize',
                    gap: '0.5rem',
                    fontWeight: 'bold'
                }}
                onClick={formVisibilityChange}
            >
                Tambah jadwal
            </Button>
        </Box>
    )
}
export default JadwalPraktekNav