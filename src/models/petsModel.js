/*
    Name: Thiha Swan Htet

    File Name: petsModel.js

    Last Modified: 30/12/2023
*/

// Advanced Feature Section B: Pets

const pool = require("../services/db");

// Universal pet_id Validation Model
module.exports.checkPet = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT pet_id FROM Pets
      WHERE pet_id = ?
      `;

  const VALUES = [data.pet_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint: GET pets/{rarity}
// Retrieve pets by rarity in shop
module.exports.selectByRarity = (data, callback) => {
  const MYSQLSTATMENT = `
      SELECT * FROM Pets
      WHERE rarity = ?;
      `;

  const VALUES = [data.rarity];
  pool.query(MYSQLSTATMENT, VALUES, callback);
};

// Endpoint: GET pets/
module.exports.readPets = (callback) => {
  const MYSQLSTATEMENT = `
      SELECT * FROM Pets;
      `;

  pool.query(MYSQLSTATEMENT, callback);
};
