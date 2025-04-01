const mongoose = require("mongoose");
const petSchema = mongoose.Schema(
  {
    weight: Number,
    healthIssues: String,
    healthCharacteristics: String,
    symptoms: String,
    recommendations: String,
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
