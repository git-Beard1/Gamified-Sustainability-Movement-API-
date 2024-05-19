/*
    Name: Thiha Swan Htet

    File Name: taskModel.js

    Last Modified: 26/12/2023
*/

// Section A: Task

const pool = require("../services/db");

// Universal task_id Validation Model
module.exports.checkTask = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT task_id FROM Task
      WHERE task_id = ?
      `;

  const VALUES = [data.task_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint 6 POST /tasks
module.exports.createTask = (data, callback) => {
  const MYSQLSTATEMENT = `
      INSERT INTO Task (title, description, points) 
      VALUES (?, ?, ?);
      `;

  const VALUES = [data.title, data.description, data.points];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint 7 GET /tasks
module.exports.readTasks = (callback) => {
  const MYSQLSTATEMENT = `
      SELECT * FROM Task;
      `;

  pool.query(MYSQLSTATEMENT, callback);
};

// Endpoint 8: GET /tasks/{task_id}
module.exports.selectTask = (data, callback) => {
  const MYSQLSTATMENT = `
      SELECT * FROM Task  
      WHERE task_id = ?;
      `;

  const VALUES = [data.task_id];
  pool.query(MYSQLSTATMENT, VALUES, callback);
};

// Endpoint 9: PUT /tasks/{task_id}
module.exports.updateTask = (data, callback) => {
  const MYSQLSTATEMENT = `
      UPDATE Task
      SET title = ?, description = ?, points = ?
      WHERE task_id = ?;
      `;

  const VALUES = [data.title, data.description, data.points, data.task_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint 10: DELETE /tasks/{task_id}
module.exports.deleteTask = (data, callback) => {
  const MYSQLSTATEMENT = `
      DELETE FROM Task
      WHERE task_id = ?;
      ALTER TABLE Task AUTO_INCREMENT = 1;
      `;

  const VALUES = [data.task_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};
