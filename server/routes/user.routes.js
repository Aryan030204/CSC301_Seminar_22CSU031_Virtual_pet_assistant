const { login, signup, logout } = require("../controllers/auth.controller");
const {
  getProfile,
  deleteProfile,
  getAllDogProfiles,
} = require("../controllers/user.controller");
const authVerification = require("../middleware/auth.middleware");

const userRouter = require("express").Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/logout", logout);
userRouter.get("/pet/profiles/all", authVerification, getAllDogProfiles);
userRouter.get("/user/:id/profile/", authVerification, getProfile);
userRouter.delete("/user/:id/profile/", authVerification, deleteProfile);
module.exports = userRouter;
