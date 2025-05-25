// import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaArrowUp } from "react-icons/fa";
import './Footer.css';
const Footer = ({ darkMode = false }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={`w-full py-8 px-4 md:px-8 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-gray-200"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="space-y-2">
              {["Home", "Dashboard", "Profile", "Settings"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`hover:text-blue-500 transition-colors duration-200 ${
                      darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p>123 Main Street, Suite 100</p>
            <p>City, State 12345</p>
            <p>Email: info@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-blue-600"
                    : "bg-gray-200 hover:bg-blue-500"
                }`}
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-blue-400"
                    : "bg-gray-200 hover:bg-blue-400"
                }`}
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-blue-700"
                    : "bg-gray-200 hover:bg-blue-700"
                }`}
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Back to Top */}
        <div className="mt-12 pt-6 border-t border-gray-400 border-opacity-30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className={`mt-4 md:mt-0 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            aria-label="Back to top"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;