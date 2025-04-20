import axios from "axios";
import { DOG_API_KEY, GEMINI_API_KEY } from "../utils/constants";
import { useState } from "react";
import { TextField } from "@mui/material";
import wall1 from "../assets/wall1.jpg";
import { GoogleGenAI } from "@google/genai";

const DogWiki = () => {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState("");
  const model = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const genAbout = async () => {
    const res = await model.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `give me a short 60-70 words info paragraph about ${query} dog breed`,
    });
    setAbout(res.text);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(about) {
      setAbout("");
    }
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
      await genAbout();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="p-2 text-yellow-500 shadow-orange-300 shadow-lg z-10 self-center text-7xl font-bold">
        DOG INFO FINDER
      </h1>
      <div className="flex flex-col w-fit justify-center items-center p-6 py-[3rem] h-fit bg-gray-300 self-center my-[10rem] rounded-lg">
        <img src={wall1} className="z-1 absolute" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-evenly gap-[5rem] items-center"
        >
          <div className="flex items-center gap-5 z-10">
            <TextField
              id="outlined-basic"
              label="Dog breed"
              variant="outlined"
              className="w-[20rem] bg-white rounded-lg"
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
          <div className="flex w-full h-fit">
            <div className="flex flex-col">
              {loading && (
                <p className="text-blue-500 font-bold bg-white p-2 z-10">
                  Loading...
                </p>
              )}
              {!loading && data.image_link && (
                <div className="z-10">
                  <img
                    src={data.image_link}
                    className="w-[25rem] rounded-xl shadow-xl"
                    alt="Dog"
                  />
                </div>
              )}
              {!loading && Object.keys(data).length > 0 && (
                <div className="flex flex-col mt-3 z-10 bg-blue-200 w-full rounded-lg p-2">
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
            </div>
            <div className="flex w-[20rem] max-h-[40rem] h-fit relative bg-yellow-400 p-5 rounded-xl ml-[2rem] shadow-2xl shadow-yellow-200">
              {about && <p className="text-lg font-bold">{about}</p>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default DogWiki;
