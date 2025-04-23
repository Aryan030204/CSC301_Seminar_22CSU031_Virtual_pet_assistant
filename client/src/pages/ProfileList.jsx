import { useEffect, useState } from "react";
import axios from "axios";
import dogImg from "../assets/dog.jpg";
import catImg from "../assets/cat.jpg";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Pencil } from "lucide-react";
import { SERVER_PRODUCTION_ORIGIN } from "../utils/constants";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const getDogProfiles = async () => {
    const res = await axios.get(SERVER_PRODUCTION_ORIGIN+"/api/pet/profiles/all", {
      withCredentials: true,
    });
    setProfiles(res.data.profiles);
  };
  const handleDelete = async (id) => {
    await axios.delete(SERVER_PRODUCTION_ORIGIN+`/api/pet/${id}/delete`, {
      withCredentials: true,
    });
    toast.success("profile deleted successfully");
    getDogProfiles();
  };

  useEffect(() => {
    getDogProfiles();
  }, []);


  if (profiles.length == 0) {
    return (
      <>
        <h1 className="place-self-center">
          No profiles created yet...{" "}
          <Link to={"/pet/profile/create"} className="text-blue-500 hover:underline">Create one here</Link>
        </h1>
      </>
    );
  }
  return (
    <div className="flex flex-col items-center gap-4">
      {profiles.map((i, index) => {
        return (
          <>
            <div
              className="flex gap-2 justify-between items-center border-2 rounded-xl w-1/2 p-6 bg-blue-200"
              key={index}
            >
              <div className="flex items-center gap-4">
                {i.type == "dog" ? (
                  <img
                    src={dogImg}
                    className="w-20 border-2 border-black rounded-full"
                    alt=""
                  />
                ) : (
                  <img
                    src={catImg}
                    className="w-20 border-2 border-black rounded-full"
                    alt=""
                  />
                )}

                <div className="flex flex-col">
                  <h1 className="text-lg font-bold">{i.name}</h1>
                  <h2>{i.age} years</h2>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 bg-green-500 p-2 rounded-xl font-semibold ">
                  Edit <Pencil width={20} />
                </button>
                <button
                  className="flex items-center gap-2 bg-red-500 p-2 rounded-xl font-semibold"
                  onClick={() => handleDelete(i._id)}
                >
                  Delete
                </button>
              </div>
              <ToastContainer />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ProfileList;
