
import { Pencil } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PetCard = ({ id, name, age, type, getProfiles }) => {
  
  return (
    <div className="flex gap-2 justify-between items-center border-2 rounded-xl w-1/2 p-6 bg-blue-200">
      <div className="flex items-center gap-4">
        {type == "dog" ? (
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
          <h1 className="text-lg font-bold">{name}</h1>
          <h2>{age} years</h2>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 bg-green-500 p-2 rounded-xl font-semibold ">
          Edit <Pencil width={20} />
        </button>
        <button
          className="flex items-center gap-2 bg-red-500 p-2 rounded-xl font-semibold"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PetCard;
