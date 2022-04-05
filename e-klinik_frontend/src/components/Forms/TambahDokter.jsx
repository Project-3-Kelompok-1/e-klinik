import React, { useEffect, useRef, useState } from "react";
import {
    Dialog, DialogTitle, DialogContent,
    Typography, DialogActions, Button, useMediaQuery,
    AppBar, Toolbar, IconButton, TextField, Box,
    Grid, Paper, FormControl, FormLabel,
    RadioGroup, FormControlLabel, Radio, FormHelperText
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Close, Delete, UploadFile } from "@mui/icons-material";
import Slide from '@mui/material/Slide';
import { DesktopDatePicker, MobileDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import { DOMAIN_SERVER } from "../../config";
import { validasiTambahDokter } from "./validasi_form";
const DraggAbleDialog = (props) => {
    return (
        <Draggable
            handle="#alert-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    )
}
const TambahDokter = ({ showTambahDokter, setShowTambahDokter, user, openSnackBar, setOpenSnackBar }) => {
    const url = DOMAIN_SERVER + '/api/tambah_dokter';

    const [namaDepan, setNamaDepan] = useState('');
    const [namaBelakang, setNamaBelakang] = useState('');
    const [tempatLahir, setTempatLahir] = useState('');
    const [tanggalLahir, setTanggalLahir] = useState(new Date());
    const [jenisKelamin, setJenisKelamin] = useState('');
    const [noHp, setNoHp] = useState('');
    const [fotoDokter, setFotoDokter] = useState(null);

    const [validationMessage, setValidationMessage] = useState({});
    // Data form dokter


    const navigate = useNavigate();
    const [scroll, setScroll] = useState('paper')
    const [maxWidth, setMaxWidth] = useState("md");
    const closeTambahDokter = () => {
        setShowTambahDokter(false);
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const inputImage = useRef(null);
    const [tampilFotoDokter, setTampilFotoDokter] = useState(null);
    useEffect(() => {
        let unMounted = false;

        if (fullScreen && showTambahDokter) {
            setShowTambahDokter(false)
            navigate('/resepsionis/data-dokter');
            return () => {
                unMounted = true
            }
        }
    }, [fullScreen])

    useEffect(() => {

        console.log(fotoDokter);
        if (!fotoDokter) {
            setTampilFotoDokter(null)
            return;
        }
        else {
            setValidationMessage((prevState) => {
                const formatTypes = 'png, jpg, jpeg, gif, atau svg'
                return {
                    ...prevState,
                    foto_dokter: `Pilih file dengan format gambar ${formatTypes}`
                }
            })
        }
        const formatTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg'];
        for (let i = 0; i < formatTypes.length; i++) {
            if (fotoDokter?.type === formatTypes[i]) {
                setValidationMessage((prevState) => {
                    const state = { ...prevState }
                    state['foto_dokter'] = undefined
                    return state;
                })
                break;
            }
        }

        const fotoUrl = URL.createObjectURL(fotoDokter);
        setTampilFotoDokter(fotoUrl);
        return () => URL.revokeObjectURL(fotoUrl);
    }, [fotoDokter])

    useEffect(() => {
        console.log(validationMessage);
    }, [validationMessage])
    const createData = () => {
        let newDate = '';
        if (tanggalLahir) {
            const year = tanggalLahir.getUTCFullYear();
            const month = tanggalLahir.getUTCMonth();
            const day = tanggalLahir.getUTCDate();
            newDate = year + '-' + month + '-' + day;
        }

        const formData = new FormData();
        formData.append('nama_depan', namaDepan);
        formData.append('nama_belakang', namaBelakang);
        formData.append('jenis_kelamin', jenisKelamin);
        formData.append('no_hp', noHp);
        formData.append('no_wa', noHp);
        formData.append('tempat_lahir', tempatLahir);
        formData.append('tgl_lahir', newDate);
        formData.append('foto_dokter', fotoDokter);
        return formData;
    }

    const resetForm = () => {
        setNamaDepan('');
        setNamaBelakang('');
        setTempatLahir('');
        setTanggalLahir(new Date());
        setJenisKelamin('');
        setNoHp('');
        setFotoDokter(null);
    }
    const submitForm = async (e) => {
        e.preventDefault();
        setValidationMessage({});
        const data = createData();
        const postData = {
            method: 'POST',
            body: data,
            headers: new Headers({
                'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data; application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`
            })
        }
        let response = await fetch(url, postData);
        let result = await response.json();
        console.log(result);
        if (result.status === 'failed') {
            validasiTambahDokter(result, setValidationMessage, setFotoDokter);
            // console.log(validationMessage);
        }
        else {
            resetForm();
            closeTambahDokter();
            setOpenSnackBar(true);
        }
    }
    const validasiFoto = (e) => {
        const formatTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg']
        if (e.target.files[0]) {
            for (let i = 0; i < formatTypes.length; i++) {
                if (e.target.files[0].type === formatTypes[i]) {
                    setFotoDokter(e.target.files[0])
                    setValidationMessage((prevState) => {
                        const state = { ...prevState }
                        state['foto_dokter'] = undefined
                        return state;
                    })
                    //hapus key foto_dokter dari validasi error message
                    break;
                }
            }
            setValidationMessage((prevState) => {
                const formatTypes = 'png, jpg, jpeg, gif, atau svg'
                return {
                    ...prevState,
                    foto_dokter: `Pilih file dengan format gambar ${formatTypes}`
                }
            })
        }
        else {
            setFotoDokter(undefined);
        }
    }
    return (
        <Dialog
            TransitionComponent={Slide}
            open={showTambahDokter}
            onClose={closeTambahDokter}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullScreen={fullScreen}
            maxWidth="md"
            fullWidth
            scroll={scroll}
            PaperComponent={DraggAbleDialog}
        >
            {fullScreen ? (
                <AppBar position="relative">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={closeTambahDokter}
                            aria-label="close"
                            component="span"
                        >
                            <Close />
                        </IconButton>
                        <Typography
                            variant="h6"
                        >
                            Tambah data dokter baru
                        </Typography>
                    </Toolbar>
                </AppBar>
            ) : (
                <DialogTitle id="alert-dialog-title" style={{ cursor: 'move' }} >
                    {/* <Typography variant="h6" > */}
                    {"Tambah data dokter baru"}
                    {/* </Typography> */}
                </DialogTitle>
            )}
            <DialogContent dividers={scroll === 'paper'}>
                <Grid
                    container
                    spacing={2}
                    sx={{ marginBottom: '2rem' }}
                >
                    <Grid item md={6} xs={12}>
                        <TextField
                            margin="dense"
                            id="nama_depan"
                            label="Nama depan"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={namaDepan}
                            onChange={(e) => {
                                setNamaDepan(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            margin="dense"
                            id="nama_belakang"
                            label="Nama belakang"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={namaBelakang}
                            onChange={(e) => {
                                setNamaBelakang(e.target.value);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                    sx={{ marginBottom: '2rem' }}
                >
                    <Grid item md={6} xs={12}>
                        <TextField
                            margin="dense"
                            id="tempat_lahir"
                            label="Tempat lahir"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={tempatLahir}
                            onChange={(e) => {
                                setTempatLahir(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            {!fullScreen ? (
                                <DesktopDatePicker
                                    mask="____/__/__"
                                    label="Tanggal lahir"
                                    inputFormat="yyyy/MM/dd"
                                    renderInput={(params) => <TextField variant="standard" margin="dense" fullWidth {...params} />}
                                    value={tanggalLahir}
                                    onChange={(newValue) => { setTanggalLahir(newValue) }}
                                    OpenPickerButtonProps={
                                        {
                                            component: 'span',

                                        }
                                    }
                                    componentsProps={{
                                        switchViewButton: {
                                            component: 'span'
                                        },
                                        leftArrowButton: {
                                            component: 'span',
                                        },
                                        rightArrowButton: {
                                            component: 'span'
                                        }
                                    }}
                                />

                            ) : (
                                <MobileDatePicker
                                    mask="____/__/__"
                                    label="Tanggal lahir"
                                    inputFormat="yyyy/MM/dd"
                                    renderInput={(params) => <TextField variant="standard" margin="dense" fullWidth {...params} />}
                                    value={tanggalLahir}
                                    onChange={(newValue) => { setTanggalLahir(newValue) }}

                                />
                            )}
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                    sx={{ marginBottom: '2rem' }}
                >
                    <Grid item md={6} xs={12}>
                        <FormControl>
                            <FormLabel id="jenis-kelamin">Jenis kelamin</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="jenis-kelamin"
                                name="jenis-kelamin"
                                value={jenisKelamin}
                                onChange={(e) => {
                                    setJenisKelamin(e.target.value)
                                }}
                            >
                                <FormControlLabel value="laki-laki" control={<Radio />} label="Laki-laki" />
                                <FormControlLabel value="perempuan" control={<Radio />} label="Perempuan" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            margin="dense"
                            id="no_hp"
                            label="No hp"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={noHp}
                            onChange={(e) => {
                                setNoHp(e.target.value);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                    sx={{ marginBottom: '2rem' }}
                >
                    <Grid
                        item
                        xs={12}
                        md={12}
                    >
                        <input
                            style={{ display: 'none' }}
                            type="file"
                            ref={inputImage}
                            onChange={(e) => {
                                // const formatTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg']
                                // if (e.target.files[0]) {
                                //     for (let i = 0; i < formatTypes.length; i++) {
                                //         if (e.target.files[0].type === formatTypes[i]) {
                                //             setFotoDokter(e.target.files[0])
                                //             setValidationMessage((prevState) => {
                                //                 const state = { ...prevState }
                                //                 state['foto_dokter'] = undefined
                                //                 return state;
                                //             })
                                //             //hapus key foto_dokter dari validasi error message
                                //             break;
                                //         }
                                //     }
                                //     setValidationMessage((prevState) => {
                                //         const formatTypes = 'png, jpg, jpeg, gif, atau svg'
                                //         return {
                                //             ...prevState,
                                //             foto_dokter: `Pilih file dengan format gambar ${formatTypes}`
                                //         }
                                //     })
                                // }
                                // else {
                                //     setFotoDokter(undefined);
                                // }
                                validasiFoto(e)
                                // if (e.target.files[0] && (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/bmp')) {
                                //     setFotoDokter(e.target.files[0])
                                // }
                                // else {
                                //     setFotoDokter(undefined);
                                // }
                            }}
                        />
                        <Box
                            sx={{ p: 2, border: 'dashed 2px', display: 'flex', justifyContent: 'center', cursor: 'pointer', marginX: '3rem', borderColor: 'primary.main', borderRadius: 2 }}
                        >
                            {!fotoDokter ? (
                                <div
                                    onDragOver={(e) => { e.preventDefault() }}
                                    onDragEnter={(e) => { e.preventDefault() }}
                                    onDragLeave={(e) => { e.preventDefault() }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setFotoDokter(e.dataTransfer.files[0])
                                        console.log(e.dataTransfer);
                                    }}
                                >
                                    <Box
                                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', paddingY: '1rem' }}
                                        onClick={() => {
                                            inputImage.current.click();
                                        }}
                                    >
                                        <UploadFile sx={{ fontSize: '3rem' }} color="primary" />
                                        <Typography
                                            variant="h5"
                                            sx={{ color: 'primary.main', fontWeight: 'bold' }}
                                        >
                                            Masukkan foto dokter
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{ color: 'gray' }}
                                        >
                                            atau seret dan lepas file disini
                                        </Typography>
                                        {validationMessage.foto_dokter && (
                                            <FormHelperText
                                                sx={{ color: 'red' }}
                                            >
                                                {validationMessage.foto_dokter}
                                            </FormHelperText>
                                        )}
                                    </Box>
                                </div>
                            ) : (
                                <Box>
                                    <img src={tampilFotoDokter} style={{ width: '100%' }} />
                                    <IconButton
                                        component="span"
                                        color="error"
                                        variant="contained"
                                        sx={{ float: 'right', marginTop: '-3.5rem', marginRight: '1rem', backgroundColor: '#fff' }}
                                        onClick={() => {
                                            setFotoDokter(null)
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="text" component="span" onClick={closeTambahDokter}>
                    Batal
                </Button>
                <Button variant="contained" component="span" onClick={submitForm}>
                    Simpan
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default TambahDokter;