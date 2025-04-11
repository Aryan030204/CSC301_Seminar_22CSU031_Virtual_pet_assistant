const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
  },
  { timestamps: true }
);

UserSchema.methods.getJwt = async function () {
  const user = this;
  const token = jwt.sign({ _id: this._id }, "JWT_SECRET_KEY", {
    expiresIn: "1h",
  });
  return token;
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
