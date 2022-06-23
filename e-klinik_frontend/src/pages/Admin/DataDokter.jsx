import {
    AddCircleOutline,
    NavigateNext,
    Search,
} from "@mui/icons-material";
import {
    Box, Breadcrumbs, Button, FormControl,
    IconButton, InputAdornment, InputLabel,
    MenuItem, OutlinedInput, Paper, Select,
    Stack, Table, TableBody,
    TableCell, TableContainer, TableHead,
    TableRow, Toolbar, Typography, Snackbar,
    Alert as MuiAlert, Popover
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Dashboard from "../../components/Layouts/Dashoard/Dashboard";
import { UserContext } from "../../Helpers/Context";
import { makeStyles } from '@mui/styles';
import "./data-dokter.css";
import { blue } from "@mui/material/colors";
import { DOMAIN_SERVER } from "../../config";
import CircularProgress from '@mui/material/CircularProgress';
import ProfileDokter from "../../components/Popover/ProfileDokter";
import HapusDokter from "../../components/Forms/HapusDokter";
import FormDokter from "../../components/Forms/FormDokter";
import { isDokter, isResepsionis } from "../../Helpers/checkUser";
const useStyles = makeStyles({
    paper: {
        backgroundColor: blue['700']
    },
    text: {
        color: 'white'
    }
})
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
const url = {
    getDokter: DOMAIN_SERVER + '/api/dokter'
}
const DataDokter = (props) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const itemValue = [10, 20, 30, 40, 50];
    const [dataCount, setDataCount] = useState(itemValue[0]);
    const classes = useStyles(props);
    const [showTambahDokter, setShowTambahDokter] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [anchorPopover, setAnchorPopover] = useState(null);
    const [dataDokter, setDataDokter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [fetchUrl, setFetchUrl] = useState(url.getDokter);
    const [selectDokter, setSelectDokter] = useState({});
    const [openHapusDokter, setOpenHapusDokter] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const closeHapusDokter = () => {
        setOpenHapusDokter(false);
    }
    const showSelectDokter = (dokter) => {
        setSelectDokter(dokter);
    }
    const openPopover = (event) => {
        setAnchorPopover(event.currentTarget);
    }
    const closePopover = () => {
        setAnchorPopover(null);
        setSelectDokter({});
    }
    const open = Boolean(anchorPopover);
    const idPopover = open ? 'simple-popover' : undefined;

    const closeSnackBar = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    }
    const fetchData = () => {
        setLoading(true)
        fetch(fetchUrl).
            then(response => response.json())
            .then(data => {
                setDataDokter(data?.dokter)
                setLoading(false);
            })
            .catch(error => {
                setLoading(true)
            })
    }
    useEffect(() => {
        // setLoading(true)
        if (search) {
            setFetchUrl(url.getDokter + `?search=${search}`)
        }
        else {
            setFetchUrl(url.getDokter)
        }
        // fetchData();
    }, [search])
    useEffect(() => {
        fetchData();
    }, [fetchUrl])
    useEffect(() => {
        if (!isResepsionis() && !isDokter()) {
            navigate('/');
        }
    }, [user])
    return (
        <>
            {/* Component Snackbar alert */}
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={closeSnackBar}
            >
                <Alert
                    onClose={closeSnackBar}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {messageAlert}
                </Alert>
            </Snackbar>

            {/* Component dialog hapus dokter */}
            <HapusDokter
                open={openHapusDokter}
                handleClose={closeHapusDokter}
                selectDokter={selectDokter}
                fetchData={fetchData}
                user={user}
                closePopover={closePopover}
            />

            {/* Component popover profil dokter */}
            <ProfileDokter
                elevation={5}
                id={idPopover}
                open={open}
                anchorEl={anchorPopover}
                onClose={closePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{ display: openHapusDokter ? 'none' : 'initial' }}
                selectDokter={selectDokter}
                setOpenHapusDokter={setOpenHapusDokter}
                setShowFormDokter={setShowTambahDokter}
            />

            {/* Component modal form dokter */}

            <FormDokter
                showFormDokter={showTambahDokter}
                setShowFormDokter={setShowTambahDokter}
                user={user}
                openSnackBar={openSnackBar}
                setOpenSnackBar={setOpenSnackBar}
                fetchData={fetchData}
                selectDokter={selectDokter}
                closePopover={closePopover}
                setMessageAlert={setMessageAlert}
            />

            {/* Componnet utama dashboard */}
            <Dashboard halaman="Data Dokter">
                <Toolbar />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        // backgroundColor: '#fff',
                        // border: 'solid 1px #E0E0E0',
                        alignItems: 'center',
                        // padding: '1rem 2rem',
                        margin: '1rem 2rem',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}
                >
                    <Stack spacing={2}>
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
                                to="/resepsionis/data-dokter"
                                style={{ textDecoration: 'none', color: 'inherit', cursor: 'default', fontWeight: 'bold' }}
                            >
                                Data Dokter
                            </NavLink>
                        </Breadcrumbs>
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <Typography>
                                Tampilkan
                            </Typography>
                            <FormControl size="small" fullWidth>
                                <InputLabel id="tampilkan">
                                    Jumlah
                                </InputLabel>
                                <Select
                                    labelId="tampilkan"
                                    label="Jumlah"
                                    id="demo-simple-select"
                                    autoWidth sx={{ minWidth: 100 }}
                                    value={dataCount}
                                    onChange={(e) => {
                                        setDataCount(e.target.value);
                                    }}
                                >
                                    {itemValue?.map((item, index) => (
                                        <MenuItem value={item} key={item} sx={{ minWidth: 100 }}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <FormControl
                            sx={{
                                width: '25ch'
                            }}
                            variant="outlined"
                            size="small"
                        >
                            <InputLabel htmlFor="cari-dokter">Cari dokter</InputLabel>
                            <OutlinedInput
                                id="cari-dokter"
                                type="text"
                                value={search}
                                autoComplete="off"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setSearch(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton component="span" onClick={fetchData}>
                                            <Search />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Cari dokter"
                            >
                            </OutlinedInput>
                        </FormControl>
                    </Box>
                    <Button
                        variant="contained"
                        component="span"
                        endIcon={<AddCircleOutline />}
                        sx={{
                            textTransform: 'capitalize', gap: '0.5rem', fontWeight: 'bold'
                        }}
                        onClick={() => { setShowTambahDokter(true) }}
                    >
                        Tambah dokter
                    </Button>

                </Box>
                <Box sx={{ margin: '1rem 2rem' }}>
                    <TableContainer
                        component={Paper}
                    >
                        {/* Table data dokter */}
                        <Table sx={{ minWidth: 650 }} aria-label="simple-table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                    <TableCell sx={{ color: 'white' }}>
                                        Nama lengkap
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">
                                        Alamat
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">
                                        Jenis kelamin
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">
                                        No hp
                                    </TableCell>

                                </TableRow>
                            </TableHead>
                            {loading ? (
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                    >
                                        <TableCell rowSpan={4} colSpan={4} align="center">
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : (
                                <TableBody>
                                    {dataDokter.map((data) => (
                                        <TableRow
                                            key={data.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                        >
                                            <TableCell scope="row" component="th" onClick={(e) => {
                                                openPopover(e);
                                                showSelectDokter(data);
                                            }} sx={{ maxWidth: '100px', minWidth: '100px' }}>
                                                <Typography variant="body1">
                                                    {`${data.nama_depan} ${data.nama_belakang ? data.nama_belakang : ''}`}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left" onClick={(e) => {
                                                openPopover(e);
                                                showSelectDokter(data);
                                            }} sx={{ maxWidth: '200px', minWidth: '200px' }}>
                                                <Typography variant="body1">
                                                    {data.alamat}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left" onClick={(e) => {
                                                openPopover(e);
                                                showSelectDokter(data);
                                            }} sx={{ maxWidth: '100px', minWidth: '100px' }}>
                                                <Typography variant="body1">
                                                    {data.jenis_kelamin}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left" onClick={(e) => {
                                                openPopover(e);
                                                showSelectDokter(data);
                                            }} sx={{ maxWidth: '100px', minWidth: '100px' }}>
                                                <Typography variant="body1">
                                                    {data.no_hp}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Box>
            </Dashboard>
        </>
    )
}
export default DataDokter;