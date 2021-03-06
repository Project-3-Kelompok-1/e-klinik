import { LocalHospital } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu"
import { AppBar, Avatar, Box, Button, Container, CssBaseline, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DOMAIN_SERVER } from "../../../config";
import { UserContext } from "../../../Helpers/Context";
const pages = ['Profile', 'Pendaftaran', 'Pengobatan']
const settings = ['Akun', 'Keluar']
const Header = ({ username }) => {
    const { user } = useContext(UserContext)
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const navigate = useNavigate()
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const logout = () => {
        alert('Berhasil logout')
        fetch(DOMAIN_SERVER + '/api/logout', {
            headers: new Headers({
                'Authorization': `Bearer ${user.token}`
            })
        })
        localStorage.removeItem('user')
        navigate('/')
    }
    const handleCloseUserMenu = (setting) => {
        setAnchorElUser(null);
        if (setting === 'Keluar') {
            logout()
        }
    };
    return (
        <>
            <CssBaseline />
            <AppBar position="fixed">
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ alignItems: 'center' }}>
                        <LocalHospital
                            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                        >
                            <Link
                                to="/"
                                style={{
                                    fontFamily: 'monospace',
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    fontWeight: 'normal !important',
                                    ":hover": {
                                        fontWeight: 'bold !important',
                                        color: 'inherit',
                                        textDecoration: 'none',

                                    }
                                }}
                            >
                                Dr-Rezka
                            </Link>
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                component="span"
                                onClick={handleOpenNavMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left'
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' }
                                }}
                            >
                                {pages.map((page, i) => (
                                    <MenuItem
                                        onClick={handleCloseNavMenu}
                                        key={i}
                                    >
                                        <Typography
                                            textAlign="center"
                                        >
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <LocalHospital
                            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}
                        >
                            <Link
                                to="/"
                                style={{
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    ":hover": {
                                        color: 'inherit',
                                        textDecoration: 'none'
                                    }
                                }}
                            >
                                Dr-Rezka
                            </Link>
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                                marginX: 3
                            }}
                        >
                            {pages.map((page) => (
                                <Link
                                    key={page}
                                    to={`/${page.toLowerCase().replace(" ", "-")}`}
                                    style={{
                                        fontFamily: 'monospace',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        ":hover": {
                                            color: 'inherit',
                                            textDecoration: 'none',
                                            fontWeight: 700
                                        },
                                        margin: '0 .5rem'
                                    }}
                                >
                                    {page}
                                </Link>
                            ))}
                        </Box>
                        <Box
                            sx={{ flexGrow: 0 }}
                        >
                            <Tooltip
                                title="Buka pengaturan"
                            >
                                <IconButton
                                    component="span"
                                    sx={{ p: 0 }}
                                    onClick={handleOpenUserMenu}
                                >
                                    <Avatar
                                        src="/broken-image.jpg"
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={(e) => { handleCloseUserMenu(setting) }}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}
export default Header