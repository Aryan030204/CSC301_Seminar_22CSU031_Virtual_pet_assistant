import { useState } from "react";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../utils/constants";

const PetForm = () => {
  const [formData, setFormData] = useState({
    weight: "",
    healthIssues: "",
    healthCharacteristics: "",
    symptoms: "",
  });
  const [recommendation, setRecommendation] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const GenerateCure = async () => {
    const model = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    switch (formData.healthCharacteristics) {
      case "Healthy":
        { const res1 = await model.models.generateContent({
          model: "gemini-2.0-flash",
          contents: `My pet is ${formData.weight} and ${formData.healthCharacteristics}, but facing ${formData.healthIssues}. the symtoms observed are ${formData.symptoms}. give me home or veteranian cure in 5 short keypoints(upto 40-50 words)`,
        });
        setRecommendation(res1.text);
        break; }

      case "Sick":
        { const res2 = await model.models.generateContent({
          model: "gemini-2.0-flash",
          contents: `My pet is ${formData.weight} and feeling ${formData.healthCharacteristics} and facing ${formData.healthIssues}. the symtoms observed are ${formData.symptoms}. give me home or veteranian cure in 5 short keypoints(upto 40-50 words)`,
        });
        setRecommendation(res2.text);
        break; }

      case "Recovering":
        { const res3 = await model.models.generateContent({
          model: "gemini-2.0-flash",
          contents: `My pet is ${formData.weight} and currently ${formData.healthCharacteristics} from ${formData.healthIssues}. give me home or veteranian tips in 5 short keypoints (upto 40-50 words) to make the process faster`,
        });
        setRecommendation(res3.text);
        break; }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await GenerateCure();
    } catch (error) {
      console.error("Error fetching recommendations", error);
      setRecommendation("Could not fetch recommendations. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-[3rem] bg-blue-100 shadow-2xl shadow-t rounded-lg z-10">
      <h2 className="text-xl font-bold mb-4">Pet Health Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pet Weight */}
        <input
          type="number"
          name="weight"
          placeholder="Pet Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg shadow-lg"
          required
        />

        {/* Health Issues */}
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

        {/* Health Characteristics */}
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

        {/* Symptoms */}
        <textarea
          name="symptoms"
          placeholder="Describe Symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg shadow-lg"
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg shadow-lg"
        >
          Give Me Cure
        </button>
      </form>

      {/* Display Recommendation */}
      {recommendation && (
        <div className="mt-4 p-3 bg-gray-100 border rounded">
          <strong>Recommendation:</strong> {recommendation}
        </div>
      )}
    </div>
  );
};

export default PetForm;
