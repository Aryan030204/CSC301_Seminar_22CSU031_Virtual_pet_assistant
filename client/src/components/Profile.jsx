import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  
  // State to manage the user data
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://virtual-pet-assistant-server.onrender.com/api/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("user");
      setUser(null); // Clear the user state when logging out
      toast.success("Logout successful");
      navigate("/"); // Redirect to homepage
    } catch (err) {
      toast.error("Something went wrong while logging out");
      console.log(err);
      
    }
  };

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
  }, []);

  return (
    <div className="flex gap-4 items-center font-bold">
      <ToastContainer />
      {/* Conditionally render the Welcome message based on user state */}
      {user ? (
        <h1 className="text-orange-200 bg-blue-950 p-1 rounded-xl">
          Welcome, {user.name} :)
        </h1>
      ) : (
        <h1 className="text-gray-500">Please log in to access your profile.</h1>
      )}
      
      {user && (
        <button
          className="bg-red-500 text-white rounded-xl w-fit p-1 text-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Profile;
