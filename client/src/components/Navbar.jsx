import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-950 p-4 z-10">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <img src={logo} className="w-[6rem] shadow-white" alt="" />

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navbar Links for Larger Screens */}
        <div className="hidden lg:flex space-x-4">
          <Link to={"/"} className="text-lg text-white font-semibold">
            Home
          </Link>
          <Link to={"/dogwiki"} className="text-lg text-white font-semibold">
            DogWiki
          </Link>
          <Link to={"/catwiki"} className="text-lg text-white font-semibold">
            CatWiki
          </Link>
          <Link to={"/foodwiki"} className="text-lg text-white font-semibold">
            FoodWiki
          </Link>
          <Link to={"/login"} className="text-lg text-white font-semibold">
            Login
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10">
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="mt-7 bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center space-y-5 bg-white py-5 my-10">
            <Link to={"/dogwiki"} className="text-lg font-semibold">
              DogWiki
            </Link>
            <Link to={"/catwiki"} className="text-lg font-semibold">
              CatWiki
            </Link>
            <Link to={"/foodshop"} className="text-lg font-semibold">
              FoodShop
            </Link>
            <Link to={"/login"} className="text-lg font-semibold">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
