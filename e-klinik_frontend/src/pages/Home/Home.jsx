import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Helpers/Context";

// Import Image Assets
import bgIImage from '../assets/img/bg_image_1.jpg';
import bgDoctor from "../assets/img/bg-doctor.png";
import doctor1 from "../assets/img/doctors/doctor_1.jpg";
import doctor2 from "../assets/img/doctors/doctor_2.jpg";
import doctor3 from "../assets/img/doctors/doctor_3.jpg";
import person1 from "../assets/img/person/person_1.jpg";
import person2 from "../assets/img/person/person_2.jpg";
import blog1 from "../assets/img/blog/blog_1.jpg";
import blog2 from "../assets/img/blog/blog_2.jpg";
import blog3 from "../assets/img/blog/blog_3.jpg";
import mobilaApp from "../assets/img/mobile_app.png";
import googlePlay from "../assets/img/google_play.svg";
import appStore from "../assets/img/app_store.svg"
// End Import Image Assets

import Landing from "../../components/Layouts/Landing/Landing";
import Calenders from "../Calenders/Calenders";
import { DOMAIN_SERVER } from "../../config";
import JamPraktek from "../../components/Tables/JamPraktek";

const Home = () => {
    const { user } = useContext(UserContext);
    useEffect(() => {
        document.title = "Klinik Dokter Rezka"
    }, [])
    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <>
            <Landing halaman="home">
                <div className="page-hero bg-image overlay-dark" style={{ backgroundImage: `url(${bgIImage})` }}>
                    <div className="hero-section">
                        <div className="container text-center wow zoomIn">
                            <span className="subhead">Jadilah Hidup Anda Lebih Sehat Bersama</span>
                            <h1 className="display-4">Klinik Dokter Rezka</h1>
                            <a href="#jam_praktek" className="btn btn-primary">Konsultasikan</a>
                        </div>
                    </div>
                </div>
                <div className="bg-light">
                    <div className="page-section py-3 mt-md-n5 custom-index">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-4 py-3 py-md-0">
                                    <div className="card-service wow fadeInUp">
                                        <div className="circle-shape bg-secondary text-white">
                                            <span className="mai-chatbubbles-outline"></span>
                                        </div>
                                        <p><span>Konsultasikan</span> dengan dokter</p>
                                    </div>
                                </div>
                                <div className="col-md-4 py-3 py-md-0">
                                    <div className="card-service wow fadeInUp">
                                        <div className="circle-shape bg-primary text-white">
                                            <span className="mai-shield-checkmark"></span>
                                        </div>
                                        <p><span>Perlindungan</span> Kesehatan</p>
                                    </div>
                                </div>
                                <div className="col-md-4 py-3 py-md-0">
                                    <div className="card-service wow fadeInUp">
                                        <div className="circle-shape bg-accent text-white">
                                            <span className="mai-basket"></span>
                                        </div>
                                        <p><span>Fasilitas</span> Apotek</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="page-section" id="jam_praktek">
                        <div className="container">
                            <h1 className="text-center mb-5 wow fadeInUp">Jadwal Mingguan</h1>
                            <div className="row mt-5" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="col-lg-8">
                                    <JamPraktek />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="page-section pb-0" id="tentang">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 py-3 wow fadeInUp">
                                <h1>Selamat datang di <br /> Klinik Dr. Rezka</h1>
                                <p className="text-grey mb-4">Klinik di jatibarang yang menjadi salah satu pusat pelayanan kesehatan di Kab. Indramayu merupakan salah satu instansi kesehatan yang sedang dikembangkan. Dengan jumlah pasien yang cukup banyak menyebabkan masalah yang cukup berat dalam mendapatkan informasi tentang pasiennya, kunjungan berobat pasien, rawat inap, data stok obat, dan laporan tranksaksi. Selain masalah pendataan pasien dan pengarsipan data pengobatan merupakan suatu hal penting yang perlu diperhatikan. Apalagi di Klinik dr. Rezka</p>
                                <a href="about.html" className="btn btn-primary">Selengkapnya</a>
                            </div>
                            <div className="col-lg-6 wow fadeInRight" data-wow-delay="400ms">
                                <div className="img-place custom-img-1">
                                    <img src={bgDoctor} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-section bg-light" id="dokter_kami">
                    <div className="container">
                        <h1 className="text-center mb-5 wow fadeInUp">Dokter Kami</h1>

                        <div className="owl-carousel wow fadeInUp row mt-5" id="doctorSlideshow">
                            <div className="item col-lg-4">
                                <div className="card-doctor">
                                    <div className="header">
                                        <img src={doctor1} alt="" />
                                    </div>
                                    <div className="body">
                                        <p className="text-xl mb-0">Dr. Stein Albert</p>
                                        <span className="text-sm text-grey">Cardiology</span>
                                    </div>
                                </div>
                            </div>
                            <div className="item col-lg-4">
                                <div className="card-doctor">
                                    <div className="header">
                                        <img src={doctor2} alt="" />
                                    </div>
                                    <div className="body">
                                        <p className="text-xl mb-0">Dr. Alexa Melvin</p>
                                        <span className="text-sm text-grey">Dental</span>
                                    </div>
                                </div>
                            </div>
                            <div className="item col-lg-4">
                                <div className="card-doctor">
                                    <div className="header">
                                        <img src={doctor3} alt="" />
                                        
                                    </div>
                                    <div className="body">
                                        <p className="text-xl mb-0">Dr. Rebecca Steffany</p>
                                        <span className="text-sm text-grey">General Health</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Landing>
        </>
    )
}
export default Home;