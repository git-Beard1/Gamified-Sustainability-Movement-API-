/*
    Name: Thiha Swan Htet

    File Name: shopRoutes.js

    Last Modified: 26/12/2023
*/

// Advanced Feature Section B: Shop

const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController");

// Endpoint: GET /shop/items/:category
router.get("/items/:category", shopController.selectCategorisedItem);

// Endpoint: GET /shop/items
router.get("/items", shopController.getAllItems);

module.exports = router;
