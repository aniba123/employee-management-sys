import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUsers, FaCalendarAlt, FaChartBar, FaUser } from 'react-icons/fa';
import './navbar.css';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">EMS</Link>
        </div>
        
        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/dashboard" className="nav-link">
            <FaHome className="nav-icon" />
            <span>Dashboard</span>
          </Link>
          <Link to="/employees" className="nav-link">
            <FaUsers className="nav-icon" />
            <span>Employees</span>
          </Link>
          <Link to="/attendance" className="nav-link">
            <FaCalendarAlt className="nav-icon" />
            <span>Attendance</span>
          </Link>
          <Link to="/reports" className="nav-link">
            <FaChartBar className="nav-icon" />
            <span>Reports</span>
          </Link>
          <Link to="/profile" className="nav-link">
            <FaUser className="nav-icon" />
            <span>Profile</span>
          </Link>
        </nav>

        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;