import PetForm from "../components/PetForm";
import wall1 from "../assets/wall1.jpg";
import { Cat, Dog } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [cure, setCure] = useState("");

  return (
    <>
      <img
        src={wall1}
        alt="wallpaper"
        className="w-screen h-[50rem] absolute -z-1 object-cover"
      />
      <div className="relative z-1 flex flex-col gap-16 p-10 items-center w-screen h-full">
        <div className="flex w-full h-fit justify-center items-center gap-2">
          <Cat
            color="red"
            size={40}
          />
          <h1 className="text-4xl font-bold text-blue-500">YOUR AI PET COMPANION</h1>
          <Dog
            color="green"
            size={40}
          />
        </div>
        <div className="flex justify-evenly gap-[4rem] items-center">
          {/* Pass setCure to PetForm */}
          <PetForm setCure={setCure} />

          <div className="flex flex-col w-[40rem] min-h-[20rem] p-10 justify-center relative z-2 bg-white shadow-2xl rounded-xl overflow-auto text-center items-center">
            {cure ? (
              <ol className="list-decimal list-inside space-y-2 text-lg font-medium text-gray-700">
                {cure.split("*")}
              </ol>
            ) : (
              <h1 className="text-3xl font-semibold text-gray-500">Fill the form</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
