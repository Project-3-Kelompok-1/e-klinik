import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Helpers/Context";
import { DOMAIN_SERVER } from "../../config";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const url = DOMAIN_SERVER + '/api/login';
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Dr Rezka - Login"
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
    const submitForm = async (e) => {
        e.preventDefault();

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
            // setUser(result.data);
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
    }
    return (
        <div>
            <h1>
                Halaman login
            </h1>
            <form
                onSubmit={submitForm}
            >
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button type="submit">Masuk</button>
            </form>
        </div>
    )
}
export default Login;