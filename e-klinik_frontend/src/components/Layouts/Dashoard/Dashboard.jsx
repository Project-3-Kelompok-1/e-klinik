import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { HealthAndSafety, EventAvailable, MedicalServices, Group } from '@mui/icons-material';
import { UserContext } from '../../../Helpers/Context';
import { useNavigate } from 'react-router-dom';
import "./style.css";
import { Avatar, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import { DOMAIN_SERVER } from '../../../config';
const drawerWidth = 240;
const settings = ['Akun', 'Keluar']
const Dashboard = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const logout = () => {
        alert("Berhasil logout")
        fetch(DOMAIN_SERVER + '/api/logout', {
            headers: new Headers({
                'Authorization': `Bearer ${user.token}`
            })
        })
        localStorage.removeItem('user')
        navigate('/')
    }
    const handleOpenUserMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleCloseUserMenu = (setting) => {
        setAnchorEl(null)
        if (setting === 'Keluar') {
            logout()
        }
    }
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem>
                    <Button color="primary"
                        component="span"
                        sx={{ textTransform: 'none', gap: '1.5rem', width: '100%', paddingX: '1rem' }}
                        variant={`${props.halaman === 'Dashboard Resepsionis' || props.halaman === 'Dashboard Dokter' ? 'contained' : 'text'}`}
                        startIcon={<DashboardIcon />}
                        onClick={() => {
                            if (user.role === 'resepsionis') {
                                navigate('/resepsionis')
                            }
                            else if (user.role === 'dokter') {
                                navigate('/dokter')
                            }
                        }}
                    >
                        <ListItemText primary="Dashboard" />
                    </Button>
                </ListItem>
                <ListItem>
                    <Button color="primary"
                        component="span"
                        sx={{ textTransform: 'none', gap: '1.5rem', width: '100%', paddingX: '1rem' }}
                        variant={`${props.halaman === 'Data Dokter' ? 'contained' : 'text'}`}
                        startIcon={<HealthAndSafety />}
                        onClick={() => {
                            if (user.role === 'resepsionis') {
                                navigate('/resepsionis/data-dokter')
                            }
                            else if (user.role === 'dokter') {
                                navigate('/dokter/data-dokter')
                            }
                        }}
                    >
                        <ListItemText primary="Data Dokter" />
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        color='primary'
                        component="span"
                        sx={{ textTransform: 'none', gap: '1.5rem', width: '100%', paddingX: '1rem' }}
                        variant={`${props.halaman === 'Jadwal Praktek' ? 'contained' : 'text'}`}
                        startIcon={<EventAvailable />}
                        onClick={() => {
                            if (user.role === 'resepsionis') {
                                navigate('/resepsionis/jadwal-praktek')
                            }
                            else if (user.role === 'dokter') {
                                navigate('/dokter/jadwal-praktek')
                            }
                        }}
                    >
                        <ListItemText primary="Jadwal Praktek" />
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        color='primary'
                        component="span"
                        sx={{ textTransform: 'none', gap: '1.5rem', width: '100%', paddingX: '1rem' }}
                        variant={`${props.halaman === 'Data Obat' ? 'contained' : 'text'}`}
                        startIcon={<MedicalServices />}
                        onClick={() => {
                            if (user.role === 'resepsionis') {
                                navigate('/resepsionis/data-obat')
                            }
                            else if (user.role === 'dokter') {
                                navigate('/dokter/data-obat')
                            }
                        }}
                    >
                        <ListItemText primary="Data Obat" />
                    </Button>
                </ListItem>
                <ListItem>
                    <Button color="primary"
                        component="span"
                        sx={{ textTransform: 'none', gap: '1.5rem', width: '100%', paddingX: '1rem' }}
                        variant={`${props.halaman === 'Data Pasien' ? 'contained' : 'text'}`}
                        startIcon={<Group />}
                        onClick={() => {
                            if (user.role === 'resepsionis') {
                                navigate('/resepsionis/data-pasien')
                            }
                            else if (user.role === 'dokter') {
                                navigate('/dokter/data-pasien')
                            }
                        }}
                    >
                        <ListItemText primary="Data Pasien" />
                    </Button>
                </ListItem>
                <ListItem>
                    <Button color="primary"
                        component="span"
                        sx={{ textTransform: 'none', gap: '1.5rem', width: '100%', paddingX: '1rem' }}
                        variant={`${props.halaman === 'Data Pendaftaran' ? 'contained' : 'text'}`}
                        startIcon={<Group />}
                        onClick={() => {
                            if (user.role === 'resepsionis') {
                                navigate('/resepsionis/data-pendaftaran')
                            }
                            else if (user.role === 'dokter') {
                                navigate('/dokter/data-pendaftaran')
                            }
                        }}
                    >
                        <ListItemText primary="Pendaftaran" />
                    </Button>
                </ListItem>
            </List>
            <Divider />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', userSelect: 'none' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
            >
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                            component="span"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            {props?.halaman ? props.halaman : 'Dashboard'}
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip
                            title="Buka pengaturan"
                        >
                            <IconButton
                                component="span"
                                sx={{ p: 0 }}
                                onClick={handleOpenUserMenu}
                            >
                                <Avatar src="/broken-image.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
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
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` }, backgroundColor: '#F7F7F7', height: '100vh', overflowX: 'hidden' }}
            >
                {props.children}
            </Box>
        </Box>
    );
}
export default Dashboard;