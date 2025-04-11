const Pet = require("../models/pet.model");

const createProfile = async (req, res) => {
  try {
    const {name, age, type, breed, weight, color} = req.body;
    console.log(req.user);
    
    const newPet = new Pet({
      name,
      userId: req.user._id,
      age,
      type,
      breed,
      weight,
      color,
    });
    await newPet.save();
    res.status(201).json({
      message: "Pet profile created successfully",
      data: newPet,
    });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ err: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const {name, age, type, breed, weight, color} = req.body;
    const pet = await Pet.findByIdAndUpdate(
      id,
      {
        name,
        age,
        type,
        breed,
        weight,
        color,
      },
      { new: true }
    );
    await Pet.save();
    res.status(200).json({
      message: "Pet profile updated successfully",
      data: pet,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { _id } = req.params;
    await Pet.findByIdAndDelete(_id);
    res.status(200).json({
      message: "Pet profile deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = { createProfile, updateProfile, deleteProfile };
