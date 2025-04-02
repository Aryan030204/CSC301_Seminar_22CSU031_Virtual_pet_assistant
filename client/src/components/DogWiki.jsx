import axios from "axios";
import { DOG_API_KEY } from "../utils/constants";
import { useState } from "react";
import { TextField } from "@mui/material";

const DogWiki = () => {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setData({}); 

    try {
      const res = await axios.get(
        `https://api.api-ninjas.com/v1/dogs?name=${query}`,
        {
          headers: {
            "X-Api-Key": DOG_API_KEY,
          },
        }
      );
      setData(res.data[0] || {});
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-fit justify-center items-center p-6 py-[3rem] h-fit bg-gray-300 self-center my-[10rem] rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5"
      >
        <div className="flex items-center gap-5">
          <TextField
            id="outlined-basic"
            label="Dog breed"
            variant="outlined"
            className="w-[20rem]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 p-2 rounded-lg text-white font-bold hover:bg-green-600"
          >
            Search
          </button>
        </div>
        {loading && <p className="text-blue-500 font-bold">Loading...</p>}
        {!loading && data.image_link && (
          <div>
            <img
              src={data.image_link}
              className="w-[25rem] rounded-xl shadow-xl"
              alt="Dog"
            />
          </div>
        )}
        {!loading && Object.keys(data).length > 0 && (
          <div className="flex flex-col mt-3">
            <div className="flex w-full justify-center items-center gap-4">
              <h1 className="font-bold">Max height female:</h1>
              <p className="text-red-500 font-semibold">
                {data.max_height_female || "N/A"} ft
              </p>
            </div>
            <div className="flex w-full justify-center items-center gap-4">
              <h1 className="font-bold">Max height male:</h1>
              <p className="text-red-500 font-semibold">
                {data.max_height_male || "N/A"} ft
              </p>
            </div>
            <div className="flex w-full justify-center items-center gap-4">
              <h1 className="font-bold">Max life:</h1>
              <p className="text-red-500 font-semibold">
                {data.max_life_expectancy || "N/A"} yrs
              </p>
            </div>
            <div className="flex w-full justify-center items-center gap-4">
              <h1 className="font-bold">Average weight:</h1>
              <p className="text-red-500 font-semibold">
                {data.max_weight_female &&
                data.max_weight_male &&
                data.min_weight_female &&
                data.min_weight_male
                  ? (data.max_weight_female +
                      data.max_weight_male +
                      data.min_weight_female +
                      data.min_weight_male) /
                      4 +
                    " kg"
                  : "N/A"}
              </p>
            </div>
            <div className="flex w-full justify-center items-center gap-4">
              <h1 className="font-bold">Playfulness:</h1>
              <p className="text-red-500 font-semibold">
                {data.playfulness || "N/A"} points
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default DogWiki;
