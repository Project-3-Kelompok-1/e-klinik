import React, { useEffect, useState } from "react";

// Import CSS Landing Page
import "../../../../pages/assets/css/maicons.css";
import "../../../../pages/assets/css/bootstrap.css";
import "../../../../pages/assets/css/theme.css";
import "../../../../pages/assets/vendor/animate/animate.css";
import { NavLink } from "react-router-dom";
// End Import CSS
const Header = ({ active }) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
                    <div className="container">
                        <a className="navbar-brand" href="#"><span className="text-primary">Dr</span>-Rezka</a>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupport"
                            aria-controls="navbarSupport"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={() => {
                                setShow(!show);
                            }}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className={`collapse navbar-collapse ${show ? "show" : ""}`} id="navbarSupport" style={{transition: 'ease-in-out', transitionDelay: '0.5s'}}>
                            <ul className="navbar-nav ml-auto">
                                <li className={`nav-item ${active === 'home' ? 'active' : ''}`}>
                                    <NavLink className="nav-link" to="/">Home</NavLink>
                                </li>
                                <li className={`nav-item ${active === 'about' ? 'active' : ''}`}>
                                    <a className="nav-link" href="about.html">About Us</a>
                                </li>
                                <li className={`nav-item ${active === 'doctors' ? 'active' : ''}`}>
                                    <NavLink className="nav-link" to="/doctors">Doctors</NavLink>
                                </li>
                                <li className={`nav-item ${active === 'blog' ? 'active' : ''}`}>
                                    <a className="nav-link" href="blog.html">News</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="contact.html">Contact</a>
                                </li>
                                <li className="nav-item">
                                    {/* <a className="btn btn-primary ml-lg-3" href="#">Login / Register</a> */}
                                    <NavLink className="btn btn-primary ml-lg-3" to="/login">Login / Register</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            {/* <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
            <script src="../assets/vendor/owl-carousel/js/owl.carousel.min.js"></script>
            <script src="../../../../pages/assets/vendor/wow/wow.min.js"></script>
            <script src="../../../../pagesassets/js/theme.js"></script> */}
        </>
    )
}
export default Header;