import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, TextField, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import { useTheme } from "@mui/material/styles";
import TimePicker from "./TimePicker";
import { v4 as uuidv4 } from "uuid";
const steps = ["Pemeriksaan", "Diagnosis", "Tindakan Penanganan"]
const StepPemeriksaan = ({ pemeriksaan, setPemeriksaan, ...restProps }) => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('mdu'))
    return (
        <React.Fragment>
            <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                <Grid item xs={12} md={6}>
                    <DatePicker
                        fullScreen={fullScreen}
                        label="Tanggal periksa"
                        readOnly
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TimePicker
                        fullScreen={fullScreen}
                        label="Jam periksa"
                        readOnly
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Planning"
                        variant="outlined"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl
                        required
                        fullWidth
                    >
                        <InputLabel id="keputusan">Keputusan</InputLabel>
                        <Select
                            labelId="keputusan"
                            label="Keputusan"
                            required
                        >
                            <MenuItem value={"Berobat jalan"}>Berobat jalan</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                <Grid item xs={12}>
                    <TextField
                        label="Amnanesta"
                        variant="outlined"
                        required
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
const StepDiagnosis = ({ ...restProps }) => {
    const [diagnosis, setDiagnosis] = useState([
        { id: uuidv4(), diagnosa_pasien: '' },
    ])
    const handlePush = () => {
        const newElement = { id: uuidv4(), diagnosa_pasien: '' }
        setDiagnosis(oldArray => [...oldArray, newElement])
    }
    const handleRemove = (id) => {
        if (diagnosis.length > 1) {
            setDiagnosis(diagnosis.filter(item => item.id != id))
        }
    }
    return (
        <React.Fragment>
            {diagnosis?.map((item, index) => (
                <Grid container spacing={2} sx={{ marginBottom: '1rem' }} key={index}>
                    <Grid item xs={12}>
                        <TextField
                            label="Diagnosis"
                            variant="outlined"
                            required
                            fullWidth
                        />
                        <Box sx={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <Button
                                component="span"
                                variant="contained"
                                onClick={handlePush}
                            >
                                Tambah
                            </Button>
                            <Button
                                component="span"
                                variant="contained"
                                color="error"
                                onClick={() => handleRemove(item.id)}
                            >
                                Hapus
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            ))}
        </React.Fragment>
    )
}
const Penanganan = ({ ...restProps }) => {
    const [obat, setObat] = useState([{ id: uuidv4(), nama_obat: '', jumlah_obat: 0, dosis_konsumsi: '' }])
    const handlePush = () => {
        const newElement = { id: uuidv4(), nama_obat: '', jumlah_obat: 0, dosis_konsumsi: '' }
        setObat(oldArray => [...oldArray, newElement])
    }
    const handleRemove = (id) => {
        if (obat.length > 1) {
            setObat(obat.filter(item => item.id != id))
        }
    }
    return (
        <React.Fragment>
            <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                <Grid item xs={12}>
                    <TextField
                        label="Tindakan penanganan"
                        variant="outlined"
                        required
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <Typography variant="h6" sx={{ fontSize: '1.125rem' }}>
                        Obat
                    </Typography>
                </Grid>
            </Grid>
            {obat?.map((item, index) => (
                <Grid container spacing={2} sx={{ marginBottom: '1rem' }} key={index}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Nama obat"
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Jumlah obat"
                            variant="outlined"
                            required
                            fullWidth
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Dosis konsumsi"
                            variant="outlined"
                            required
                            fullWidth
                            multiline
                            rows={3}
                        />
                        <Box sx={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <Button
                                component="span"
                                variant="contained"
                                onClick={handlePush}
                            >
                                Tambah
                            </Button>
                            <Button
                                component="span"
                                variant="contained"
                                color="error"
                                onClick={() => handleRemove(item.id)}
                            >
                                Hapus
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            ))}
        </React.Fragment>
    )
}
const FormDiagnosis = ({ selectedAppointment, fetchAppointment, handleShowAlert, ...restProps }) => {
    const [activeStep, setActiveStep] = useState(0)
    const handleNext = () => {
        if (activeStep < steps.length -1) {
            setActiveStep((prevActiveState) => prevActiveState + 1);
        }
    }
    const handleBack = () => {
        setActiveStep((prevActiveState) => prevActiveState - 1);
    }
    const handleReset = () => {
        setActiveStep(0);
        restProps.onClose()
    }
    useEffect(() => {
        console.log(activeStep);
    }, [activeStep])
    return (
        <Dialog
            {...restProps}
            onClose={() => {
                restProps.onClose()
                setActiveStep(0)
            }}
            scroll="paper"
        >
            <DialogTitle>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ margin: 0, padding: 0 }}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </DialogTitle>
            <DialogContent dividers>
                {activeStep === 0 && (
                    <StepPemeriksaan />
                )}
                {activeStep === 1 && (
                    <StepDiagnosis />
                )}
                {activeStep === 2 && (
                    <Penanganan />
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    component="span"
                    color="inherit"
                    onClick={handleBack}
                >
                    Kembali
                </Button>
                {activeStep === steps.length -1 ? (
                    <Button
                        component="span"
                        color="info"
                        variant="contained"
                        onClick={handleReset}
                    >
                        Simpan
                    </Button>
                ) : (
                    <Button
                        component="span"
                        color="info"
                        variant="contained"
                        onClick={handleNext}
                    >
                        Selnjutnya
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    )
}
export default FormDiagnosis