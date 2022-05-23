import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNext from "@mui/icons-material/NavigateNext";
import { NavLink } from "react-router-dom";
import React from "react";
const LeftNavigation = ({ halaman, link }) => {
    return (
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
                    to={link}
                    style={{ textDecoration: 'none', color: 'inherit', cursor: 'default', fontWeight: 'bold' }}
                >
                    {halaman}
                </NavLink>
            </Breadcrumbs>
        </Stack>
    )
}
export default LeftNavigation