/* eslint-disable react/prop-types */
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../utils/constants";
import { TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Loader } from "lucide-react";

const PetForm = ({ setCure }) => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    e.preventDefault();
    try {
      await GenerateCure();
    } catch (error) {
      console.error("Error fetching recommendations", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-[3rem] bg-blue-100 shadow-2xl rounded-lg z-10">
      <h2 className="text-xl font-bold mb-4">Pet Health Form</h2>
      <div className="space-y-4">
        <TextField
          label="Pet Weight (kg)"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
          fullWidth
          required
        />

        <FormControl
          fullWidth
          required>
          <InputLabel>Health Issue</InputLabel>
          <Select
            name="healthIssues"
            value={formData.healthIssues}
            onChange={handleChange}
            label="Health Issue">
            <MenuItem value="Digestive Issues">Digestive Issues</MenuItem>
            <MenuItem value="Skin Problems">Skin Problems</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          required>
          <InputLabel>Health Characteristics</InputLabel>
          <Select
            name="healthCharacteristics"
            value={formData.healthCharacteristics}
            onChange={handleChange}
            label="Health Characteristics">
            <MenuItem value="Healthy">Healthy</MenuItem>
            <MenuItem value="Sick">Sick</MenuItem>
            <MenuItem value="Recovering">Recovering</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Describe Symptoms"
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          multiline
          rows={2}
          fullWidth
          required
        />

        <button
          type="submit"
          className={`w-full text-white p-2 rounded-lg shadow-lg transition duration-300 ease-in-out ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
          onClick={handleSubmit}>
          <span className="flex items-center justify-center gap-2">
            Give Me Cure
            {loading && <Loader className="animate-spin" />}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PetForm;
