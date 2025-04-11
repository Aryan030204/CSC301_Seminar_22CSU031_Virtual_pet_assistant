import { useEffect, useState } from "react";
import dogImg from "../assets/dog.jpg";
import catImg from "../assets/cat.jpg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const PetProfiles = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [type, setType] = useState("dog");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");

  const dogBreeds = [
    "Labrador Retriever",
    "German Shepherd",
    "Golden Retriever",
    "Poodle",
    "Bulldog",
    "Beagle",
  ];

  const catBreeds = [
    "Persian",
    "Maine Coon",
    "Siamese",
    "Bengal",
    "Ragdoll",
    "Sphynx",
  ];

  const handleCreate = async () => {
    await axios.post(
      "http://localhost:3000/api/pet/profile/create",
      {
        name,
        age,
        type,
        breed,
        weight,
        color,
      },
      {
        withCredentials: true,
      }
    );
    toast.success("dog profile created successfully !");
  };

  const colors = ["black", "white", "brown", "red", "yellow", "other"];

  const [breedOptions, setBreedOptions] = useState(dogBreeds);

  useEffect(() => {
    setBreedOptions(type === "dog" ? dogBreeds : catBreeds);
    setBreed(""); // Reset breed when type changes
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, age, type, breed, weight, color };
    console.log("Submitted Data:", data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-4 md:mt-10 mt-6 w-[90%]"
      >
        <h2 className="text-2xl font-bold text-center">
          Create new Pet Profile
        </h2>
        {type == "dog" ? (
          <img
            src={dogImg}
            className="rounded-full border-2 w-32 place-self-center"
          />
        ) : (
          <img
            src={catImg}
            className="rounded-full border-2 w-32 place-self-center"
          />
        )}
        <ToastContainer />

        <div className="flex flex-col">
          <label className="mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-xl p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border rounded-xl p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded-xl p-2"
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Breed</label>
          <select
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="border rounded-xl p-2"
            required
          >
            <option value="" disabled>
              Select breed
            </option>
            {breedOptions.map((b, index) => (
              <option key={index} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border rounded-xl p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Color</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border rounded-xl p-2"
            required
          >
            <option value="" disabled>
              Select color
            </option>
            {colors.map((col, index) => (
              <option key={index} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          onClick={() => handleCreate()}
        >
          Create
        </button>
      </form>
      <button className="bg-red-500 w-fit rounded-lg place-self-center m-4 p-2 font-bold text-white">
        <Link to={"/profiles/list"}>Show All Profiles</Link>
      </button>
    </>
  );
};

export default PetProfiles;
