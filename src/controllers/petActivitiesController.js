/*
    Name: Thiha Swan Htet

    File Name: petActivitiesController.js

    Last Modified: 30/12/2023
*/

// Advanced Feature Section B: PetActivities

const petActivitiesModel = require("../models/petActivitiesModel");

// Endpoint: GET /pet_activities/{user_id}/{pet_id}
// Retrieve activities(tasks completed) by User's Pet
module.exports.selectPetActivitiesByUserPetId = (req, res, next) => {
  const { user_id, pet_id } = req.params;
  const data = {
    user_id,
    pet_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectPetActivitiesByUserPetId",
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

    //Status 404
    else if (results.length === 0) {
      res.status(404).json({
        message: "No Records Found",
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
  petActivitiesModel.selectActivityOfUserPet(data, callback);
};

// Endpoint: GET /pet_activities/
module.exports.readAllPetActivities = (req, res, next) => {
  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "readAllPetActivities",
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
      // Change "null" to "Skill Unequipped" for better readability
      results.forEach((result) => {
        if (
          result.equipped_skill_id === null &&
          result.equipped_skill_name === null
        ) {
          result.equipped_skill_id = "Skill Unequipped";
          result.equipped_skill_name = "Skill Unequipped";
        }
      });

      // To print as one whole object instead of array if the array length is 1
      results.length !== 1
        ? res.status(200).json(results)
        : res.status(200).json(results[0]);
    }
  };
  petActivitiesModel.getAllPetActivities(callback);
};

// Endpoint: POST /pet_activities/
// Check Pet belongs to user. Retrieve points from Task
module.exports.getTaskExp = (req, res, next) => {
  const { user_id, pet_id, task_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
    task_id: parseInt(task_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "getRequiredoints",
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

    // Pass on to the next function
    else {
      res.locals.exp_obtained = results[0].exp_obtained; // store points as exp in res.locals

      // Log out to terminal for easier debugging in-between functions
      console.log("Exp_obtained from task", res.locals.exp_obtained);
      next();
    }
  };
  petActivitiesModel.getPoints(data, callback);
};

// Retrieve total exp obtained from tasks accomplished by pet
module.exports.getTotalExpOfPet = (req, res, next) => {
  const { pet_id } = req.body;
  const data = {
    pet_id: parseInt(pet_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "getTotalExpOfPet",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
    }

    // Pass on the total exp of pet to the next function
    else {
      results[0].total_exp === null // if the total_exp doesn't exist, null,
        ? (results[0].total_exp = 0) // turn to zero
        : (results[0].total_exp = parseInt(results[0].total_exp)); // else, turn into integer.
      res.locals.total_exp = results[0].total_exp; // Pass on the total exp of pet to the next

      // Log out to terminal to ensure easier debuggin in-between functions
      console.log("Total_exp of pet", res.locals.total_exp);
      next();
    }
  };
  petActivitiesModel.getPetTotalExp(data, callback);
};

// Post user_id, pet_id, task_id, completion_date into PetActivities Table
module.exports.createPetActivities = (req, res, next) => {
  const { user_id, pet_id, task_id } = req.body;
  const data = {
    activity_id: null,
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
    task_id: parseInt(task_id),
  };

  // Status 400
  if ((!user_id, !pet_id, !task_id)) {
    res.status(400).json({
      message: "Missing Required Data",
    });
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "createPetActivities",
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
      data.activity_id = results.insertId;
      const message = {
        exp_obtained: res.locals.exp_obtained,
      };
      res.status(201).json({ ...data, ...message }); // sends a response back to user
    }
  };
  petActivitiesModel.createActivity(data, callback);
};

// DELETE pet activities row(s) based on user and pet id
module.exports.deletePetActivityByUserPetId = (req, res, next) => {
  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "deletePetActivityByUserPetId",
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

    // Status 204
    else {
      console.log(results);
      res.status(204).send();
    }
  };
  petActivitiesModel.deletePetActivities(res.locals, callback);
};
