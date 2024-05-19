/*
    Name: Thiha Swan Htet

    File Name: taskProgressModel.js

    Last Modified: 26/12/2023
*/

// Section A: TaskProgress

const pool = require("../services/db");

// Universal progress_id Validation Model
module.exports.checkProgress = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT progress_id FROM TaskProgress
      WHERE progress_id = ?
  `;
  
  const VALUES = [data.progress_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback)
};

// Endpoint 11: POST /task_progress
module.exports.createTaskProgress = (data, callback) => {
  const MYSQLSTATEMENT = `
      INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
      VALUES (?, ?, ?, ?);
      `;

  const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint 12: GET /task_progress/{progress_id}
module.exports.selectTaskProgress = (data, callback) => {
  const MYSQLSTATMENT = `
      SELECT  
      progress_id, user_id, task_id, 
      DATE(completion_date) AS completion_date, notes

      FROM TaskProgress
      WHERE progress_id = ?;
      `;

  const VALUES = [data.progress_id];
  pool.query(MYSQLSTATMENT, VALUES, callback);
};

// Endpoint 13: PUT /task_progress/{progress_id}
module.exports.updateTaskProgress = (data, callback) => {
  const MYSQLSTATEMENT = `
      UPDATE TaskProgress
      SET notes = ?
      WHERE progress_id = ?;
      `;

  const VALUES = [data.notes, data.progress_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint 14: DELETE/task_progress/{progress_id}
module.exports.deleteTaskProgress = (data, callback) => {
  const MYSQLSTATEMENT = `
      DELETE FROM TaskProgress
      WHERE progress_id = ?;
      ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
      `;

  const VALUES = [data.progress_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Modify Endpoint GET /task_progress/{user_id}/
module.exports.getTaskByUserTask = (data, callback) => {
  const MYSQLSTATEMENT = `
  SELECT  
  TaskProgress.user_id, User.username, TaskProgress.task_id, 
  Task.title
  FROM TaskProgress
  LEFT JOIN User
  ON User.user_id = TaskProgress.user_id
  LEFT JOIN Task
  ON Task.task_id = TaskProgress.task_id
  WHERE TaskProgress.user_id = ? AND Task.title LIKE ?;
  `;
  console.log(data.keyword)
  const VALUES = [data.user_id, data.keyword];
  pool.query(MYSQLSTATEMENT, VALUES, callback)
};
