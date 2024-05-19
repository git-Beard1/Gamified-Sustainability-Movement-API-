/*
    Name: Thiha Swan Htet

    File Name: mainRoutes.js

    Last Modified: 26/12/2023
*/

const express = require("express");
const router = express.Router();

// Section A:

// User
const userRoutes = require("./userRoutes");
router.use("/users", userRoutes);

// Task
const taskRoutes = require("./taskRoutes");
router.use("/tasks", taskRoutes);

// TaskProgress
const taskProgressRoutes = require("./taskProgressRoutes");
router.use("/task_progress", taskProgressRoutes);

// Advanced Feature Section B:

// Shop
const shopRoutes = require("./shopRoutes");
router.use("/shop", shopRoutes);

// Inventory
const inventoryRoutes = require("./inventoryRoutes");
router.use("/inventory", inventoryRoutes);

// Pets
const petsRoutes = require("./petsRoutes");
router.use("/pets", petsRoutes);

// PetActivities
const petActivitiesRoutes = require("./petActivitiesRoutes");
router.use("/pet_activities", petActivitiesRoutes);

// PetBonds
const petBondsRoutes = require("./petBondsRoutes");
router.use("/pet_bonds", petBondsRoutes);

// Skills
const skillsRoutes = require("./skillsRoutes");
router.use("/skills", skillsRoutes);

// SkillsMastered
const skillsMasteredRoutes = require("./skillsMasteredRoutes");
router.use("/skills_mastered", skillsMasteredRoutes);

module.exports = router;
