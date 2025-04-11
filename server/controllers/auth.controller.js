const User = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const signup = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const passHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: passHash,
      _id: new mongoose.Types.ObjectId(),
    });

    await newUser.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message || err,
    });
  }
};

module.exports = { login, signup };
