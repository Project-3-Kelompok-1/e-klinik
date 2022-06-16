import { Close } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, Container, CssBaseline, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import JamPraktek from "../../components/Tables/JamPraktek";
import { DOMAIN_SERVER } from "../../config";
import { UserContext } from "../../Helpers/Context";
import FormPendaftaran from "./components/FormPendaftaran";
import ProfileCard from "./components/ProfileCard";
import ProfileLengkap from "./components/ProfileLengkap";
import Layout from "./Layout";
const Pendaftaran = () => {
    const [profile, setProfile] = useState({})
    const [booking, setBooking] = useState(false)
    const { user } = useContext(UserContext)
    const [formulirPendaftaran, setFormulirPendaftaran] = useState(null)
    const handleClickBooking = (data) => {
        console.log(data);
        setBooking(true)
        setFormulirPendaftaran(data)
    }
    const handleCancelBooking = () => {
        setBooking(false)
        setFormulirPendaftaran(null)
    }
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
    return (
        <Layout>
            <CssBaseline />
            <Container maxWidth="lg">
                <Grid container spacing={3} sx={{ paddingTop: '1.7rem' }}>
                    <Grid item md={4} xs={12}>
                        <ProfileCard profile={profile} user={user} expandComponent={<ProfileLengkap profile={profile} />} expandButton />
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
                                    Jam praktek
                                </Typography>
                                <Box sx={{ marginTop: '1.7rem' }}>
                                    <JamPraktek handleClickBooking={handleClickBooking} />
                                </Box>
                            </CardContent>
                        </Card>
                        {booking && <FormPendaftaran handleCancelBooking={handleCancelBooking} profile={profile} formulirPendaftaran={formulirPendaftaran} />}
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}
export default Pendaftaran