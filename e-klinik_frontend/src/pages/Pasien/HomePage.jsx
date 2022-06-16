import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Divider, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Helpers/Context";
import Layout from "./Layout"
import "../../App.css"
import { DOMAIN_SERVER } from "../../config";
import ProfileCard from "./components/ProfileCard";
import ProfileLengkap from "./components/ProfileLengkap";
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
    return (
        <Layout>
            <CssBaseline />
            <Container maxWidth="lg" sx={{marginTop: '4rem'}}>
                <Grid container spacing={3} sx={{ paddingTop: '1.7rem' }}>
                    <Grid item md={4} xs={12}>
                        <ProfileCard profile={profile} user={user} />
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <ProfileLengkap profile={profile} />
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}
export default HomePage