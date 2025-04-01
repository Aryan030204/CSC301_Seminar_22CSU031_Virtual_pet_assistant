const express = require("express");
const  getPetRecommendations  = require("../controllers/pet.controller");

const petRouter = express.Router();

petRouter.post("/recommend", getPetRecommendations);

module.exports = petRouter;
