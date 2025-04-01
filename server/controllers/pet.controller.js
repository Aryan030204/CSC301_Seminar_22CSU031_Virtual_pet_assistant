const axios = require("axios");
const Pet = require("../models/pet.model");

const getPetRecommendations = async (req, res) => {
  const { weight, healthIssues, healthCharacteristics, symptoms } = req.body;

  try {
    const response = await axios.get("https://petcareapi.com/recommendations", {
      params: { weight, healthIssues, healthCharacteristics, symptoms },
    });

    const pet = await Pet.create({
      weight,
      healthIssues,
      healthCharacteristics,
      symptoms,
      recommendations: response.data.recommendations,
    });

    res.status(200).json({
      message: "Pet recommendations created successfully",
      pet: pet,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching recommendations" });
  }
};

module.exports = getPetRecommendations;
