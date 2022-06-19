import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Toolbar, Typography, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Close } from "@mui/icons-material";
import { UserContext } from "../../Helpers/Context";
import { DOMAIN_SERVER } from "../../config";
import useProfileState from "../../Helpers/CustomHooks/useProfileState";
const UpdateProfile = (props) => {
    const { user } = useContext(UserContext)
    const { profile, handleCancelEdit, handleShowAlert, ...other } = props
    const [profilePasien, setProfilePasien] = useProfileState()
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    const [helperText, setHelperText] = useState({
        nama_depan: 'maksimal 32 karakter',
        nama_belakang: 'maksimal 255 karakter',
        jenis_kelamin: 'jenis kelamin wajib diisi',
        usia: 'tidak boleh bilangan negatif',
        nik: 'masukkan 16 karakter nik anda',
        tempat_lahir: 'maksimal 32 karakter',
        tgl_lahir: 'tanggal lahir harus valid',
        alamat_rumah: 'minimal 32 karakter'
    })
    const [errorMessages, setErrorMessages] = useState()
    const createFormData = (form) => {
        const formData = {
            nik: form.nik,
            nama_depan: form.nama_depan,
            nama_belakang: form.nama_belakang,
            alamat_rumah: form.alamat_rumah,
            jenis_kelamin: form.jenis_kelamin,
            usia: form.usia,
            tempat_lahir: form.tempat_lahir
        }
        const tgl = new Date(form.tgl_lahir)
        formData.tgl_lahir = `${tgl.getFullYear()}-${("0" + (tgl.getMonth() + 1)).slice(-2)}-${tgl.getDate()}`
        return formData
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const formData = createFormData(profilePasien)
        const params = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.token}`
            })
        }
        fetch(DOMAIN_SERVER + '/api/pasien/profile', params)
            .then(response => response.json())
            .then(data => {
                if (data?.errors) {
                    throw data.errors
                }
                console.log(data);
                setErrorMessages()
                handleCancelEdit()
                handleShowAlert(data?.status, data?.message)
            })
            .catch(errors => {
                setErrorMessages(errors)
            })
        // handleCancelEdit()
    }
    useEffect(() => {
        if (profile?.tgl_lahir) {
            setProfilePasien(() => profile)
            const data = profile
            const tgl_lahir = new Date(profile.tgl_lahir.split('-'))
            setProfilePasien((prevState) => {
                return {
                    ...prevState,
                    tgl_lahir: tgl_lahir
                }
            })
        }
    }, [profile])
    return (
        <Dialog
            {...other}
            fullScreen={fullScreen}
        >
            {fullScreen ? (
                <AppBar position="relative">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCancelEdit}
                            component="span"
                        >
                            <Close />
                        </IconButton>
                        <Typography
                            variant="h6"
                        >
                            Form update profile
                        </Typography>
                    </Toolbar>
                </AppBar>
            ) : (
                <DialogTitle id="alert-dialog-title">
                    {'Form update profile'}
                </DialogTitle>
            )}
            <DialogContent dividers={'paper'}>
                <DialogContentText id="alert-dialog-description">
                    <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Nama depan"
                                variant="outlined"
                                required
                                fullWidth
                                value={profilePasien.nama_depan}
                                onChange={(e) => {
                                    setProfilePasien((prevState) => {
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
                            {!errorMessages?.nama_depan && <FormHelperText>{helperText.nama_depan}</FormHelperText>}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Nama belakang"
                                variant="outlined"
                                fullWidth
                                value={profilePasien.nama_belakang}
                                onChange={(e) => {
                                    setProfilePasien((prevState) => {
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
                            {!errorMessages?.nama_belakang && <FormHelperText>{helperText.nama_belakang}</FormHelperText>}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required error={errorMessages?.jenis_kelamin}>
                                <InputLabel id="jenis-kelamin">Jenis kelamin</InputLabel>
                                <Select
                                    labelId="jenis-kelamin"
                                    label="Jenis kelamin"
                                    value={(profilePasien.jenis_kelamin)}
                                    onChange={(e) => {
                                        setProfilePasien((prevState) => {
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
                                {!errorMessages?.jenis_kelamin && <FormHelperText>{helperText.jenis_kelamin}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Usia"
                                variant="outlined"
                                required
                                type='number'
                                fullWidth
                                value={profilePasien.usia}
                                onChange={(e) => {
                                    if (e.target.value > 0) {
                                        setProfilePasien((prevState) => {
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
                            {!errorMessages?.usia && <FormHelperText>{helperText.usia}</FormHelperText>}
                        </Grid>
                    </Grid>
                    <Grid container sx={{ marginBottom: '1rem' }}>
                        <Grid item xs={12}>
                            <TextField
                                label="NIK"
                                variant="outlined"
                                required
                                fullWidth
                                value={profilePasien.nik}
                                onChange={(e) => {
                                    setProfilePasien((prevState) => {
                                        return {
                                            ...prevState,
                                            nik: e.target.value
                                        }
                                    })
                                }}
                                error={errorMessages?.nik}
                            />
                            {errorMessages?.nik?.map((error) => (
                                <FormHelperText error>
                                    {error}
                                </FormHelperText>
                            ))}
                            {!errorMessages?.nik && <FormHelperText>{helperText.nik}</FormHelperText>}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Tempat lahir"
                                variant="outlined"
                                required
                                fullWidth
                                value={profilePasien.tempat_lahir}
                                onChange={(e) => {
                                    setProfilePasien((prevState) => {
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
                            {!errorMessages?.tempat_lahir && <FormHelperText>{helperText.tempat_lahir}</FormHelperText>}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                {!fullScreen ? (
                                    <React.Fragment>
                                        <DesktopDatePicker
                                            mask="__/__/____"
                                            label="Tanggal lahir"
                                            inputFormat="dd/MM/yyyy"
                                            renderInput={(params) => {
                                                return (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                        required
                                                        error={errorMessages?.tgl_lahir}
                                                    />
                                                )
                                            }}
                                            OpenPickerButtonProps={
                                                {
                                                    component: 'span'
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
                                            value={profilePasien.tgl_lahir}
                                            onChange={(newValue) => {
                                                setProfilePasien((prevState) => {
                                                    return {
                                                        ...prevState,
                                                        tgl_lahir: newValue
                                                    }
                                                })
                                            }}
                                        />
                                        {errorMessages?.tgl_lahir?.map((error) => (
                                            <FormHelperText error>{error}</FormHelperText>
                                        ))}
                                        {!errorMessages?.tgl_lahir && <FormHelperText>{helperText.tgl_lahir}</FormHelperText>}
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <MobileDatePicker
                                            mask="__/__/____"
                                            label="Tanggal lahir"
                                            inputFormat="dd/MM/yyyy"
                                            renderInput={(params) => {
                                                return (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                        required
                                                        error={errorMessages?.tgl_lahir}
                                                    />
                                                )
                                            }}
                                            componentsProps={{
                                                switchViewButton: {
                                                    component: 'span'
                                                },
                                                leftArrowButton: {
                                                    component: 'span',
                                                },
                                                rightArrowButton: {
                                                    component: 'span'
                                                },
                                            }}
                                            value={profilePasien.tgl_lahir}
                                            onChange={(newValue) => {
                                                setProfilePasien((prevState) => {
                                                    return {
                                                        ...prevState,
                                                        tgl_lahir: newValue
                                                    }
                                                })
                                            }}
                                        />
                                        {errorMessages?.tempat_lahir?.map((error) => (
                                            <FormHelperText error>{error}</FormHelperText>
                                        ))}
                                        {!errorMessages?.tempat_lahir && <FormHelperText>{helperText.tempat_lahir}</FormHelperText>}
                                    </React.Fragment>
                                )}
                            </LocalizationProvider>
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
                                value={profilePasien.alamat_rumah}
                                onChange={(e) => {
                                    setProfilePasien((prevState) => {
                                        return {
                                            ...prevState,
                                            alamat_rumah: e.target.value
                                        }
                                    })
                                }}
                                helperText={helperText.alamat_rumah}
                            />
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button component="span" color="inherit" onClick={() => {
                    setErrorMessages()
                    handleCancelEdit()
                }}>
                    Batal
                </Button>
                <Button component="span" variant="contained" color="warning" onClick={handleUpdate}>Update</Button>
            </DialogActions>
        </Dialog>
    )
}
export default UpdateProfile