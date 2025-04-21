import PetForm from "../components/PetForm";
import wall1 from "../assets/wall1.jpg";
import { Cat, Dog } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [cure, setCure] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bg, setBg] = useState("");

  const colors = ["blue", "yellow", "green", "red", "purple", "orange"];

  const handleSetCure = (text) => {
    setIsLoading(true);
    const randomIndex = Math.floor(Math.random() * colors.length);
    const selectedColor = colors[randomIndex];
    setCure("");
    setTimeout(() => {
      setBg(selectedColor);
      setCure(text);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={wall1}
        alt="wallpaper"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-6 py-10 gap-16">
        {/* Header */}
        <div className="flex w-full justify-center items-center gap-2">
          <Cat color="red" size={40} />
          <h1 className="text-4xl font-bold text-blue-500 text-center">
            YOUR AI PET COMPANION
          </h1>
          <Dog color="green" size={40} />
        </div>

        {/* Form and Cure Section */}
        <div className="flex flex-col lg:flex-row items-center justify-evenly w-full max-w-7xl gap-10">
          <PetForm setCure={handleSetCure} />

          <div
            className={`flex flex-col w-full max-w-2xl min-h-[20rem] p-6 items-start justify-center bg-${bg}-400 shadow-2xl rounded-xl overflow-auto shadow-${bg}-400`}
          >
            {isLoading ? (
              <h1 className="text-lg font-semibold text-black">
                Finding the best cure for your pet...
              </h1>
            ) : cure ? (
              <ol className="list-decimal list-inside space-y-2 text-lg font-bold text-white">
                {cure.split("*")}
              </ol>
            ) : (
              <h1 className="text-lg font-semibold hidden text-black">
                Cure will appear here...
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
