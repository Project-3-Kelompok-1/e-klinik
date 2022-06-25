import { Box, Button, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid";
import { helperTextPenanganan } from "../../Helpers/HelperText";
const StepPenanganan = ({ penanganan, setPenanganan, obat, setObat, errorPenanganan, ...restProps }) => {
    // const [obat, setObat] = useState([{ id: uuidv4(), nama_obat: '', jumlah_obat: 0, dosis_konsumsi: '' }])
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
                        value={penanganan.tindakan_penanganan}
                        onChange={(e) => {
                            setPenanganan((prevState) => {
                                return {
                                    ...prevState,
                                    tindakan_penanganan: e.target.value
                                }
                            })
                        }}
                        error={errorPenanganan?.tindakan_penanganan}
                    />
                    {!errorPenanganan?.tindakan_penanganan && <FormHelperText>{helperTextPenanganan.tindakan_penanganan}</FormHelperText>}
                    {errorPenanganan?.tindakan_penanganan?.map((error, i) => (
                        <FormHelperText error>{error}</FormHelperText>
                    ))}
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
                            value={item.nama_obat}
                            onChange={(e) => {
                                let newArr = [...obat]
                                newArr[index].nama_obat = e.target.value
                                setObat(newArr)
                            }}
                            error={errorPenanganan && errorPenanganan[`nama_obat.${index}`]}
                        />
                        {errorPenanganan && errorPenanganan[`nama_obat.${index}`] ? (
                            errorPenanganan[`nama_obat.${index}`].map((error, i) => (
                                <FormHelperText key={i} error>{error}</FormHelperText>
                            ))
                        ) : (
                            <FormHelperText>{helperTextPenanganan.nama_obat}</FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Jumlah obat"
                            variant="outlined"
                            required
                            fullWidth
                            type="number"
                            value={item.jumlah_obat}
                            onChange={(e) => {
                                let newArr = [...obat]
                                newArr[index].jumlah_obat = e.target.value
                                setObat(newArr)
                            }}
                            error={errorPenanganan && errorPenanganan[`jumlah_obat.${index}`]}
                        />
                        {errorPenanganan && errorPenanganan[`jumlah_obat.${index}`] ? (
                            errorPenanganan[`jumlah_obat.${index}`].map((error, i) => (
                                <FormHelperText key={i} error>{error}</FormHelperText>
                            ))
                        ) : (
                            <FormHelperText>{helperTextPenanganan.nama_obat}</FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Dosis konsumsi"
                            variant="outlined"
                            required
                            fullWidth
                            multiline
                            rows={3}
                            value={item.dosis_konsumsi}
                            onChange={(e) => {
                                let newArr = [...obat]
                                newArr[index].dosis_konsumsi = e.target.value
                                setObat(newArr)
                            }}
                            error={errorPenanganan && errorPenanganan[`dosis_konsumsi.${index}`]}
                        />
                        {errorPenanganan && errorPenanganan[`dosis_konsumsi.${index}`] ? (
                            errorPenanganan[`dosis_konsumsi.${index}`].map((error, i) => (
                                <FormHelperText key={i} error>{error}</FormHelperText>
                            ))
                        ) : (
                            <FormHelperText>{helperTextPenanganan.nama_obat}</FormHelperText>
                        )}
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
export default StepPenanganan