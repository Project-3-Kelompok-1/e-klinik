import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DOMAIN_SERVER } from "../../config";
import { UserContext } from "../../Helpers/Context";
import Header from "./components/Header";
const Layout = (props) => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    // check self data
    const checkUser = () => {
        fetch(DOMAIN_SERVER + '/api/user', {
            headers: new Headers({
                'Authorization': `Bearer ${user.token}`
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.username !== user.username) {
                    navigate('/')
                }
            })
            .catch(error => {
                alert("Access denied")
            })
    }
    useEffect(() => {
        let unMounted = false
        if (user?.role !== 'pasien') {
            navigate('/login')
            return () => {
                unMounted = true
            }
        }
        checkUser()
    }, [user])
    return (
        <div>
            <Header username={user?.username}/>
            {props.children}
        </div>
    )
}
export default Layout