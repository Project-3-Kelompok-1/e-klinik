import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
]
const ProfileLengkap = ({ profile }) => {
    const tempatTanggalLahir = (time) => {
        if (!profile.tempat_lahir || !profile.tgl_lahir) {
            return '-'
        }
        const date = new Date(time)
        const day = date.getDate()
        const month = bulan[date.getMonth()]
        const year = date.getFullYear()
        return `${profile.tempat_lahir}, ${day} ${month} ${year}`
    }
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography
                    variant="h6"
                    component="div"
                    color="text.primary"
                    sx={{ fontSize: '1.25rem', marginTop: '1rem' }}
                >
                    Profil lengkap
                </Typography>
                <Card variant="outlined" sx={{ marginTop: '1.7rem' }}>
                    <CardContent>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.9rem' }}
                                    >
                                        NIK
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.9rem' }}
                                    >
                                        {profile.nik ? profile.nik : '-'}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ marginY: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.9rem' }}
                                    >
                                        Nama depan
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.9rem' }}
                                    >
                                        {profile.nama_depan ? profile.nama_depan : '-'}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ marginY: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.9rem' }}
                                    >
                                        Nama belakang
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.9rem' }}
                                    >
                                        {profile.nama_belakang ? profile.nama_belakang : '-'}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ marginY: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.9rem' }}
                                    >
                                        Jenis kelamin
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.9rem' }}
                                    >
                                        {profile.jenis_kelamin ? profile.jenis_kelamin : '-'}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ marginY: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.9rem' }}
                                    >
                                        Alamat
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.9rem' }}
                                    >
                                        {profile.alamat_rumah ? profile.alamat_rumah : '-'}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ marginY: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.9rem' }}
                                    >
                                        Tempat, tanggal lahir
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.9rem' }}
                                    >
                                        {tempatTanggalLahir(profile.tgl_lahir)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ marginY: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.9rem' }}
                                    >
                                        Usia
                                    </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.9rem' }}
                                    >
                                        {profile.usia ? `${profile.usia} thn` : '-'}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ marginY: 2 }} />
                        </Box>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}
export default ProfileLengkap