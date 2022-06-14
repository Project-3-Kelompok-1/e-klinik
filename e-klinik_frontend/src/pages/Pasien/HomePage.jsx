import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Divider, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Helpers/Context";
import Layout from "./Layout"
import "../../App.css"
import { DOMAIN_SERVER } from "../../config";
const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
]
const HomePage = () => {
    const [profile, setProfile] = useState({})
    const { user } = useContext(UserContext)
    const fetchProfile = () => {
        fetch(DOMAIN_SERVER + '/api/pasien/profile', {
            headers: new Headers({
                'Authorization': `Bearer ${user.token}`
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data?.pasien) {
                    setProfile(data.pasien)
                }
            }).catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        fetchProfile()
    }, [user])
    const toDate = (time) => {
        if (!profile.tempat_lahir || !profile.tgl_lahir) {
            return '-'
        }
        let tempat_tgl_lahir = profile.tempat_lahir
        const date = new Date(time)
        const day = date.getDate()
        const month = bulan[date.getMonth()]
        const year = date.getFullYear()
        return `${profile.tempat_lahir}, ${day} ${month} ${year}`
    }
    return (
        <Layout>
            <CssBaseline />
            <Container maxWidth="lg">
                <Grid container spacing={3} sx={{ paddingTop: '1.7rem' }}>
                    <Grid item md={4} xs={12}>
                        <Card variant="outlined" elevation={0}>
                            <CardMedia
                                component="img"
                                image="https://image-cdn.medkomtek.com/87Ot9M7pV7aGdsPDc8bV_tKa6F0=/1280x720/smart/filters:quality(75):strip_icc():format(jpeg)/klikdokter-media-buckets/medias/2320143/original/029932100_1602670069-Sindrom-Good-Girl-Penyebab-Wanita-Sulit-Bahagia-shutterstock_1639602457.jpg"

                            />
                            <CardContent sx={{ paddingLeft: '1rem' }}>
                                <Typography gutterBottom variant="h5" component="div" color="text.primary">
                                    {user.username}
                                </Typography>
                                <Typography
                                    variant="body2" color="text.secondary"
                                >
                                    {profile.alamat_rumah ? profile.alamat_rumah : '-'}
                                </Typography>
                                <Divider sx={{ marginTop: 3 }} />
                            </CardContent>
                            <CardActions sx={{ paddingLeft: '1rem', paddingBottom: '1rem' }}>
                                <Button
                                    // size="small" 
                                    variant="contained"
                                    component="span"
                                    color="warning"
                                    sx={{ textTransform: 'none' }}
                                >
                                    Ubah profil
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item md={8} xs={12}>
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
                                                        {toDate(profile.tgl_lahir)}
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
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}
export default HomePage