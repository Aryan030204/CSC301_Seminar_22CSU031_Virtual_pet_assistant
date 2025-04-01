import { useState } from "react";
import axios from "axios";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch health recommendations from The Dog API
      const response = await axios.get("https://api.thedogapi.com/v1/breeds");
      console.log(response);
      

      // Find a breed based on weight
      const breed = response.data.find(
        (b) => formData.weight >= b.weight.metric.split(" - ")[0]
      );

      let healthAdvice = "No specific advice found.";
      if (breed) {
        healthAdvice = `This breed may face issues like ${breed.temperament}. Ensure proper nutrition and vet visits.`;
      }

      setRecommendation(healthAdvice);
    } catch (error) {
      console.error("Error fetching recommendations", error);
      setRecommendation("Could not fetch recommendations. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Pet Health Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pet Weight */}
        <input
          type="number"
          name="weight"
          placeholder="Pet Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Health Issues */}
        <select
          name="healthIssues"
          value={formData.healthIssues}
          onChange={handleChange}
          className="w-full p-2 border rounded"
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
          className="w-full p-2 border rounded"
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
          className="w-full p-2 border rounded"
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
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
