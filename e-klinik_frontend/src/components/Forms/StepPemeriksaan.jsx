import React from "react";
import { useTheme } from "@mui/material/styles";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, useMediaQuery } from "@mui/material";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";

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
                        value={pemeriksaan.planning}
                        onChange={(e) => {
                            setPemeriksaan((prevState) => {
                                return {
                                    ...prevState,
                                    planning: e.target.value
                                }
                            })
                        }}
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
                            value={pemeriksaan.keputusan}
                            onChange={(e) => {
                                setPemeriksaan((prevState) => {
                                    return {
                                        ...prevState,
                                        keputusan: e.target.value
                                    }
                                })
                            }}
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
                        value={pemeriksaan.amnanesta}
                        onChange={(e) => {
                            setPemeriksaan((prevState) => {
                                return {
                                    ...prevState,
                                    amnanesta: e.target.value
                                }
                            })
                        }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default StepPemeriksaan