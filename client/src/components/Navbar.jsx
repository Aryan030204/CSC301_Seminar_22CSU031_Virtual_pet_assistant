import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import DogProfileBtn from "./DogProfileBtn";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 p-4 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to={"/"}>
          <img src={logo} className="w-[7rem] shadow-white" alt="" />
        </Link>

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
        <div className="hidden lg:flex space-x-4 items-center">
          <Link to={"/"} className="text-lg text-white font-semibold">
            Home
          </Link>
          <Link to={"/dogwiki"} className="text-lg text-white font-semibold">
            Dog-Wiki
          </Link>
          <Link to={"/catwiki"} className="text-lg text-white font-semibold">
            Cat-Wiki
          </Link>
          <Link to={"/hire-a-vet"} className="text-lg text-white font-semibold">
          Veterinarian near me
          </Link>
          <Link
            to={"/frequently-asked-questions"}
            className="text-lg text-white font-semibold"
          >
            FAQs
          </Link>
          <Link to={"/about-us"} className="text-lg text-white font-semibold">
            About us
          </Link>
          {user ? (
            <Profile />
          ) : (
            <Link to={"/login"} className="text-lg text-white font-semibold">
              Login
            </Link>
          )}
          {user && <DogProfileBtn />}
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
            <Link to={"/hire-a-vet"} className="text-lg font-semibold">
              Hire a veterinarian
            </Link>
            {user ? (
              <Profile />
            ) : (
              <Link to={"/login"} className="text-lg text-black font-semibold">
                Login
              </Link>
            )}
            {user && <DogProfileBtn />}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
