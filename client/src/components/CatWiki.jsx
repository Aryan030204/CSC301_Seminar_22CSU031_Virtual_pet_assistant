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
    <>
      <h1 className="p-2 text-purple-600 shadow-purple-300 shadow-lg z-10 self-center text-7xl font-bold">
        CAT INFO FINDER
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
              label="Cat breed"
              variant="outlined"
              className="w-[20rem] bg-white rounded-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-purple-500 p-2 rounded-lg text-white font-bold hover:bg-purple-600"
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
              {!loading && data.image && (
                <div className="z-10">
                  <img
                    src={data.image}
                    className="w-[25rem] rounded-xl shadow-xl"
                    alt="Cat"
                  />
                </div>
              )}
              {!loading && Object.keys(data).length > 0 && (
                <div className="flex flex-col mt-3 z-10 bg-purple-200 w-full rounded-lg p-2">
                  <div className="flex w-full justify-center items-center gap-4">
                    <h1 className="font-bold">Origin:</h1>
                    <p className="text-red-500 font-semibold">
                      {data.origin || "N/A"}
                    </p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-4">
                    <h1 className="font-bold">Life Span:</h1>
                    <p className="text-red-500 font-semibold">
                      {data.life_span || "N/A"} years
                    </p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-4">
                    <h1 className="font-bold">Temperament:</h1>
                    <p className="text-red-500 font-semibold">
                      {data.temperament || "N/A"}
                    </p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-4">
                    <h1 className="font-bold">Intelligence:</h1>
                    <p className="text-red-500 font-semibold">
                      {data.intelligence || "N/A"} / 5
                    </p>
                  </div>
                  <div className="flex w-full justify-center items-center gap-4">
                    <h1 className="font-bold">Affection Level:</h1>
                    <p className="text-red-500 font-semibold">
                      {data.affection_level || "N/A"} / 5
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex w-[20rem] max-h-[40rem] h-fit relative bg-purple-400 p-5 rounded-xl ml-[2rem] shadow-2xl shadow-purple-200">
              {about && <p className="text-lg font-bold">{about}</p>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CatWiki;
