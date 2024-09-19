// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">MyLogo</Link>
        </div>

        {/* Nav Links for larger screens */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-200">
            About
          </Link>
          <Link to="/services" className="hover:text-gray-200">
            Services
          </Link>
          <Link to="/contact" className="hover:text-gray-200">
            Contact
          </Link>
        </nav>

        {/* Hamburger Menu for mobile screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:hidden bg-blue-500 text-white shadow-md`}
      >
        <nav className="px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            className="block py-2 hover:bg-blue-700 rounded-lg"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block py-2 hover:bg-blue-700 rounded-lg"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/services"
            className="block py-2 hover:bg-blue-700 rounded-lg"
            onClick={toggleMenu}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="block py-2 hover:bg-blue-700 rounded-lg"
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
