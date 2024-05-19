/*
    Name: Thiha Swan Htet

    File Name: petBondsController.js

    Last Modified: 30/12/2023
*/

// Advanced Feature Section B: PetBonds

const petBondsModel = require("../models/petBondsModel");

// Universal bond_id Validation Controller (for params)
module.exports.checkBondValidationParams = (req, res, next) => {
  const { bond_id } = req.params;
  const data = {
    bond_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkBondValidationParams",
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
    // Checks bond_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid bond_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.bond_id = results[0]; // store bond_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkBondValidationParams", res.locals.bond_id);
      next();
    }
  };
  petBondsModel.checkBond(data, callback);
};

// Universal bond_id Validation Controller (for body)
module.exports.checkBondValidationBody = (req, res, next) => {
  const { bond_id } = req.body;
  const data = {
    bond_id: parseInt(bond_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkBondValidationBody",
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
    // Checks bond_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid bond_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.bond_id = results[0]; // store bond_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkBondValidationBody", res.locals.bond_id);
      next();
    }
  };
  petBondsModel.checkBond(data, callback);
};

// Universal User Pet Ownership Validation Controller (for params)
module.exports.checkUserPetOwnershipParams = (req, res, next) => {
  const { user_id, pet_id } = req.params;
  const data = {
    user_id,
    pet_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkUserPetOwnershipParams",
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
    // Checks User Pet Ownership validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Pet does not belong to user",
      });
      return;
    }

    // Pass on to the next function
    else {
      // Log out to the terminal for easier debugging in-between functions
      console.log("checkUserPetOwnershipParams", results);
      next();
    }
  };
  petBondsModel.checkPetUserRS(data, callback);
};

// Universal User Pet Ownership Validation Controller (for body)
module.exports.checkUserPetOwnershipBody = (req, res, next) => {
  const { user_id, pet_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkUserPetOwnershipBody",
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
    // Checks User Pet Ownership validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Pet does not belong to user",
      });
      return;
    }

    // Pass on to the next function
    else {
      // Log out to the terminal for easier debugging in-between functions
      console.log("checkUserPetOwnershipBody", results);
      next();
    }
  };
  petBondsModel.checkPetUserRS(data, callback);
};

// Check Unique Pet Ownership (User can only own one pet of same kind)
module.exports.uniquePetOwnership = (req, res, next) => {
  const { user_id, pet_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "uniquePetOwership",
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

    // Status 409
    // Checks User Pet Ownership validation
    else if (results.length !== 0) {
      res.status(409).json({
        message: "User can only exchange one pet of the same kind",
      });
      return;
    }

    // Pass on to the next function
    else {
      // Log out to the terminal for easier debugging in-between functions
      console.log("uniquePetOwnership", results);
      next();
    }
  };
  petBondsModel.checkPetUserRS(data, callback);
};

// Endpoint: GET /pet_bonds/{user_id}
// Retrieve user info and all pet attributes by user_id
module.exports.selectBondByUserId = (req, res, next) => {
  const { user_id } = req.params;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectBondByUserId",
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
        message: `User ${data.user_id} has not adopted any pets`,
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
      results.length != 1
        ? res.status(200).json(results)
        : res.status(200).json(results[0]);
    }
  };
  petBondsModel.getPetBondById(data, callback);
};

// Endpoint: GET /pet_bonds/
// Retrieve all info from PetBonds
module.exports.readAllPetBonds = (req, res, next) => {
  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "readAllPetBonds",
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
  petBondsModel.getAllPetBonds(callback);
};

// Endpoint: POST /pet_bonds/
// Retrieve required_points from Pets
module.exports.getRequiredPoints = (req, res, next) => {
  const { user_id, pet_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
  };

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
        message: "Internal Server Error",
      });
      return;
    }

    // Pass on to the next middleware
    else {
      res.locals.petObject = results[0]; // store all pet infos in res.locals to include in the receipt after exchange
      res.locals.required_eco_points = results[0].required_eco_points; // store required_points of pet in res.locals

      // Log out to terminal for easier debugging in-between functions
      console.log("Pet Object:", results[0]);
      next();
    }
  };
  petBondsModel.getPoints(data, callback);
};

// Post pet into PetBonds table with user_id, pet_id
module.exports.exchangePet = (req, res, next) => {
  const { user_id, pet_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
  };

  // Status 406
  // Check player's points to exchange pet
  if (
    res.locals.totalPointsObject.total_points < res.locals.required_eco_points
  ) {
    // if the total points less than the required points to exchange pet,
    res.status(406).json({
      message: "Insufficient Points", // sends message to indicate insufficient points to exchange
      total_eco_points: res.locals.totalPointsObject.total_points,
      required_eco_points: res.locals.required_eco_points,
    });
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "exchangePet",
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
      // Store user_id, and pet info to let user know pet is exchanged successfully.
      const receipt = { ...res.locals.user_id, ...res.locals.petObject };
      console.log(receipt);

      const message = {
        // message upon successful exchange
        message: "Pet Exchanged Successfully",
        total_eco_points: res.locals.totalPointsObject.total_points,
      };
      res.status(201).json({ ...message, ...receipt }); // sends response to user back
    }
  };
  petBondsModel.insertPet(data, callback);
};

// Endpoint: PUT /pet_bonds/
// Update skill of pet
module.exports.updateEquippedSkillOfPet = (req, res, next) => {
  const { user_id, pet_id, skill_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
    skill_id: parseInt(skill_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "updateEquippedSkillOfPet",
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
      const message = {
        message: "Skill Equipped Successfully",
      };
      res.status(200).json({ ...message, ...data });
    }
  };
  petBondsModel.updateSkill(data, callback);
};

// Endpoint: DELETE /pet_bonds/{bond_id}

// Acquire user and pet ids to be later deleted from SkillsMastered Table
module.exports.selectUserPetByBondId = (req, res, next) => {
  const { bond_id } = req.params;
  const data = {
    bond_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectUserPetByBondId",
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
      // Store in res.locals to be used in the next function
      res.locals.user_id = results[0].user_id;
      res.locals.pet_id = results[0].pet_id;

      // Log out to terminal for easier debugging in-between functions
      console.log("Select user_id from bond_id", res.locals.user_id);
      console.log("Select pet_id from bond_id", res.locals.pet_id);
      next();
    }
  };
  petBondsModel.selectUserPet(data, callback);
};

// Delete a row on PetBondsTable by bond_id
module.exports.deleteBondsByBondId = (req, res, next) => {
  const { bond_id } = req.params;
  const data = {
    bond_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "deleteBondsByBondId",
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
      // If no changes, if bond_id is not found,
      if (results[0].affectedRows === 0) {
        // Sends an error message for invalid bond_id
        res.status(404).json({
          message: `Provided Bond ID: ${bond_id} Not Found.`,
        });
        return;
      }

      // Pass on to the next function
      else {
        // Log out to the terminal to see updates
        console.log("deleteBondsByBondId", results);
        next();
      }
    }
  };
  petBondsModel.deleteBonds(data, callback);
};

// Update Exp, Level, and Next Level Points in PetBonds Table After Completing Task in Pet Activities Table
module.exports.updatePetAttributes = (req, res, next) => {
  let level; // declare level as a variable
  const totalExp = res.locals.total_exp + res.locals.exp_obtained;
  const calLevel = Math.floor(totalExp / 100); // evaluate level. Pets level up after 100 exp.
  const exp = totalExp % 100; // leftover exp is the new exp
  const next_lv_points = 100 - exp; // exp needed to level up.

  calLevel === 0 ? (level = 1) : (level = calLevel + 1); // if calLevel is 0, change it to 1, else add 1

  const { user_id, pet_id } = req.body;
  const data = {
    exp,
    level,
    next_lv_points,
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "updatePetAttributes",
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

    // Pass on to the next middleware
    else {
      // Log out to terminal for easier debugging in-between functions
      console.log("updatePetAttributes", results);
      next();
    }
  };
  petBondsModel.updatePetExpLvNxtLvPts(data, callback);
};
