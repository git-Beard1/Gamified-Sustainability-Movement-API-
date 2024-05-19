/*
    Name: Thiha Swan Htet

    File Name: petBondsModel.js

    Last Modified: 30/12/2023
*/

// Advanced Feature Section B: PetBonds

const pool = require("../services/db");

// Universal bond_id Validation Model
module.exports.checkBond = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT bond_id FROM PetBonds
      WHERE bond_id = ?
      `;

  const VALUES = [data.bond_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Universal Model to Check Pet Belongs to User validation
module.exports.checkPetUserRS = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT user_id, pet_id 
      FROM PetBonds
      WHERE user_id = ? AND pet_id = ?;
      `;

  const VALUES = [data.user_id, data.pet_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint: GET /pet_bonds/{user_id}
// Retrieve user info and all pet attributes by user_id
module.exports.getPetBondById = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT bond_id, 
      User.user_id, User.username, 
      Pets.pet_id, Pets.pet_name, 
      Skills.skill_id AS equipped_skill_id, 
      Skills.skill_name AS equipped_skill_name, 
      exp, level
  
      FROM PetBonds
  
      LEFT JOIN User
      ON User.user_id = PetBonds.user_id
  
      LEFT JOIN Pets
      ON Pets.pet_id = PetBonds.pet_id
  
      LEFT JOIN Skills
      ON Skills.skill_id = PetBonds.skill_id
      WHERE PetBonds.user_id = ?
  `;

  const VALUES = [data.user_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint: GET /pet_bonds/
// Retrieve user info and all pet attributes
module.exports.getAllPetBonds = (callback) => {
  const MYSQLSTATEMENT = `    
      SELECT bond_id, 
      User.user_id, User.username, 
      Pets.pet_id, Pets.pet_name, 
      Skills.skill_id AS equipped_skill_id, 
      Skills.skill_name AS equipped_skill_name, 
      exp, level
          
      FROM PetBonds
          
      LEFT JOIN User
      ON User.user_id = PetBonds.user_id
          
      LEFT JOIN Pets
      ON Pets.pet_id = PetBonds.pet_id
          
      LEFT JOIN Skills
      ON Skills.skill_id = PetBonds.skill_id;
      `;

  pool.query(MYSQLSTATEMENT, callback);
};

// Endpoint: POST /pet_bonds/

// Retrieve required_points from Pets
module.exports.getPoints = (data, callback) => {
  const MYSQLSTATEMENT = `    
      SELECT * FROM Pets
      WHERE pet_id = ?;
      `;

  const VALUES = [data.pet_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Post pet into PetBonds table with user_id and pet_id
module.exports.insertPet = (data, callback) => {
  const MYSQLSTATEMENT = `
    INSERT INTO PetBonds (user_id, pet_id)
    Values(?, ?);
    `;

  const VALUES = [data.user_id, data.pet_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint: PUT /pet_bonds/
// Update equipped_skill of pet
module.exports.updateSkill = (data, callback) => {
  const MYSQLSTATEMENT = `
      UPDATE PetBonds
      SET skill_id = ?
      WHERE user_id = ? AND pet_id = ?;
      `;

  const VALUES = [data.skill_id, data.user_id, data.pet_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint: DELETE pet_bonds/{bond_id}

// Select user and pet id from provided bond_id
module.exports.selectUserPet = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT user_id, pet_id
      FROM PetBonds
      WHERE bond_id = ?;
      `;

  const VALUES = [data.bond_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Delete a row on PetBondsTable by bond_id
module.exports.deleteBonds = (data, callback) => {
  const MYSQLSTATEMENT = `
      DELETE FROM PetBonds
      WHERE bond_id = ?;
      ALTER TABLE PetBonds AUTO_INCREMENT = 1;
      `;

  const VALUES = [data.bond_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Post user_id, pet_id, task_id, completion_date into PetActivities Table
module.exports.updatePetExpLvNxtLvPts = (data, callback) => {
  const MYSQLSTATEMENT = `
      UPDATE PetBonds
      SET exp = ?, level = ?, next_lv_points = ?
      WHERE user_id = ? AND pet_id = ?;
      `;

  const VALUES = [
    data.exp,
    data.level,
    data.next_lv_points,
    data.user_id,
    data.pet_id,
  ];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};
