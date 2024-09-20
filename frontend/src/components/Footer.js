import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto px-4 text-center md:text-left">
        <p className="text-lg font-semibold text-gray-100 mb-4">
          Created by <span className="text-yellow-400">रV Bhashkar</span>
        </p>

        <ul className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-3 md:space-y-0 text-sm">
          <li className="md:mb-0">&copy; 2024 All Rights Reserved</li>
          <li>
            <a
              href="/privacy-policy"
              className="hover:text-gray-100 transition duration-300 ease-in-out"
            >
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
