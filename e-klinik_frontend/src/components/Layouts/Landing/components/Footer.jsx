import React from "react";

// Import CSS Landing Page
import "../../../../pages/assets/css/maicons.css";
import "../../../../pages/assets/css/bootstrap.css";
import "../../../../pages/assets/css/theme.css";
import "../../../../pages/assets/vendor/animate/animate.css";
// End Import CSS
const Footer = () => {
    return (
        <>
            <footer className="page-footer">
                <div className="container">
                    <div className="row px-md-3">
                        <div className="col sm-6 col-lg-3 py-3">
                            <h5>Company</h5>
                            <ul className="footer-menu">
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Career</a></li>
                                <li><a href="#">Editorial Team</a></li>
                                <li><a href="#">Protection</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-lg-3 py-3">
                            <h5>More</h5>
                            <ul className="footer-menu">
                                <li><a href="#">Terms & Condition</a></li>
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Advertise</a></li>
                                <li><a href="#">Join as Doctors</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-lg-3 py-3">
                            <h5>Our partner</h5>
                            <ul className="footer-menu">
                                <li><a href="#">One-Fitness</a></li>
                                <li><a href="#">One-Drugs</a></li>
                                <li><a href="#">One-Live</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-lg-3 py-3">
                            <h5>Contact</h5>
                            <p className="footer-link mt-2">351 Willow Street Franklin, MA 02038</p>
                            <a href="#" className="footer-link">701-573-7582</a>
                            <a href="#" className="footer-link">healthcare@temporary.net</a>

                            <h5 className="mt-3">Social Media</h5>
                            <div className="footer-sosmed mt-3">
                                <a href="#" target="_blank"><span className="mai-logo-facebook-f"></span></a>
                                <a href="#" target="_blank"><span className="mai-logo-twitter"></span></a>
                                <a href="#" target="_blank"><span className="mai-logo-google-plus-g"></span></a>
                                <a href="#" target="_blank"><span className="mai-logo-instagram"></span></a>
                                <a href="#" target="_blank"><span className="mai-logo-linkedin"></span></a>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <p id="copyright">Copyright &copy; 2020 <a href="https://macodeid.com/" target="_blank">MACode ID</a>. All right reserved</p>
                </div>
            </footer>
            {/* <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
            <script src="../assets/vendor/owl-carousel/js/owl.carousel.min.js"></script>
            <script src="../../../../pages/assets/vendor/wow/wow.min.js"></script>
            <script src="../../../../pagesassets/js/theme.js"></script> */}
        </>
    )
}
export default Footer;