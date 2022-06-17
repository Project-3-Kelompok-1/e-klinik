import { Close } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, Container, CssBaseline, Grid, IconButton, Paper, Snackbar, Tab, Tabs, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Alert from "../../components/Feedback/Alert";
import { TabPanel, a11yProps } from "../../components/Navigations/TabPanel";
import JamPraktek from "../../components/Tables/JamPraktek";
import RiwayatPendaftaran from "../../components/Tables/RiwayatPendaftaran";
import { DOMAIN_SERVER } from "../../config";
import { UserContext } from "../../Helpers/Context";
import FormPendaftaran from "./components/FormPendaftaran";
import ProfileCard from "./components/ProfileCard";
import ProfileLengkap from "./components/ProfileLengkap";
import Layout from "./Layout";
const Pendaftaran = () => {
    const [profile, setProfile] = useState({})
    const [booking, setBooking] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const { user } = useContext(UserContext)
    const [formulirPendaftaran, setFormulirPendaftaran] = useState(null)
    const [valueTab, setValueTab] = useState(0)
    const handleChangeTab = (e, newValue) => {
        setValueTab(newValue)
    }
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
    const handleShowAlert = (type, message) => {
        setSeverity(type)
        setAlertMessage(message)
        setOpenAlert(true)
    }
    const handleHideAlert = () => {
        setAlertMessage('')
        setOpenAlert(false)
    }
    return (
        <Layout>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ marginTop: '4rem' }}>
                <Grid container spacing={3} sx={{ paddingTop: '1.7rem' }}>
                    <Grid item md={4} xs={12}>
                        <ProfileCard profile={profile} user={user} expandComponent={<ProfileLengkap profile={profile} />} expandButton />
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Card variant="outlined">
                            <CardContent>
                                <Tabs
                                    value={valueTab}
                                    onChange={handleChangeTab}
                                    aria-label="basic tabs example"
                                >
                                    <Tab component="span" label="Jam Praktek" {...a11yProps(0)} />
                                    <Tab component="span" label="Riwayat Pendaftaran" {...a11yProps(1)} />
                                </Tabs>
                                <Box sx={{ marginTop: '1.7rem' }}>
                                    <TabPanel
                                        value={valueTab}
                                        index={0}
                                    >
                                        <JamPraktek handleClickBooking={handleClickBooking} />
                                    </TabPanel>
                                    <TabPanel
                                        value={valueTab}
                                        index={1}
                                    >
                                        <RiwayatPendaftaran />
                                    </TabPanel>
                                </Box>
                            </CardContent>
                        </Card>
                        {booking &&
                            <FormPendaftaran
                                handleCancelBooking={handleCancelBooking}
                                profile={profile}
                                formulirPendaftaran={formulirPendaftaran}
                                handleShowAlert={handleShowAlert}
                            />
                        }
                    </Grid>
                </Grid>
            </Container>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleHideAlert}
            >
                <Alert
                    onClose={handleHideAlert}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Layout>
    )
}
export default Pendaftaran