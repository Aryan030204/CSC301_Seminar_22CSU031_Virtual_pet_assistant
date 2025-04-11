import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = async () => {
    await axios.post(
      "http://localhost:3000/api/logout",
      {},
      {
        withCredentials: true,
      }
    );
    localStorage.removeItem("user");
    toast.success("logout successful");
    navigate("/");
  };
  return (
    <div className="flex gap-4 items-center font-bold">
      <ToastContainer />
      <h1 className="text-green-400">Welcome, {user.name} :)</h1>
      <button
        className="bg-red-500 text-white rounded-xl w-fit p-1 text-sm"
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
