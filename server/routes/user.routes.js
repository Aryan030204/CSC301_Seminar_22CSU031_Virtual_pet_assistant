const { login, signup } = require("../controllers/auth.controller");
const { getProfile } = require("../controllers/user.controller");

const userRouter = require("express").Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.get("/profile", getProfile);
module.exports = userRouter;