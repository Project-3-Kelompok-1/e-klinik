import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Helpers/Context";

const Home = () => {
    const { user } = useContext(UserContext);
    useEffect(() => {
        console.log(user);
    }, [user])
    // const { setUser } = useContext(UserContext);
    // useEffect(() => {
    //     // console.log("Hello");
    //     setUser({ username: 'mariadhari6' })
    //     // console.log(user);
    // }, [setUser])
    return (

        <div>
            Halaman home

        </div>
    )
}
export default Home;