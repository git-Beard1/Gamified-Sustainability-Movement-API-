/*
    Name: Thiha Swan Htet

    File Name: skillsRoutes.js

    Last Modified: 26/12/2023
*/

// Advanced Feature Section B: Skills

const express = require("express");
const router = express.Router();

const skillsController = require("../controllers/skillsController");
const petsController = require("../controllers/petsController");

// Endpoint: GET /skills/:pet_id
router.get(
  "/:pet_id",
  petsController.checkPetValidationParams,
  skillsController.selectSkillByPetId
);

// Endpoint: GET /skills
router.get("/", skillsController.getAllSkills);

module.exports = router;
