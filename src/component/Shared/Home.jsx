import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaUsers, FaCalendarAlt, FaMoneyBillWave, FaChartLine, FaStar } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'T:/Employee/ems/src/component/Shared/Auth/Home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize any animations here if needed
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Simplify Your Workforce Management</h1>
          <p className="subheading">Track, Manage, and Empower Your Team with Ease</p>
          <button 
            className="cta-button"
            onClick={() => navigate('/employees')}
          >
            Get Started <IoIosArrowForward className="arrow-icon" />
          </button>
        </div>
        <div className="hero-illustration">
          <div className="dashboard-animation"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="features-container">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="features-swiper"
          >
            <SwiperSlide>
              <div className="feature-card">
                <div className="feature-icon">
                  <FaUsers />
                </div>
                <h3>Employee Directory</h3>
                <p>Centralized database of all employee information with advanced search capabilities.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="feature-card">
                <div className="feature-icon">
                  <FaCalendarAlt />
                </div>
                <h3>Attendance Tracking</h3>
                <p>Real-time tracking with automated reports and leave management.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="feature-card">
                <div className="feature-icon">
                  <FaMoneyBillWave />
                </div>
                <h3>Payroll Management</h3>
                <p>Automated salary processing with tax calculations and direct deposit.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="feature-card">
                <div className="feature-icon">
                  <FaChartLine />
                </div>
                <h3>Performance Reviews</h3>
                <p>360-degree feedback system with customizable evaluation templates.</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-graphic">
          <div className="productivity-animation"></div>
        </div>
        <div className="about-content">
          <h2>Why Choose Our System</h2>
          <p className="about-text">
            Our Employee Management System is designed to streamline your HR processes, 
            saving you time and reducing administrative overhead.
          </p>
          <div className="benefits">
            <div className="benefit-item">
              <div className="benefit-bullet"></div>
              <p>Increase productivity by automating routine tasks</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-bullet"></div>
              <p>Reduce errors with centralized employee data</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-bullet"></div>
              <p>Make data-driven decisions with real-time analytics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-container">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay, Pagination]}
            className="testimonials-swiper"
          >
            <SwiperSlide>
              <div className="testimonial-card">
                <div className="user-avatar">
                  <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sarah Johnson" />
                </div>
                <div className="stars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="testimonial-text">
                  "This system transformed how we manage our 200+ employees. The attendance tracking alone saved us 15 hours per week."
                </p>
                <p className="user-name">Sarah Johnson, HR Director</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-card">
                <div className="user-avatar">
                  <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Michael Chen" />
                </div>
                <div className="stars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="testimonial-text">
                  "The payroll integration is flawless. We've eliminated all manual calculations and reduced errors to zero."
                </p>
                <p className="user-name">Michael Chen, CFO</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-card">
                <div className="user-avatar">
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Lisa Rodriguez" />
                </div>
                <div className="stars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="testimonial-text">
                  "Implementation was smooth and the support team was responsive. Our employees love the self-service portal."
                </p>
                <p className="user-name">Lisa Rodriguez, Operations Manager</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">EMS</div>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/features">Features</a>
            <a href="/pricing">Pricing</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="social-icons">
            <a href="#"><FiTwitter /></a>
            <a href="#"><FiLinkedin /></a>
            <a href="#"><FiGithub /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Employee Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;