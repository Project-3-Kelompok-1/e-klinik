import { Close } from "@mui/icons-material";
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { helperTextPasien } from "../../Helpers/HelperText";
import DatePicker from "./DatePicker";
// const scroll = 'paper'
const initialState = {
    nik: '',
    nama_depan: '',
    nama_belakang: '',
    alamat_rumah: '',
    usia: '',
    jenis_kelamin: '',
    tempat_lahir: '',
    tgl_lahir: new Date()
}
const FormPasien = ({ selectedPasien, fetchPasien, ...restProps }) => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    const [pasien, setPasien] = useState(initialState)
    const [errorMessages, setErrorMessages] = useState()
    const handleClose = () => {
        setPasien(initialState)
        restProps.onClose()
    }
    const handleSubmit = () => {
        handleClose()
        fetchPasien()
    }
    useEffect(() => {
        if (selectedPasien) {
            setPasien((prevState) => {
                return {
                    ...prevState,
                    nik: selectedPasien.nik,
                    nama_depan: selectedPasien.nama_depan,
                    nama_belakang: selectedPasien.nama_belakang,
                    alamat_rumah: selectedPasien.alamat_rumah,
                    usia: selectedPasien.usia,
                    jenis_kelamin: selectedPasien.jenis_kelamin,
                    tempat_lahir: selectedPasien.tempat_lahir,
                    tgl_lahir: new Date(selectedPasien.tgl_lahir)
                }
            })
        }
    }, [selectedPasien])
    return (
        <Dialog
            {...restProps}
            fullScreen={fullScreen}
        >
            {fullScreen ? (
                <AppBar position="relative">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            component="span"
                        >
                            <Close />
                        </IconButton>
                        <Typography
                            variant="h6"
                        >
                            {selectedPasien ? 'Form update pasien' : 'Form tambah pasien'}
                        </Typography>
                    </Toolbar>
                </AppBar>
            ) : (
                <DialogTitle id="alert-dialog-title">
                    {selectedPasien ? 'Form update pasien' : 'Form tambah pasien'}
                </DialogTitle>
            )}
            <DialogContent dividers>
                <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Nama depan"
                            variant="outlined"
                            required
                            fullWidth
                            value={pasien?.nama_depan}
                            onChange={(e) => {
                                setPasien((prevState) => {
                                    return {
                                        ...prevState,
                                        nama_depan: e.target.value
                                    }
                                })
                            }}
                            error={errorMessages?.nama_depan}
                        />
                        {errorMessages?.nama_depan?.map((error) => (
                            <FormHelperText error>{error}</FormHelperText>
                        ))}
                        {!errorMessages?.nama_depan && <FormHelperText>{helperTextPasien.nama_depan}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Nama belakang"
                            variant="outlined"
                            fullWidth
                            value={pasien?.nama_belakang}
                            onChange={(e) => {
                                setPasien((prevState) => {
                                    return {
                                        ...prevState,
                                        nama_belakang: e.target.value
                                    }
                                })
                            }}
                            error={errorMessages?.nama_belakang}
                        />
                        {errorMessages?.nama_belakang?.map((error) => (
                            <FormHelperText error>{error}</FormHelperText>
                        ))}
                        {!errorMessages?.nama_belakang && <FormHelperText>{helperTextPasien.nama_belakang}</FormHelperText>}
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth required error={errorMessages?.jenis_kelamin}>
                            <InputLabel id="jenis-kelamin">Jenis kelamin</InputLabel>
                            <Select
                                labelId="jenis-kelamin"
                                label="Jenis kelamin"
                                value={pasien?.jenis_kelamin}
                                onChange={(e) => {
                                    setPasien((prevState) => {
                                        return {
                                            ...prevState,
                                            jenis_kelamin: e.target.value
                                        }
                                    })
                                }}
                            >
                                <MenuItem value={"Laki-laki"}>Laki-laki</MenuItem>
                                <MenuItem value={"Perempuan"}>Perempuan</MenuItem>
                            </Select>
                            {errorMessages?.jenis_kelamin?.map((error) => (
                                <FormHelperText error>{error}</FormHelperText>
                            ))}
                            {!errorMessages?.jenis_kelamin && <FormHelperText>{helperTextPasien.jenis_kelamin}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Usia"
                            variant="outlined"
                            required
                            type='number'
                            fullWidth
                            value={pasien?.usia}
                            onChange={(e) => {
                                if (e.target.value > 0) {
                                    setPasien((prevState) => {
                                        return {
                                            ...prevState,
                                            usia: e.target.value
                                        }
                                    })
                                }
                            }}
                            error={errorMessages?.usia}
                        />
                        {errorMessages?.usia?.map((error) => (
                            <FormHelperText error>{error}</FormHelperText>
                        ))}
                        {!errorMessages?.usia && <FormHelperText>{helperTextPasien.usia}</FormHelperText>}
                    </Grid>
                </Grid>
                <Grid container sx={{ marginBottom: '1rem' }}>
                    <Grid item xs={12}>
                        <TextField
                            label="NIK"
                            variant="outlined"
                            required
                            fullWidth
                            value={pasien?.nik}
                            onChange={(e) => {
                                setPasien((prevState) => {
                                    return {
                                        ...prevState,
                                        nik: e.target.value
                                    }
                                })
                            }}
                            error={errorMessages?.nik}
                        />
                        {errorMessages?.nik?.map((error) => (
                            <FormHelperText error>{error}</FormHelperText>
                        ))}
                        {!errorMessages?.nik && <FormHelperText>{helperTextPasien.nik}</FormHelperText>}
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Tempat lahir"
                            variant="outlined"
                            required
                            fullWidth
                            value={pasien?.tempat_lahir}
                            onChange={(e) => {
                                setPasien((prevState) => {
                                    return {
                                        ...prevState,
                                        tempat_lahir: e.target.value
                                    }
                                })
                            }}
                            error={errorMessages?.tempat_lahir}
                        />
                        {errorMessages?.tempat_lahir?.map((error) => (
                            <FormHelperText error>{error}</FormHelperText>
                        ))}
                        {!errorMessages?.tempat_lahir && <FormHelperText>{helperTextPasien.tempat_lahir}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DatePicker
                            fullScreen={fullScreen}
                            label="Tanggal lahir"
                            value={pasien?.tgl_lahir}
                            onChange={(newValue) => {
                                setPasien((prevState) => {
                                    return {
                                        ...prevState,
                                        tgl_lahir: newValue
                                    }
                                })
                            }}
                            error={errorMessages?.tgl_lahir?.length > 0}
                        />
                        {errorMessages?.tgl_lahir?.map((error) => (
                            <FormHelperText error>{error}</FormHelperText>
                        ))}
                        {!errorMessages?.tgl_lahir && <FormHelperText>{helperTextPasien.tgl_lahir}</FormHelperText>}
                    </Grid>
                </Grid>
                <Grid container sx={{ marginBottom: '1rem' }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Alamat"
                            rows={3}
                            variant="outlined"
                            required
                            multiline
                            fullWidth
                            value={pasien?.alamat_rumah}
                            onChange={(e) => {
                                setPasien((prevState) => {
                                    return {
                                        ...prevState,
                                        alamat_rumah: e.target.value
                                    }
                                })
                            }}
                            error={errorMessages?.alamat_rumah}
                        />
                        {errorMessages?.alamat_rumah?.map((error) => (
                            <FormHelperText error>{error}</FormHelperText>
                        ))}
                        {!errorMessages?.alamat_rumah && <FormHelperText>{helperTextPasien.alamat_rumah}</FormHelperText>}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    component="span"
                    color="inherit"
                    onClick={handleClose}
                >
                    Batal
                </Button>
                <Button
                    component="span"
                    variant="contained"
                    color={selectedPasien ? 'warning' : 'primary'}
                    onClick={handleSubmit}
                >
                    {selectedPasien ? 'Update' : 'Simpan'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default FormPasien