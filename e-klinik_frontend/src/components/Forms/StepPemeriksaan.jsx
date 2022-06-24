import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, useMediaQuery } from "@mui/material";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import { helperTextPemeriksaan } from "../../Helpers/HelperText";

const StepPemeriksaan = ({ pemeriksaan, setPemeriksaan, onSubmit, errorPemerikasaan, ...restProps }) => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <React.Fragment>
            <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                <Grid item xs={12} md={6}>
                    <DatePicker
                        fullScreen={fullScreen}
                        label="Tanggal periksa"
                        readOnly
                        onChange={(e) => { }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TimePicker
                        fullScreen={fullScreen}
                        label="Jam periksa"
                        readOnly
                        onChange={(e) => { }}
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
                        error={errorPemerikasaan?.planning}
                    />
                    {!errorPemerikasaan?.planning && <FormHelperText>{helperTextPemeriksaan.planning}</FormHelperText>}
                    {errorPemerikasaan?.planning?.map((error) => (
                        <FormHelperText error>{error}</FormHelperText>
                    ))}
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl
                        required
                        fullWidth
                        error={errorPemerikasaan?.keputusan}
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
                        {!errorPemerikasaan?.keputusan && <FormHelperText>{helperTextPemeriksaan.keputusan}</FormHelperText>}
                        {errorPemerikasaan?.keputusan?.map((error) => (
                            <FormHelperText error>{error}</FormHelperText>
                        ))}
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
                        error={errorPemerikasaan?.amnanesta}
                    />
                    {!errorPemerikasaan?.amnanesta && <FormHelperText>{helperTextPemeriksaan.amnanesta}</FormHelperText>}
                    {errorPemerikasaan?.amnanesta?.map((error) => (
                        <FormHelperText error>{error}</FormHelperText>
                    ))}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default StepPemeriksaan