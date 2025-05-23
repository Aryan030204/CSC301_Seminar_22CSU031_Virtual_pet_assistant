
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6 z-10">
      {/* Horizontal Line Separator */}
      <div className="border-t border-gray-700 mb-6"></div>

      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row justify-between items-start">
        {/* Left Section: Navigation Links */}
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="#" className="hover:text-gray-400 transition-colors">
            About
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            Features
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            Works
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            Support
          </a>
        </div>

        {/* Right Section: Contact Info */}
        <div className="text-right">
          <p className="mb-2">
            <span className="mr-2">📍</span> 346 1st Floor, Joshi Road, Delhi
          </p>
          <p className="mb-2">
            <span className="mr-2">✉️</span> support@seminar.xyz
          </p>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-right text-sm mt-6">
        <p>© Copyright 2025, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;