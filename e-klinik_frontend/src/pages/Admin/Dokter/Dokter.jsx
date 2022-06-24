import { Toolbar } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../../components/Layouts/Dashoard/Dashboard";
import { isDokter } from "../../../Helpers/checkUser";
import { UserContext } from "../../../Helpers/Context";

const Dokter = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      const result = await isDokter()
        if (!result) {
        navigate('/')
      }
    })()
  }, [user])
  return (
    <Dashboard halaman="Dashboard Dokter">
      <Toolbar />
    </Dashboard>
  )
}
export default Dokter;