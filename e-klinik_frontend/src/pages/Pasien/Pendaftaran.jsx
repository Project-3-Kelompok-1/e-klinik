import { Box, Card, CardContent, CardHeader, Container, CssBaseline, Grid, IconButton, Paper, Snackbar, Tab, Tabs, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Alert from "../../components/Feedback/Alert";
import UpdateProfile from "../../components/Forms/UpdateProfile";
import { TabPanel, a11yProps } from "../../components/Navigations/TabPanel";
import JamPraktek from "../../components/Tables/JamPraktek";
import RiwayatPendaftaran from "../../components/Tables/RiwayatPendaftaran";
import { DOMAIN_SERVER } from "../../config";
import { UserContext } from "../../Helpers/Context";
import useAlert from "../../Helpers/CustomHooks/useAlert";
import FormPendaftaran from "./components/FormPendaftaran";
import ProfileCard from "./components/ProfileCard";
import ProfileLengkap from "./components/ProfileLengkap";
import Layout from "./Layout";
const Pendaftaran = () => {
    const [profile, setProfile] = useState({})
    const [booking, setBooking] = useState(false)
    const { user } = useContext(UserContext)
    const [formulirPendaftaran, setFormulirPendaftaran] = useState(null)
    const [valueTab, setValueTab] = useState(0)
    const [editProfile, setEditProfile] = useState(false)
    const [open, severity, message, handleShow, handleHide] = useAlert()
    const handleClickEdit = () => {
        setEditProfile(true)
    }
    const handleCancelEdit = () => {
        fetchProfile()
        setEditProfile(false)
    }
    const handleChangeTab = (e, newValue) => {
        setValueTab(newValue)
    }
    const handleClickBooking = (data) => {
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
            <Container maxWidth="lg" sx={{ marginTop: '4rem' }}>
                <Grid container spacing={3} sx={{ paddingTop: '1.7rem' }}>
                    <Grid item md={4} xs={12}>
                        <ProfileCard profile={profile} user={user} handleClickEdit={handleClickEdit} expandComponent={<ProfileLengkap profile={profile} />} expandButton />
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
                                handleShowAlert={handleShow}
                            />
                        }
                    </Grid>
                </Grid>
            </Container>
            <UpdateProfile
                open={editProfile}
                fullWidth={true}
                maxWidth="md"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                handleCancelEdit={handleCancelEdit}
                profile={profile}
                handleShowAlert={handleShow}
            />
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleHide}
            >
                <Alert
                    onClose={handleHide}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Layout>
    )
}
export default Pendaftaran