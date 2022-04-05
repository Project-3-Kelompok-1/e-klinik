import {
    AddCircleOutline,
    NavigateNext,
    Search,
    VisibilityOutlined
} from "@mui/icons-material";
import {
    Box, Breadcrumbs, Button, FormControl,
    IconButton, InputAdornment, InputLabel,
    MenuItem, OutlinedInput, Paper, Select,
    Stack, Table, TableBody,
    TableCell, TableContainer, TableHead,
    TableRow, Toolbar, Typography, Snackbar,
    Alert as MuiAlert, Popover, Card,
    CardContent, CardActions
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Dashboard from "../../components/Layouts/Dashoard/Dashboard";
import { UserContext } from "../../Helpers/Context";
import { makeStyles } from '@mui/styles';
import "./data-dokter.css";
import { blue } from "@mui/material/colors";
import TambahDokter from "../../components/Forms/TambahDokter";
import { DOMAIN_SERVER } from "../../config";
import CircularProgress from '@mui/material/CircularProgress';
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
    const [hoverIndex, setHoverIndex] = useState(null);
    const [showTambahDokter, setShowTambahDokter] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [anchorPopover, setAnchorPopover] = useState(null);
    const [dataDokter, setDataDokter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [fetchUrl, setFetchUrl] = useState(url.getDokter);
    const openPopover = (event) => {
        setAnchorPopover(event.currentTarget);
    }
    const closePopover = () => {
        setAnchorPopover(null);
    }
    const open = Boolean(anchorPopover);
    const idPopover = open ? 'simple-popover' : undefined;

    const closeSnackBar = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    }
    const fetchDataDokter = async () => {
        if (search) {
            setFetchUrl(url.getDokter + `?search=${search}`)
        }
        else {
            setFetchUrl(url.getDokter)
        }
        try {
            let response = await fetch(fetchUrl, {
                method: 'GET',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                })
            })
            response = await response.json();
            if (response?.status === 'success') {
                console.log(response);
                setDataDokter(response?.dokter);
                setLoading(false);
            }
        } catch (error) {
            setLoading(true);
            setDataDokter([]);
        }
    }
    const fetchData = () => {
        if (search) {
            setFetchUrl(url.getDokter + `?search=${search}`)
        }
        else {
            setFetchUrl(url.getDokter)
        }
        fetch(fetchUrl, {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.token}`
            })
        }).then(response => response.json())
            .then(data => setDataDokter(data?.dokter))
            .catch(error => setDataDokter([]))
    }
    // useEffect(() => {
    //     fetchDataDokter();
    // }, [])
    useEffect(() => {
        fetchDataDokter();
        // fetchData();
    }, [search])
    // useEffect(() => {
    //     if (dataDokter.length > 0) {
    //         setLoading(false);
    //     }
    //     else {
    //         setLoading(true);
    //     }
    // }, [dataDokter])
    useEffect(() => {
        let unMounted = false;
        if (user?.role !== 'resepsionis' || !user) {
            navigate('/');
            return () => {
                unMounted = true
            }
        }
    }, [user])
    const createData = (nama_lengkap, alamat, jenis_kelamin, no_hp) => {
        return { nama_lengkap, alamat, jenis_kelamin, no_hp };
    }
    const rows = [
        createData("Mar'i Adhari", "Cirebon", "Laki-laki", "083890282306"),
        createData("Iin Nuryani", "Kuningan", "Perempuan", "083812342306"),
        createData("Rahul Ken", "Cirebon", "Laki-laki", "08389321106"),
        createData("Isa Ias", "Cirebon", "Laki-laki", "083814382306"),
        createData("Indra", "Cirebon", "Laki-laki", "083890283712"),
    ];
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

    return (
        <>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={closeSnackBar}
            >
                <Alert
                    onClose={closeSnackBar}
                    severity="info"
                    sx={{ width: '100%' }}
                >
                    Data dokter berhasil ditambahkan
                </Alert>
            </Snackbar>
            <Popover
                elevation={1}
                id={idPopover}
                open={open}
                anchorEl={anchorPopover}
                onClose={closePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Card
                    sx={{ minWidth: 275 }}
                >
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Profil dokter
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                            be{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button component="span">Learn More</Button>
                    </CardActions>
                </Card>
            </Popover>
            <TambahDokter
                showTambahDokter={showTambahDokter}
                setShowTambahDokter={setShowTambahDokter}
                user={user}
                openSnackBar={openSnackBar}
                setOpenSnackBar={setOpenSnackBar}
            />
            <Dashboard halaman="Data Dokter">
                <Toolbar />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        backgroundColor: '#fff',
                        border: 'solid 1px #E0E0E0',
                        alignItems: 'center',
                        padding: '1rem 2rem',
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
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setSearch(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton component="span">
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
                <Box sx={{ margin: '2rem' }}>
                    <TableContainer
                        component={Paper}
                    >
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
                                            key={data.nama_lengkap}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                        >
                                            <TableCell scope="row" component="th" onClick={openPopover} sx={{ maxWidth: '100px', minWidth: '100px' }}>
                                                <Typography variant="body1">
                                                    {`${data.nama_depan} ${data.nama_belakang}`}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left" onClick={openPopover} sx={{ maxWidth: '200px', minWidth: '200px' }}>
                                                <Typography variant="body1">
                                                    {data.alamat}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left" onClick={openPopover} sx={{ maxWidth: '100px', minWidth: '100px' }}>
                                                <Typography variant="body1">
                                                    {data.jenis_kelamin}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left" onClick={openPopover} sx={{ maxWidth: '100px', minWidth: '100px' }}>
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