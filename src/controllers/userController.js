/*
    Name: Thiha Swan Htet

    File Name: userController.js

    Last Modified: 30/12/2023
*/

// Section A: User

const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");

// Universal user_id Validation Controller (for params)
module.exports.checkUserValidationParams = (req, res, next) => {
  const { user_id } = req.params;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkUserValidationParams",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 404
    // Checks user_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid user_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.user_id = results[0]; // store user_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkUserValidationParams", res.locals.user_id);
      next();
    }
  };
  userModel.checkUser(data, callback);
};

// Universal user_id Validation Controller (for body)
module.exports.checkUserValidationBody = (req, res, next) => {
  const { user_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkUserValidationBody",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 400
    else if (!user_id) {
      res.status(400).json({
        message: "Missing Required Data",
      });
      return;
    }

    // Status 404
    // Checks user_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid user_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.user_id = results[0]; // store user_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkUserValidationBody", res.locals.user_id);
      next();
    }
  };
  userModel.checkUser(data, callback);
};

// Endpoint 3 GET /users/{user_id} Controller

// Read all user info by user_id from user table
module.exports.selectTotalPointsByUser = (req, res, next) => {
  const { user_id } = req.params;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectTotalPointsByUser",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
    }

    // Status 404
    else if (results.length === 0) {
      res.status(404).json({
        message: "User has not completed tasks yet",
      });
      return;
    }

    // Pass on the total points of user to the next
    else {
      results[0].total_points === null
        ? (results[0].total_points = 0)
        : (results[0].total_points = parseInt(results[0].total_points));
      res.locals.totalPointsObject = results[0]; // Pass on the total points of user to the next

      // Log out results to determine errors in-between middlewares
      console.log("selectTotalPointsByUser", res.locals.totalPointsObject);
      next();
    }
  };
  userModel.getUserTotalPoints(data, callback);
};

// Get Total Points Left After Purchase By User
module.exports.getPointsLeftAfterPurchase = (req, res, next) => {
  const { user_id } = req.params;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "getPointsLeftAfterPurchase",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
    }

    // Pass onto the next function
    else {
      results[0].total_points_purchased === null // if the user did not purchase any item, null,
        ? (results[0].total_points_purchased = 0) // change the purchased points to zero (0)
        : (results[0].total_points_purchased = parseInt(
            // else change it into integer
            results[0].total_points_purchased
          ));

      // if total points is zero, set it to zero instead of minus
      res.locals.totalPointsObject.total_points === 0
        ? res.locals.totalPointsObject.total_points
        : (res.locals.totalPointsObject.total_points -= // if the user purchased items,
            results[0].total_points_purchased); // find the new total points by subtracting the total purchased points

      // Log out results to determine errors in-between middlewares
      console.log("Total Purchased Points", results[0]); // Total Purchased Points
      console.log(
        "Total Points Left",
        res.locals.totalPointsObject.total_points
      ); // Total Points Left After Purchase
      next();
    }
  };
  inventoryModel.totalPurchasedPoints(data, callback);
};

// Get All User Info together with total points from task
module.exports.selectUserById = (req, res, next) => {
  const { user_id } = req.params;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectUserById",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 404
    else if (results.length === 0) {
      res.status(404).json({
        message: "No Records Found",
      });
      return;
    }

    // Status 200
    else {
      const userInfo = { ...results[0], ...res.locals.totalPointsObject };
      res.status(200).json(userInfo);
    }
  };
  userModel.getUser(data, callback);
};

// Endpoint 2 GET /users Controller
// Read all user info from user table
module.exports.readAllUsers = (req, res, next) => {
  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "readAllUsers",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 404
    else if (results.length === 0) {
      res.status(404).json({
        message: "No Records Found",
      });
      return;
    }

    // Status 200
    else {
      res.status(200).json(results);
    }
  };
  userModel.readUser(callback);
};

// Endpoint 1 POST /users Controller

// Check email overlap with other users
module.exports.checkEmailAssociation = (req, res, next) => {
  const { username, email } = req.body;
  const data = {
    user_id: null,
    username,
    email,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkEmailAssociation",
      Error: error,
    };

    // Checks provided email is already associated with another user
    const emailCheck = results.find(
      (userData) => userData.email === data.email
    );

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 400
    else if (!username || !email) {
      res.status(400).json({
        message: "Missing Required Data",
      });
      return;
    }

    // Status 409
    else if (emailCheck !== undefined) {
      res.status(409).json({
        message: `Provided email: ${data.email} is already associated with another user`,
      });
      return;
    }

    // Pass on to the next function
    else {
      // Log out to the terminal for easier debugging in-between functions
      console.log("checkEmailAssociation", results);
      next();
    }
  };
  userModel.readUser(callback);
};

// Insert new user info to user table
module.exports.createNewUser = (req, res, next) => {
  const { username, email } = req.body;
  const data = {
    user_id: null,
    username,
    email,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "createNewUser",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 201
    else {
      data.user_id = results.insertId;
      res.status(201).json(data);
    }
  };
  userModel.insertUser(data, callback);
};

// Endpoint 4 PUT /users/{user_id} Controller
// Check username, email overlap with other users
module.exports.checkUserNameEmailAssociation = (req, res, next) => {
  const { user_id } = req.params;
  const { username, email } = req.body;
  const data = {
    user_id,
    username,
    email,
  };

  const callback = (error, results, fields) => {
    // Make a copy of results
    const otherUsers = [...results];
    // Remove current user to ensure proper checking with other users.
    otherUsers.splice(data.user_id - 1, 1);

    // Checks provided username is already associated with another user
    const usernameCheck = otherUsers.find(
      (updateUsername) => updateUsername.username === req.body.username
    );

    // Checks provided email is already associated with another user
    const emailCheck = otherUsers.find(
      (updateEmail) => updateEmail.email === req.body.email
    );

    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkUserNameEmailAssociation",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }

    // Status 400
    else if (!username || !email) {
      res.status(400).json({
        message: "Missing Required Data",
      });
      return;
    }

    // Status 409
    else if (usernameCheck !== undefined || emailCheck !== undefined) {
      res.status(409).json({
        message:
          "Provided username or email is already associated with another user",
      });
      return;
    }

    // Pass on to the next function
    else {
      // Log out to the terminal for easier debugging in-between functions
      console.log("checkUserNameEmailAssociation", results);
      next();
    }
  };
  userModel.readUser(callback);
};

// Update new user info
module.exports.updateUserById = (req, res, next) => {
  const { user_id } = req.params;
  const { username, email } = req.body;
  const data = {
    user_id,
    username,
    email,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "updateUserByID",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 200
    else {
      res.status(200).json(data);
    }
  };
  userModel.updateUser(data, callback);
};

// Endpoint 5 DELETE /users/{user_id} Controller
module.exports.deleteUserById = (req, res, next) => {
  const { user_id } = req.params;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "deleteUserByID",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).send({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 204
    else {
      res.status(204).send();
    }
  };
  userModel.deleteUser(data, callback);
};
