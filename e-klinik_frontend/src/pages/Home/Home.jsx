import React, { useContext, useEffect } from "react";
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
                            <span className="subhead">Let's make your life happier</span>
                            <h1 className="display-4">Healthy Living</h1>
                            <a href="#" className="btn btn-primary">Let's Consult</a>
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
                                        <p><span>Chat</span> with a doctors</p>
                                    </div>
                                </div>
                                <div className="col-md-4 py-3 py-md-0">
                                    <div className="card-service wow fadeInUp">
                                        <div className="circle-shape bg-primary text-white">
                                            <span className="mai-shield-checkmark"></span>
                                        </div>
                                        <p><span>One</span>-Health Protection</p>
                                    </div>
                                </div>
                                <div className="col-md-4 py-3 py-md-0">
                                    <div className="card-service wow fadeInUp">
                                        <div className="circle-shape bg-accent text-white">
                                            <span className="mai-basket"></span>
                                        </div>
                                        <p><span>One</span>-Health Pharmacy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="page-section">
                        <div className="container">
                            <h1 className="text-center mb-5 wow fadeInUp">Make Appointment</h1>

                            <div className="row mt-5" style={{display: 'flex', justifyContent: 'center'}}>
                                
                                <div className="col-lg-6">
                                    <Calenders />
                                </div>

                                {/* <div className="col-lg-4 py-2 wow zoomIn">
                                    <div className="card-blog">
                                        <div className="header">
                                            <div className="post-category">
                                                <a href="#">Covid19</a>
                                            </div>
                                            <a href="blog-details.html" className="post-thumb">
                                                <img src={blog1} alt="" />
                                            </a>
                                        </div>
                                        <div className="body">
                                            <h5 className="post-title"><a href="blog-details.html">List of Countries without Coronavirus case</a></h5>
                                            <div className="site-info">
                                                <div className="avatar mr-2">
                                                    <div className="avatar-img">
                                                        <img src={person1} alt="" />
                                                    </div>
                                                    <span>Roger Adams</span>
                                                </div>
                                                <span className="mai-time"></span> 1 week ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 py-2 wow zoomIn">
                                    <div className="card-blog">
                                        <div className="header">
                                            <div className="post-category">
                                                <a href="#">Covid19</a>
                                            </div>
                                            <a href="blog-details.html" className="post-thumb">
                                                <img src={blog2} alt="" />
                                            </a>
                                        </div>
                                        <div className="body">
                                            <h5 className="post-title"><a href="blog-details.html">Recovery Room: News beyond the pandemic</a></h5>
                                            <div className="site-info">
                                                <div className="avatar mr-2">
                                                    <div className="avatar-img">
                                                        <img src={person1} alt="" />
                                                    </div>
                                                    <span>Roger Adams</span>
                                                </div>
                                                <span className="mai-time"></span> 4 weeks ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 py-2 wow zoomIn">
                                    <div className="card-blog">
                                        <div className="header">
                                            <div className="post-category">
                                                <a href="#">Covid19</a>
                                            </div>
                                            <a href="blog-details.html" className="post-thumb">
                                                <img src={blog3} alt="" />
                                            </a>
                                        </div>
                                        <div className="body">
                                            <h5 className="post-title">
                                                <a href="blog-details.html">What is the impact of eating too much sugar?
                                                </a>
                                            </h5>
                                            <div className="site-info">
                                                <div className="avatar mr-2">
                                                    <div className="avatar-img">
                                                        <img src={person2} alt="" />
                                                    </div>
                                                    <span>Diego Simmons</span>
                                                </div>
                                                <span className="mai-time"></span> 2 months ago
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 text-center mt-4 wow zoomIn">
                                    <a href="blog.html" className="btn btn-primary">Read More</a>
                                </div> */}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="page-section pb-0">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 py-3 wow fadeInUp">
                                <h1>Welcome to Your Health <br /> Center</h1>
                                <p className="text-grey mb-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Accusantium aperiam earum ipsa eius, inventore nemo labore eaque porro consequatur ex aspernatur. Explicabo, excepturi accusantium! Placeat voluptates esse ut optio facilis!</p>
                                <a href="about.html" className="btn btn-primary">Learn More</a>
                            </div>
                            <div className="col-lg-6 wow fadeInRight" data-wow-delay="400ms">
                                <div className="img-place custom-img-1">
                                    <img src={bgDoctor} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-section bg-light">
                    <div className="container">
                        <h1 className="text-center mb-5 wow fadeInUp">Our Doctors</h1>

                        <div className="owl-carousel wow fadeInUp row mt-5" id="doctorSlideshow">
                            <div className="item col-lg-4">
                                <div className="card-doctor">
                                    <div className="header">
                                        <img src={doctor1} alt="" />
                                        <div className="meta">
                                            <a href="#"><span className="mai-call"></span></a>
                                            <a href="#"><span className="mai-logo-whatsapp"></span></a>
                                        </div>
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
                                        <div className="meta">
                                            <a href="#"><span className="mai-call"></span></a>
                                            <a href="#"><span className="mai-logo-whatsapp"></span></a>
                                        </div>
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
                                        <div className="meta">
                                            <a href="#"><span className="mai-call"></span></a>
                                            <a href="#"><span className="mai-logo-whatsapp"></span></a>
                                        </div>
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

                <div className="page-section">
                    <div className="container">
                        <h1 className="text-center wow fadeInUp">Latest News</h1>
                        <div className="row mt-5">
                            <div className="col-lg-4 py-2 wow zoomIn">
                                <div className="card-blog">
                                    <div className="header">
                                        <div className="post-category">
                                            <a href="#">Covid19</a>
                                        </div>
                                        <a href="blog-details.html" className="post-thumb">
                                            <img src={blog1} alt="" />
                                        </a>
                                    </div>
                                    <div className="body">
                                        <h5 className="post-title"><a href="blog-details.html">List of Countries without Coronavirus case</a></h5>
                                        <div className="site-info">
                                            <div className="avatar mr-2">
                                                <div className="avatar-img">
                                                    <img src={person1} alt="" />
                                                </div>
                                                <span>Roger Adams</span>
                                            </div>
                                            <span className="mai-time"></span> 1 week ago
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 py-2 wow zoomIn">
                                <div className="card-blog">
                                    <div className="header">
                                        <div className="post-category">
                                            <a href="#">Covid19</a>
                                        </div>
                                        <a href="blog-details.html" className="post-thumb">
                                            <img src={blog2} alt="" />
                                        </a>
                                    </div>
                                    <div className="body">
                                        <h5 className="post-title"><a href="blog-details.html">Recovery Room: News beyond the pandemic</a></h5>
                                        <div className="site-info">
                                            <div className="avatar mr-2">
                                                <div className="avatar-img">
                                                    <img src={person1} alt="" />
                                                </div>
                                                <span>Roger Adams</span>
                                            </div>
                                            <span className="mai-time"></span> 4 weeks ago
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 py-2 wow zoomIn">
                                <div className="card-blog">
                                    <div className="header">
                                        <div className="post-category">
                                            <a href="#">Covid19</a>
                                        </div>
                                        <a href="blog-details.html" className="post-thumb">
                                            <img src={blog3} alt="" />
                                        </a>
                                    </div>
                                    <div className="body">
                                        <h5 className="post-title">
                                            <a href="blog-details.html">What is the impact of eating too much sugar?
                                            </a>
                                        </h5>
                                        <div className="site-info">
                                            <div className="avatar mr-2">
                                                <div className="avatar-img">
                                                    <img src={person2} alt="" />
                                                </div>
                                                <span>Diego Simmons</span>
                                            </div>
                                            <span className="mai-time"></span> 2 months ago
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 text-center mt-4 wow zoomIn">
                                <a href="blog.html" className="btn btn-primary">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-section banner-home bg-image" style={{ backgroundImage: "url(../assets/img/banner-pattern.svg)" }}>
                    <div className="container py-5 py-lg-0">
                        <div className="row align-items-center">
                            <div className="col-lg-4 wow zoomIn">
                                <div className="img-banner d-none d-lg-block">
                                    <img src={mobilaApp} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-8 wow fadeInRight">
                                <h1 className="font-weight-normal mb-3">Get easy access of all features using One Health Application</h1>
                                <a href="#"><img src={googlePlay} alt="" /></a>
                                <a href="#" className="ml-2"><img src={appStore} alt="" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </Landing>
        </>
    )
}
export default Home;