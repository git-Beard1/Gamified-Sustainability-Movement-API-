/*
    Name: Thiha Swan Htet

    File Name: petBondsRoutes.js

    Last Modified: 26/12/2023
*/

// Advanced Feature Section B: PetBonds

const express = require("express");
const router = express.Router();

const petBondsController = require("../controllers/petBondsController");
const userController = require("../controllers/userController");
const petsController = require("../controllers/petsController");
const inventoryController = require("../controllers/inventoryController");
const skillsMasteredController = require("../controllers/skillsMasteredController");
const skillsController = require("../controllers/skillsController");
const petActivitiesController = require("../controllers/petActivitiesController");

// Endpoint: GET /pet_bonds/{user_id}
// Retrieve user info and all pet attributes by user_id
router.get(
  "/:user_id",
  userController.checkUserValidationParams,
  petBondsController.selectBondByUserId
);

// Endpoint: GET /pet_bonds
router.get("/", petBondsController.readAllPetBonds);

// Endpoint: POST /pet_bonds
router.post(
  "/",
  userController.checkUserValidationBody,
  petsController.checkPetValidationBody,
  petBondsController.uniquePetOwnership,
  petBondsController.getRequiredPoints,
  inventoryController.getTotalPointsOfUser,
  petBondsController.exchangePet
);

// Endpoint: PUT /pet_bonds
router.put(
  "/",
  userController.checkUserValidationBody,
  petsController.checkPetValidationBody,
  skillsController.checkSkillValidationBody,
  petBondsController.checkUserPetOwnershipBody,
  skillsController.uniqueSkillOwnership,
  skillsMasteredController.checkAllLearntSkills,
  petBondsController.updateEquippedSkillOfPet
);

// Endpoint: DELETE /pet_bonds/{bond_id}
router.delete(
  "/:bond_id",
  petBondsController.checkBondValidationParams,
  petBondsController.selectUserPetByBondId,
  petBondsController.deleteBondsByBondId,
  skillsMasteredController.deleteSkillMasteredByUserPetId,
  petActivitiesController.deletePetActivityByUserPetId
);

module.exports = router;
