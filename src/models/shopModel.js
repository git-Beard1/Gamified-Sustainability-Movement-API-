/*
    Name: Thiha Swan Htet

    File Name: shopModel.js

    Last Modified: 30/12/2023
*/

// Advanced Feature Section B: Shop

const pool = require("../services/db");

// Universal item_id Validation Model
module.exports.checkItem = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT item_id FROM Shop
      WHERE item_id = ?
      `;

  const VALUES = [data.item_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint: GET /shop/items
module.exports.readItem = (callback) => {
  const MYSQLSTATEMENT = `
      SELECT * FROM Shop;
      `;

  pool.query(MYSQLSTATEMENT, callback);
};

// Endpoint: GET /shop/items/{category}
// Retrieve items by category in shop
module.exports.selectCategorisedItem = (data, callback) => {
  const MYSQLSTATMENT = `
      SELECT * FROM Shop
      WHERE category = ?;
      `;

  const VALUES = [data.category];
  pool.query(MYSQLSTATMENT, VALUES, callback);
};
