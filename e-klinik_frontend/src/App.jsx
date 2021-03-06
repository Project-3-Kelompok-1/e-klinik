import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DOMAIN_SERVER } from "./config";
import { UserContext } from "./Helpers/Context";
import DataDokter from "./pages/Admin/DataDokter";
import DataObat from "./pages/Admin/Resepsionis/DataObat";
import Dokter from "./pages/Admin/Dokter/Dokter";
import Resepsionis from "./pages/Admin/Resepsionis/Resepsionis";
import Calenders from "./pages/Calenders/Calenders";
import Doctors from "./pages/Doctors/Doctors";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import JadwalPraktek from "./pages/Admin/Resepsionis/JadwalPraktek";
import CustomizeScheduleForm from "./pages/Tests/CustomizeScheduleForm";
import SignUp from "./pages/Register/SignUp";
import HomePage from "./pages/Pasien/HomePage";
import Pendaftaran from "./pages/Pasien/Pendaftaran";
import DataPasien from "./pages/Admin/Resepsionis/DataPasien";
import Mendaftar from "./pages/Admin/Pendaftaran/Mendaftar";
import Menunggu from "./pages/Admin/Pendaftaran/Menunggu";
import Diperiksa from "./pages/Admin/Pendaftaran/Diperiksa";
const App = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user'))
  });

  const fetchUser = async () => {
    let response = await fetch(DOMAIN_SERVER + '/api/user', {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.token}`
      })
    })
    response = await response.json();
    if (!response.username) {
      localStorage.removeItem('user')
      return () => {
        setUser(null)
      }
    }
  }
  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [])
  // console.log(env.DOMAIN_SERVER);
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ user, setUser }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* Resepsionis */}
          <Route path="/resepsionis" element={<Resepsionis />} />
          <Route path="/resepsionis/data-dokter" element={<DataDokter />} />
          <Route path="/resepsionis/jadwal-praktek" element={<JadwalPraktek />} />
          <Route path="/resepsionis/data-obat" element={<DataObat />} />
          <Route path="/resepsionis/data-pasien" element={<DataPasien />} />
          <Route path="/resepsionis/pendaftaran/mendaftar" element={<Mendaftar />} />
          <Route path="/resepsionis/pendaftaran/menunggu" element={<Menunggu />} />
          <Route path="/resepsionis/pendaftaran/diperiksa" element={<Diperiksa />} />
          {/* Pasien */}
          <Route path="/profile" element={<HomePage />} />
          <Route path="/pendaftaran" element={<Pendaftaran />} />
          {/* Dokter */}
          <Route path="/dokter" element={<Dokter />} />
          <Route path="/dokter/data-dokter" element={<DataDokter />} />
          <Route path="/dokter/jadwal-praktek" element={<JadwalPraktek />} />
          <Route path="/dokter/pemeriksaan" element={<Diperiksa />} />

          {/* <Route path="/test/customize-schedule-form" element={<CustomizeScheduleForm />} /> */}
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}
export default App;