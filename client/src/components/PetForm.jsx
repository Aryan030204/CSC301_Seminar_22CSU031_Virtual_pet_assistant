/* eslint-disable react/prop-types */
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../utils/constants";

const PetForm = ({ setCure }) => {
  const [formData, setFormData] = useState({
    type: "",
    weight: "",
    breed: "",
    healthIssues: "",
    healthCharacteristics: "",
    symptoms: "",
  });

  const dogBreeds = [
    "Labrador Retriever", "German Shepherd", "Golden Retriever", "Bulldog", 
    "Poodle", "Beagle", "French Bulldog", "Rottweiler", "Dachshund", "Boxer"
  ];

  const catBreeds = [
    "Persian", "Maine Coon", "Siamese", "Ragdoll", "Bengal", "Sphynx", 
    "British Shorthair", "Abyssinian", "Birman", "Scottish Fold"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const GenerateCure = async () => {
    const model = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    let responseText = "";

    const prompt = (() => {
      switch (formData.healthCharacteristics) {
        case "Healthy":
          return `My ${formData.type} is a ${formData.breed} weighing ${formData.weight} kg and ${formData.healthCharacteristics}, but facing ${formData.healthIssues}. The symptoms observed are ${formData.symptoms}. Give me home or veterinarian cure in 5 short keypoints (up to 40-50 words).`;

        case "Sick":
          return `My ${formData.type} is a ${formData.breed} weighing ${formData.weight} kg and feeling ${formData.healthCharacteristics} while facing ${formData.healthIssues}. The symptoms observed are ${formData.symptoms}. Give me home or veterinarian cure in 5 short keypoints (up to 40-50 words).`;

        case "Recovering":
          return `My ${formData.type} is a ${formData.breed} weighing ${formData.weight} kg and is currently ${formData.healthCharacteristics} from ${formData.healthIssues}. Give me home or veterinarian tips in 5 short keypoints (up to 40-50 words) to make the recovery process faster.`;

        case "Lethargic":
          return `My ${formData.type} is a ${formData.breed} weighing ${formData.weight} kg and is feeling ${formData.healthCharacteristics}. They are facing ${formData.healthIssues}. The symptoms observed are ${formData.symptoms}. Give me home or veterinarian cure in 5 short keypoints (up to 40-50 words).`;

        case "Anxious":
          return `My ${formData.type} is a ${formData.breed} weighing ${formData.weight} kg and is feeling ${formData.healthCharacteristics}. They are facing ${formData.healthIssues}. The symptoms observed are ${formData.symptoms}. Give me home or veterinarian cure in 5 short keypoints (up to 40-50 words).`;

        case "Aggressive":
          return `My ${formData.type} is a ${formData.breed} weighing ${formData.weight} kg and is feeling ${formData.healthCharacteristics}. They are facing ${formData.healthIssues}. The symptoms observed are ${formData.symptoms}. Give me home or veterinarian cure in 5 short keypoints (up to 40-50 words).`;

        case "Irritable":
          return `My ${formData.type} is a ${formData.breed} weighing ${formData.weight} kg and is feeling ${formData.healthCharacteristics}. They are facing ${formData.healthIssues}. The symptoms observed are ${formData.symptoms}. Give me home or veterinarian cure in 5 short keypoints (up to 40-50 words).`;

        case "Depressed":
          return `My ${formData.type} is a ${formData.breed} weighing ${formData.weight} kg and is feeling ${formData.healthCharacteristics}. They are facing ${formData.healthIssues}. The symptoms observed are ${formData.symptoms}. Give me home or veterinarian cure in 5 short keypoints (up to 40-50 words).`;

        default:
          return "";
      }
    })();

    if (prompt) {
      const res = await model.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      responseText = res.text;

      setCure(responseText);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await GenerateCure();
    } catch (error) {
      console.error("Error fetching recommendations", error);
    }
  };

  // Select breeds based on pet type
  const breedOptions = formData.type === "Dog" ? dogBreeds : formData.type === "Cat" ? catBreeds : [];

  return (
    <div className="max-w-md mx-auto p-[3rem] bg-blue-100 shadow-2xl shadow-t rounded-lg relative z-0">
      <h2 className="text-xl font-bold mb-4">Pet Health Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="weight"
          placeholder="Pet Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg shadow-lg"
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg shadow-lg"
          required
        >
          <option value="">Select type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>

        <select
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg shadow-lg"
          required
        >
          <option value="">Select breed</option>
          {breedOptions.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>

        <select
          name="healthIssues"
          value={formData.healthIssues}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg shadow-lg"
          required
        >
          <option value="">Select Health Issue</option>
          <option value="Digestive Issues">Digestive Issues</option>
          <option value="Skin Problems">Skin Problems</option>
          <option value="Fleas Infestation">Fleas Infestation</option>
          <option value="Ear Infections">Ear Infections</option>
          <option value="Heartworms Disease">Heartworms Disease</option>
          <option value="Arthritis Pain">Arthritis Pain</option>
          <option value="Kidney Failure">Kidney Failure</option>
        </select>

        <select
          name="healthCharacteristics"
          value={formData.healthCharacteristics}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg shadow-lg"
          required
        >
          <option value="">Select Characteristics</option>
          <option value="Healthy">Healthy</option>
          <option value="Sick">Sick</option>
          <option value="Recovering">Recovering</option>
          <option value="Lethargic">Lethargic</option>
          <option value="Anxious">Anxious</option>
          <option value="Aggressive">Aggressive</option>
          <option value="Irritable">Irritable</option>
          <option value="Depressed">Depressed</option>
        </select>

        <textarea
          name="symptoms"
          placeholder="Describe Symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg shadow-lg"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg shadow-lg"
        >
          Give Me Cure
        </button>
      </form>
    </div>
  );
};

export default PetForm;
