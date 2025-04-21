const User = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = await user.getJwt();

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true, // Ensure this works with HTTPS
    });

    // Returning the user without password
    const { password: userPassword, ...userData } = user.toObject();
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
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

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to logout", error: err.message });
  }
};

module.exports = { login, signup, logout };
