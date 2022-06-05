import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from "react-router-dom";
import { DOMAIN_SERVER } from "../../config";

const theme = createTheme();

export default function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
    const url = DOMAIN_SERVER + '/api/register'
    useEffect(() => {
        document.title = "Klinik Dr. Rezka - Register"
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !password || !konfirmasiPassword) {
            alert("Setiap kolom harus diisi !!!");
            return;
        }
        if (password !== konfirmasiPassword) {
            alert("Konfirmasi password salah !!!");
            return;
        }
        const data = {
            "username": username,
            "password": password
        };
        const fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            })
        };
        let response = await fetch(url, fetchData);
        let result = await response.json();
        if (result.status === 'failed') {
            if (result?.errors?.username?.Unique) {
                alert("Akun sudah terdaftar !!!");
            }
            else if (result?.errors?.username?.Required) {
                alert("Username tidak boleh kosong");
            }
            else if (result?.errors?.username?.Max) {
                alert("Username maksimal " + result?.errors?.username?.Max[0] + " huruf");
            }
            if (result?.errors?.password?.Required) {
                alert("Password tidak boleh kosong");
            }
            // console.log(result?.errors);
            // console.log(Object.keys(result?.errors).length);
        }
        else {

            alert("Pendaftaran sukses");
        }
        // console.log(response);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoComplete="username"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Konfirmasi password"
                                    type="password"
                                    id="konfirmasi-password"
                                    autoComplete="new-password"
                                    onChange={(e) => {
                                        setKonfirmasiPassword(e.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            component="span"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink
                                    to="/login"
                                    style={{
                                        color: '#1976d2',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Sudah punya akun? Log in
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}