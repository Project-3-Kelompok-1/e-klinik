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
            <footer className="page-footer" id="kontak">
                <div className="container">
                    <div className="row px-md-3">
                        <div className="col-12 py-3">
                            <h5>Kontak</h5>
                            <div className="d-flex gap-3">
                                <p className="footer-link mr-5">Jl. Mayor Dasuki, Jatibarang, Kabupaten Indramayu, Jawa Barat 45273, Indonesia</p>
                                <a href="#" className="footer-link mr-5">+6287828677663</a>
                                <a href="#" className="footer-link mr-5">healthcare@temporary.net</a>
                            </div>
                        </div>
                    </div>
                    <hr />
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