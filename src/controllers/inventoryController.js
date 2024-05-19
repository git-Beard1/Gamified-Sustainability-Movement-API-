/*
    Name: Thiha Swan Htet

    File Name: inventoryController.js

    Last Modified: 30/12/2023
*/

// Advanced Feature Section B: Inventory

const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// Universal inventory_id Validation Controller (for params)
module.exports.checkInventoryValidationParams = (req, res, next) => {
  const { inventory_id } = req.params;
  const data = {
    inventory_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkInventoryValidationParams",
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
    // Checks inventory_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid inventory_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.inventory_id = results[0]; // store inventory_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkInventoryValidationParams", res.locals.inventory_id);
      next();
    }
  };
  inventoryModel.checkInventory(data, callback);
};

// Universal inventory_id Validation Controller (for body)
module.exports.checkInventoryValidationBody = (req, res, next) => {
  const { inventory_id } = req.body;
  const data = {
    inventory_id: parseInt(inventory_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkInventoryValidationBody",
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
    // Checks inventory_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid inventory_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.inventory_id = results[0]; // store inventory_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkInventoryValidationBody", res.locals.inventory_id);
      next();
    }
  };
  inventoryModel.checkInventory(data, callback);
};

// Endpoint: GET /inventory/{user_id}/{category}
// Retrieve items by category in inventory by user
module.exports.selectCategorisedItemByUser = (req, res, next) => {
  const { user_id, category } = req.params;
  const data = {
    user_id,
    category,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectCategorisedItemByUser",
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
    // Checks for existence of categorised items
    else if (results.length === 0) {
      // Sends an error message if categorised item does not exist in user's inventory
      res.status(404).json({
        message: `Items of ${category} Bought by User ${data.user_id} Not Found`, // sends error message to inform user
      });
      return;
    }

    // Status 200
    else {
      // To print as one whole object instead of array if the array length is 1
      results.length !== 1
        ? res.status(200).json(results)
        : res.status(200).json(results[0]);
    }
  };
  inventoryModel.selectCategorisedItem(data, callback);
};

// Endpoint: GET /inventory/{user_id}
// Retrieve all items in inventory by user
module.exports.selectInventoryByUser = (req, res, next) => {
  const { user_id } = req.params;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectInventoryByUser",
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
    // Checks for item's existence bought by user
    else if (results[0].item_id === null) {
      // Sends an error message for invalid item_id
      res.status(404).json({
        message: `Items Bought by User ${data.user_id} Not Found`,
      });
      return;
    }

    // Status 200
    else {
      // To print as one whole object instead of array if the array length is 1
      results.length !== 1
        ? res.status(200).json(results)
        : res.status(200).json(results[0]);
    }
  };
  inventoryModel.selectInventoryByUser(data, callback);
};

// Endpoint: POST /inventory/

// Retrieve all Related info of the Item from Shop
module.exports.getRequiredPoints = (req, res, next) => {
  const { user_id, item_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    item_id: parseInt(item_id),
  };

  // Status 400
  if ((!user_id, !item_id)) {
    res.status(400).send();
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "getRequiredPoints",
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

    // Pass on to the next function
    else {
      res.locals.itemsObject = results[0]; // store all item details from shop table into res.locals
      res.locals.item_cost = results[0].item_cost; // store item_cost to buy item in res.locals

      console.log("getRequiredPoints", res.locals.itemsObject); // log out to terminal to confirm updates
      next();
    }
  };
  inventoryModel.getPoints(data, callback);
};

// Retrieve total points obtained from tasks accomplished by user
module.exports.getTotalPointsOfUser = (req, res, next) => {
  const { user_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "getTotalPointsOfUser",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
    }

    // Pass on the total points of user to the next function
    else {
      results[0].total_points === null // if the total_points doesn't exist, null,
        ? (results[0].total_points = 0) // turn to zero
        : (results[0].total_points = parseInt(results[0].total_points)); // else, turn into integer.
      res.locals.totalPointsObject = results[0]; // Pass on the total points of user to the next

      console.log("Total Points Object", res.locals.totalPointsObject); // log out to terminal to confirm updates (Total Points Collected By User)
      next();
    }
  };
  userModel.getUserTotalPoints(data, callback);
};

// Check total items bought by user and sum up all the purchased points.
module.exports.getPointsLeft = (req, res, next) => {
  const { user_id, item_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    item_id: parseInt(item_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "getPointsLeft",
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

      console.log("Total Purchased Points", results[0]); // logs out to terminal to see updates (Total purchased_points)
      console.log("New Total Points", res.locals.totalPointsObject); // logs out to terminal to see updates (New total_points)
      next();
    }
  };
  inventoryModel.totalPurchasedPoints(data, callback);
};

// Post item into inventory table with user_id, item_id and bought_date
module.exports.purchaseItem = (req, res, next) => {
  const { user_id, item_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    item_id: parseInt(item_id),
  };

  // Status 406
  // Check player's points to purchase item
  if (res.locals.totalPointsObject.total_points < res.locals.item_cost) {
    // if the total points less than the required points to purchase item,
    res.status(406).json({
      message: "Insufficient Points", // sends message to indicate insufficient points to buy
    });
    return;
  }

  const purchaseItemcallback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "purchaseItem",
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
      // Find the new total amount by subtracting the purchased points of item
      const pointsLeft =
        res.locals.totalPointsObject.total_points - res.locals.item_cost;
      // Store user_id, and item info to let user know the item is purchased successfully.
      const receipt = { ...res.locals.user_id, ...res.locals.itemsObject };

      const message = {
        // message upon successful purchase
        Message: "Item Purchased Successfully",
        points_left: pointsLeft,
      };
      res.status(201).json({ ...message, ...receipt }); // sends response to user back
    }
  };
  inventoryModel.insertItem(data, purchaseItemcallback);
};

// Endpoint: DELETE /inventory/{inventory_id}
// Delete item in inventory by inventory_id
module.exports.deleteItemByInvId = (req, res, next) => {
  const { user_id, inventory_id } = req.params;
  const data = {
    user_id: parseInt(user_id),
    inventory_id: parseInt(inventory_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "deleteItemByInvId",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        message: "Internal Server Error",
      });
      return;
    }

    // Status 404
    else {
      // If no changes, if inventory_id is not found,
      if (results[0].affectedRows === 0) {
        // Sends an error message for invalid inventory_id
        res.status(404).json({
          message: `Provided Inventory ID: ${inventory_id} Not Found.`,
        });
        return;
      }

      // Status 204
      else {
        res.status(204).send();
      }
    }
  };
  inventoryModel.deleteInventory(data, callback);
};
