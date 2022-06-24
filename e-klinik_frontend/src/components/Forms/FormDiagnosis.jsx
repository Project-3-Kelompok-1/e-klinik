import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, TextField, Typography, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import StepDiagnosis from "./StepDiagnosis";
import StepPemeriksaan from "./StepPemeriksaan";
import StepPenanganan from "./StepPenanganan";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../Helpers/Context";
import { DOMAIN_SERVER } from "../../config";
const steps = ["Pemeriksaan", "Diagnosis", "Tindakan Penanganan"]
const FormDiagnosis = ({ selectedAppointment, fetchAppointment, handleShowAlert, ...restProps }) => {
    // initial state management
    const initialPemeriksaan = {
        id: null,
        id_appointment: selectedAppointment?.id,
        tgl_periksa: new Date(),
        jam_periksa: new Date(),
        planning: '',
        keputusan: '',
        amnanesta: ''
    }
    const initialDiagnosis = [{ id: uuidv4(), diagnosa_pasien: '' }]
    const initialObat = [{ id: uuidv4(), nama_obat: '', jumlah_obat: 0, dosis_konsumsi: '' }]

    // declaration state
    const { user } = useContext(UserContext)
    const [activeStep, setActiveStep] = useState(0)
    const [pemeriksaan, setPemeriksaan] = useState(initialPemeriksaan)
    const [diagnosis, setDiagnosis] = useState(initialDiagnosis)
    const [penanganan, setPenanganan] = useState({ tindakan_penanganan: '' })
    const [obat, setObat] = useState(initialObat)

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prevActiveState) => prevActiveState + 1);
        }
    }
    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prevActiveState) => prevActiveState - 1);
        }
    }
    const handleReset = () => {
        setActiveStep(0);
        restProps.onClose()
    }
    const fetchPemeriksaan = (id) => {
        const params = {
            headers: new Headers({
                'Authorization': `Bearer ${user.token}`
            })
        }
        fetch(DOMAIN_SERVER + '/api/pemeriksaan/' + id, params)
            .then(response => response.json())
            .then(data => {
                if (data.pemeriksaan) {
                    setPemeriksaan((prevState) => {
                        return {
                            ...prevState,
                            id: data.pemeriksaan.id,
                            id_appointment: data.pemeriksaan.id_appointment,
                            tgl_periksa: data.pemeriksaan.tgl_periksa,
                            jam_periksa: data.pemeriksaan.jam_periksa,
                            planning: data.pemeriksaan.planning,
                            keputusan: data.pemeriksaan.keputusan,
                            amnanesta: data.pemeriksaan.amnanesta
                        }
                    })
                    if (data.pemeriksaan.diagnosis.length > 0) {
                        setDiagnosis(data.pemeriksaan.diagnosis)
                    }
                    if (data.pemeriksaan.resep.length > 0) {
                        setObat(data.pemeriksaan.resep)
                    }
                    if (data.pemeriksaan.penanganan_pasien) {
                        setPenanganan(data.pemeriksaan.penanganan_pasien)
                    }
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        if (selectedAppointment?.id) {
            setPemeriksaan((prevState) => {
                return {
                    ...prevState,
                    id_appointment: selectedAppointment?.id
                }
            })
            fetchPemeriksaan(selectedAppointment.id)
        }
    }, [selectedAppointment])
    return (
        <Dialog
            {...restProps}
            onClose={() => {
                setActiveStep(0)
                setPemeriksaan(initialPemeriksaan)
                setDiagnosis(initialDiagnosis)
                setPenanganan({ tindakan_penanganan: '' })
                setObat(initialObat)
                restProps.onClose()
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
                    <StepPemeriksaan
                        pemeriksaan={pemeriksaan}
                        setPemeriksaan={setPemeriksaan}
                    />
                )}
                {activeStep === 1 && (
                    <StepDiagnosis
                        diagnosis={diagnosis}
                        setDiagnosis={setDiagnosis}
                    />
                )}
                {activeStep === 2 && (
                    <StepPenanganan
                        penanganan={penanganan}
                        setPenanganan={setPenanganan}
                        obat={obat}
                        setObat={setObat}
                    />
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
                {activeStep === steps.length - 1 ? (
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