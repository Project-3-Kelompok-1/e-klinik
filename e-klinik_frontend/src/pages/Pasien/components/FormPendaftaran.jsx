import { Close } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { hoursAndMinutes } from "../../../Helpers/DateConvert";
const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
]
const tanggalBooking = (time) => {
    const date = new Date(time)
    const day = date.getDate()
    const month = bulan[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
}
const FormPendaftaran = ({ handleCancelBooking, profile, formulirPendaftaran }) => {
    return (
        <Card variant="outlined" sx={{ marginTop: '1.7rem' }}>
            <CardContent>
                <Box
                    sx={{
                        fontSize: '1.125rem',
                        marginY: '.5rem',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography
                        color="text.primary"
                        variant="h6"
                        component="div"
                    >
                        Formulir Pendaftaran
                    </Typography>
                    <IconButton
                        component="span"
                        onClick={handleCancelBooking}
                    >
                        <Close />
                    </IconButton>
                </Box>
                <Paper variant="outlined" sx={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <Box sx={{
                        backgroundColor: '#f7f7f7',
                        padding: '.7rem'
                    }}>
                        <Typography>
                            Informasi Pasien
                        </Typography>
                    </Box>
                    <Box sx={{
                        padding: '.7rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        marginTop: '.2rem'
                    }}>
                        <Grid container>
                            <Grid item xs={4} md={2}>
                                <Typography
                                    color="text.secondary"
                                >
                                    NIK
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Typography
                                    color="text.secondary"
                                >
                                    {profile.nik}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} md={2}>
                                <Typography
                                    color="text.secondary"
                                >
                                    Nama Pasien
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Typography
                                    color="text.secondary"
                                >
                                    {`${profile.nama_depan} ${profile.nama_belakang}`}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} md={2}>
                                <Typography
                                    color="text.secondary"
                                >
                                    Usia
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Typography
                                    color="text.secondary"
                                >
                                    {profile.usia} thn
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} md={2}>
                                <Typography
                                    color="text.secondary"
                                >
                                    Alamat
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Typography
                                    color="text.secondary"
                                >
                                    {profile.alamat_rumah}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
                <Paper variant="outlined" sx={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <Box sx={{
                        backgroundColor: '#f7f7f7',
                        padding: '.7rem'
                    }}>
                        <Typography>
                            Informasi Pendaftaran
                        </Typography>
                    </Box>
                    <Box sx={{
                        padding: '.7rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        marginTop: '.2rem'
                    }}>
                        <Grid container>
                            <Grid item xs={4} md={2}>
                                <Typography
                                    color="text.secondary"
                                >
                                    Hari
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Typography
                                    color="text.secondary"
                                >
                                    {formulirPendaftaran.hari}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} md={2}>
                                <Typography
                                    color="text.secondary"
                                >
                                    Tanggal
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Typography
                                    color="text.secondary"
                                >
                                    {tanggalBooking(formulirPendaftaran.tgl)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} md={2}>
                                <Typography
                                    color="text.secondary"
                                >
                                    Waktu
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Typography
                                    color="text.secondary"
                                >
                                    {`${hoursAndMinutes(formulirPendaftaran.jam_mulai)} - ${hoursAndMinutes(formulirPendaftaran.jam_selesai)} WIB`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
                <TextField
                    sx={{ marginTop: '0.5rem', marginBottom: '1rem', width: '100%' }}
                    id="outlined-multiline-static"
                    label="Konsultasi Keluhan"
                    multiline
                    rows={4}
                />
                <Button
                    component="span"
                    variant="contained"
                    sx={{ textTransform: 'none' }}
                >
                    Mendaftar
                </Button>
            </CardContent>
        </Card>
    )
}
export default FormPendaftaran