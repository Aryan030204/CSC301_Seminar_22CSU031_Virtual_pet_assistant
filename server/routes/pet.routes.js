const {
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/pet.controller");
const authVerification = require("../middleware/auth.middleware");

const petRouter = require("express").Router();

petRouter.post("/pet/profile/create", authVerification, createProfile);
petRouter.put("/pet/:id/update", authVerification, updateProfile);
petRouter.delete("/pet/:id/delete", authVerification, deleteProfile);

module.exports = petRouter;