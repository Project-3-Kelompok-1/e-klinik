import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../Helpers/Context";


// Import CSS Landing Page
import "../../../pages/assets/css/maicons.css";
import "../../../pages/assets/css/bootstrap.css";
import "../../../pages/assets/css/theme.css";
import "../../../pages/assets/vendor/animate/animate.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
// End Import CSS

const Landing = ({ children, halaman }) => {
    return (
        <>
            <div className="back-to-top"></div>

            <Header active={halaman} />
            {children}
            <Footer />
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

            <script src="../assets/vendor/owl-carousel/js/owl.carousel.min.js"></script>

            <script src="../../../pages/assets/vendor/wow/wow.min.js"></script>

            <script src="../../../pages/assets/js/theme.js"></script>
        </>
    )
}
export default Landing;