import React, { useEffect, useState } from "react";
import { DOMAIN_SERVER } from "../../config";
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
    const url = DOMAIN_SERVER + '/api/register';
    const submitForm = async (e) => {
        e.preventDefault();
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
    }
   
    return (
        <div>
            <h1>Halaman Registrasi</h1>
            <form
                onSubmit={submitForm}
            >
                <label htmlFor="username">
                    Username
                </label>
                <input
                    type="text"
                    value={username} onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                <label htmlFor="password">
                    Password
                </label>
                <input type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <label htmlFor="konfirmasi_password">
                    Konfirmasi Password
                </label>
                <input
                    type="password"
                    value={konfirmasiPassword}
                    onChange={(e) => {
                        setKonfirmasiPassword(e.target.value);
                    }}
                />
                <button type="submit">Daftar</button>
            </form>
        </div>
    )
}
export default Register;