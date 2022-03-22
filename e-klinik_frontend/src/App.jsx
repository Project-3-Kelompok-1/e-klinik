import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./Helpers/Context";
import Resepsionis from "./pages/Admin/Resepsionis/Resepsionis";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// import env from "react-dotenv";
const App = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user'))
  });
  // console.log(env.DOMAIN_SERVER);
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ user, setUser }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resepsionis" element={<Resepsionis />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}
export default App;