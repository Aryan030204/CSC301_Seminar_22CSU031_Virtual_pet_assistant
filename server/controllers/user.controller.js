const Pet = require("../models/pet.model");
const User = require("../models/user.model");

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching profile",
      error: err.message,
    });
  }
};

const getAllDogProfiles = async (req, res) => {
  try {
    const { _id } = req.user;
    const profiles = await Pet.find({ userId: _id });
    res.status(200).json({
      message: "profiles fetched successfully",
      profiles,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching dog profiles",
      error: err.message,
    });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "Profile deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting profile",
      error: err.message,
    });
  }
};

module.exports = { getProfile, deleteProfile, getAllDogProfiles };
