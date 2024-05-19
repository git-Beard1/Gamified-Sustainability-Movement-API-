/*
    Name: Thiha Swan Htet

    File Name: inventoryRoutes.js

    Last Modified: 26/12/2023
*/

// Advanced Feature Section B: Inventory

const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryController");
const userController = require("../controllers/userController");
const shopController = require("../controllers/shopController");

// Endpoint: GET /inventory/:user_id/:category
router.get(
  "/:user_id/:category",
  userController.checkUserValidationParams,
  inventoryController.selectCategorisedItemByUser
);

// Endpoint: GET /inventory/:user_id
router.get(
  "/:user_id",
  userController.checkUserValidationParams,
  inventoryController.selectInventoryByUser
);

// Endpoint: POST /inventory/
router.post(
  "/",
  userController.checkUserValidationBody,
  shopController.checkItemValidationBody,
  inventoryController.getRequiredPoints,
  inventoryController.getTotalPointsOfUser,
  inventoryController.getPointsLeft,
  inventoryController.purchaseItem
);

// Endpoint: DELETE /inventory/:inventory_id
router.delete(
  "/:inventory_id",
  inventoryController.checkInventoryValidationParams,
  inventoryController.deleteItemByInvId
);

module.exports = router;
