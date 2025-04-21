import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import wall1 from "../assets/wall1.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/signup", {
        name,
        email,
        password,
      });
      toast.success("Signup successful!");
    } catch (err) {
      console.log(err);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={wall1}
        alt="wallpaper"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <ToastContainer />

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-4xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
