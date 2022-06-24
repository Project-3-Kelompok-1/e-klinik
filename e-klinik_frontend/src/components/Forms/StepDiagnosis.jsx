import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const StepDiagnosis = ({ diagnosis, setDiagnosis, ...restProps }) => {
    const handlePush = () => {
        const newElement = { id: uuidv4(), diagnosa_pasien: '' }
        setDiagnosis(oldArray => [...oldArray, newElement])
    }
    const handleRemove = (id) => {
        if (diagnosis.length > 1) {
            setDiagnosis(diagnosis.filter(item => item.id != id))
        }
    }
    const handleChangeDiagnosis = index => e => {
        let newArr = [...diagnosis]
        newArr[index].diagnosa_pasien = e.target.value
        setDiagnosis(newArr)
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
                            value={item.diagnosa_pasien}
                            onChange={handleChangeDiagnosis(index)}
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
export default StepDiagnosis