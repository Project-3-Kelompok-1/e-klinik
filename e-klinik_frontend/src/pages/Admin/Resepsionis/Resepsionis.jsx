import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DOMAIN_SERVER } from "../../../config";
import { UserContext } from "../../../Helpers/Context";
const Resepsionis = () => {
    const url = DOMAIN_SERVER + '/api/hello';
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user'))
    });
    useEffect(() => {
        let unMounted = false;
        if (user?.role !== 'resepsionis' || !user) {
            navigate('/');
            return () => {
                unMounted = true;
            }
        }
    }, [user])
    // useEffect(()=>{
    //     console.log(user);
    // }, [setUser, user])
    return (
        <div>
            Halaman Resepsionis
        </div>
    )
}
export default Resepsionis;