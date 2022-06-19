import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Snackbar, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Helpers/Context";
import Layout from "./Layout"
import "../../App.css"
import { DOMAIN_SERVER } from "../../config";
import ProfileCard from "./components/ProfileCard";
import ProfileLengkap from "./components/ProfileLengkap";
import UpdateProfile from "../../components/Forms/UpdateProfile";
import useAlert from "../../Helpers/CustomHooks/useAlert";
import Alert from "../../components/Feedback/Alert";
const HomePage = () => {
    const [open, severity, message, handleShow, handleHide] = useAlert()
    const [profile, setProfile] = useState({})
    const [editProfile, setEditProfile] = useState(false)
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
    const handleClickEdit = () => {
        setEditProfile(true)
    }
    const handleCancelEdit = () => {
        fetchProfile()
        setEditProfile(false)
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
                        <ProfileCard profile={profile} user={user} handleClickEdit={handleClickEdit} />
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <ProfileLengkap profile={profile} />
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
export default HomePage