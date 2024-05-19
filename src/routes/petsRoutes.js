/*
    Name: Thiha Swan Htet

    File Name: petsRoutes.js

    Last Modified: 26/12/2023
*/

// Advanced Feature Section B: Pets

const express = require("express");
const router = express.Router();

const petsController = require("../controllers/petsController");

// Endpoint: GET /pets/:rarity
router.get("/:rarity", petsController.selectPetsByRarity);

// Endpoint: GET /pets
router.get("/", petsController.getAllPets);

module.exports = router;
