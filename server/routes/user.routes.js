const { login, signup, logout } = require("../controllers/auth.controller");
const { getProfile, deleteProfile } = require("../controllers/user.controller");
const authVerification = require("../middleware/auth.middleware");

const userRouter = require("express").Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/logout", authVerification, logout);
userRouter.get("/user/:id/profile/", authVerification, getProfile);
userRouter.delete("/user/:id/profile/", authVerification, deleteProfile);
module.exports = userRouter;
