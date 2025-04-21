import axios from "axios";
import { GEMINI_API_KEY, DOG_API_KEY } from "../utils/constants";
import { useState } from "react";
import { TextField } from "@mui/material";
import wall1 from "../assets/wall1.jpg";
import { GoogleGenAI } from "@google/genai";

const CatWiki = () => {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState("");
  const model = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const genAbout = async () => {
    const res = await model.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `give me a short 60-70 words info paragraph about ${query} cat breed`,
    });
    setAbout(res.text);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (about) setAbout("");
    if (!query.trim()) return;

    setLoading(true);
    setData({});

    try {
      const res = await axios.get(
        `https://api.thecatapi.com/v1/breeds/search?q=${query}`,
        {
          headers: {
            "x-api-key": DOG_API_KEY,
          },
        }
      );

      const breed = res.data[0];
      if (breed) {
        const imageRes = await axios.get(
          `https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`,
          {
            headers: {
              "x-api-key": DOG_API_KEY,
            },
          }
        );
        setData({ ...breed, image: imageRes.data[0]?.url });
        await genAbout();
      } else {
        setData({});
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background Image */}
      <img
        src={wall1}
        alt="wallpaper"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center pt-10 px-4 pb-20">
        <h1 className="text-purple-600 text-center text-5xl md:text-7xl font-bold shadow-lg shadow-purple-300 mb-10">
          CAT INFO FINDER
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 bg-gray-300 p-8 rounded-xl shadow-xl w-full max-w-4xl"
        >
          {/* Input */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <TextField
              label="Cat breed"
              variant="outlined"
              className="bg-white w-[20rem]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-purple-500 p-3 rounded-lg text-white font-bold hover:bg-purple-600"
            >
              Search
            </button>
          </div>

          {/* Result */}
          <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
            <div className="flex flex-col items-center gap-5">
              {loading && (
                <p className="text-blue-500 font-bold bg-white px-4 py-2 rounded">
                  Loading...
                </p>
              )}
              {!loading && data.image && (
                <img
                  src={data.image}
                  className="w-[25rem] rounded-xl shadow-xl"
                  alt="Cat"
                />
              )}
              {!loading && Object.keys(data).length > 0 && (
                <div className="bg-purple-200 p-4 rounded-lg w-full max-w-md space-y-2">
                  <p>
                    <span className="font-bold">Origin:</span>{" "}
                    <span className="text-red-500 font-semibold">
                      {data.origin || "N/A"}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">Life Span:</span>{" "}
                    <span className="text-red-500 font-semibold">
                      {data.life_span || "N/A"} years
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">Temperament:</span>{" "}
                    <span className="text-red-500 font-semibold">
                      {data.temperament || "N/A"}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">Intelligence:</span>{" "}
                    <span className="text-red-500 font-semibold">
                      {data.intelligence || "N/A"} / 5
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">Affection Level:</span>{" "}
                    <span className="text-red-500 font-semibold">
                      {data.affection_level || "N/A"} / 5
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* About Box */}
            {about && (
              <div className="bg-purple-400 p-5 rounded-xl shadow-2xl w-[20rem] max-h-[30rem] overflow-auto">
                <p className="text-lg font-bold text-white">{about}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CatWiki;
