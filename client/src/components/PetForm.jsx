/* eslint-disable react/prop-types */
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../utils/constants";

const PetForm = ({ setCure }) => {
  const [formData, setFormData] = useState({
    weight: "",
    healthIssues: "",
    healthCharacteristics: "",
    symptoms: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const GenerateCure = async () => {
    const model = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    let responseText = "";

    const prompt = (() => {
      switch (formData.healthCharacteristics) {
        case "Healthy":
          return `My pet is ${formData.weight} kg and ${formData.healthCharacteristics}, but facing ${formData.healthIssues}. The symptoms observed are ${formData.symptoms}. Give me home or veterinarian cure in 5 short keypoints (up to 40-50 words).`;

        case "Sick":
          return `My pet is ${formData.weight} kg and feeling ${formData.healthCharacteristics} and facing ${formData.healthIssues}. The symptoms observed are ${formData.symptoms}. Give me home or veterinarian cure in 5 short keypoints (up to 40-50 words).`;

        case "Recovering":
          return `My pet is ${formData.weight} kg and currently ${formData.healthCharacteristics} from ${formData.healthIssues}. Give me home or veterinarian tips in 5 short keypoints (up to 40-50 words) to make the process faster.`;

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

      // Update cure state in Home
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

  return (
    <div className="max-w-md mx-auto p-[3rem] bg-blue-100 shadow-2xl shadow-t rounded-lg z-10">
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
          name="healthIssues"
          value={formData.healthIssues}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg shadow-lg"
          required
        >
          <option value="">Select Health Issue</option>
          <option value="Digestive Issues">Digestive Issues</option>
          <option value="Skin Problems">Skin Problems</option>
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
        </select>

        <textarea
          name="symptoms"
          placeholder="Describe Symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg shadow-lg"
          required
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
