/*
    Name: Thiha Swan Htet

    File Name: userRoutes.js

    Last Modified: 26/12/2023
*/

// Section A: User

const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// Endpoint 3: GET /users/{user_id}
router.get(
  "/:user_id",
  userController.checkUserValidationParams,
  userController.selectTotalPointsByUser,
  userController.getPointsLeftAfterPurchase,
  userController.selectUserById
);

// Endpoint 2: GET /users
router.get("/", userController.readAllUsers);

// Endpoint 1: POST /users
router.post(
  "/",
  userController.checkEmailAssociation,
  userController.createNewUser
);

// Endpoint 4: PUT /users/{user_id}
router.put(
  "/:user_id",
  userController.checkUserValidationParams,
  userController.checkUserNameEmailAssociation,
  userController.updateUserById
);

// Endpoint 5: DELETE /users/{user_id}
router.delete(
  "/:user_id",
  userController.checkUserValidationParams,
  userController.deleteUserById
);

module.exports = router;
