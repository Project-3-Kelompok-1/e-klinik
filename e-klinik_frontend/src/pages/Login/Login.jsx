import React, { useContext, useEffect, useState } from "react";
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
import { NavLink, useNavigate } from "react-router-dom";
import { DOMAIN_SERVER } from "../../config";
import { UserContext } from "../../Helpers/Context";

const theme = createTheme();

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const url = DOMAIN_SERVER + '/api/login'
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        document.title = "Klinik Dr. Rezka - Login"
    }, [])
    useEffect(() => {
        let isCancelled = false;
        if (user?.role === 'resepsionis') {
            navigate('/resepsionis');

            return () => {
                isCancelled = true
            }
        }
    }, [user, navigate])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            alert("Username dan password harus diisi !!!");
            return;
        }
        const data = {
            "username": username,
            "password": password
        };
        const postLogin = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            })
        };
        let response = await fetch(url, postLogin);
        let result = await response.json();
        if (result?.status === 'success' && result?.data) {
            localStorage.setItem('user', JSON.stringify(result.data))
            alert("Login berhasil");
            setUser(JSON.parse(localStorage.getItem('user')))
            console.log(user);
        }
        else if (result?.status === 'failed') {
            alert(result?.message);
        }
        setUsername('');
        setPassword('');
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
                        Log in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            autoFocus
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            component="span"
                            onClick={handleSubmit}
                        >
                            Log in
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <NavLink
                                    to="/"
                                    style={{
                                        color: '#1976d2',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Lupa password?
                                </NavLink>
                            </Grid>
                            <Grid item>
                                <NavLink
                                    to="/register"
                                    style={{
                                        color: '#1976d2',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {"Tidak punya akun? Daftar"}
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}