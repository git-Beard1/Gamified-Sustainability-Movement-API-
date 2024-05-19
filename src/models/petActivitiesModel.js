/*
    Name: Thiha Swan Htet

    File Name: petActivitiesModel.js

    Last Modified: 30/12/2023
*/

// Advanced Feature Section B: PetActivities
const pool = require("../services/db");

// Endpoint: GET /pet_activities/{user_id}/{pet_id}
// Retrieve activities(tasks completed) by User's Pet
module.exports.selectActivityOfUserPet = (data, callback) => {
  const MYSQLSTATMENT = `
      SELECT activity_id,
      user_id, pet_id, 
      Task.task_id, Task.title,
      DATE(completion_date) AS completion_date

      FROM PetActivities

      INNER JOIN Task
      ON Task.task_id = PetActivities.task_id

      WHERE user_id = ? AND pet_id = ?;
  `;

  const VALUES = [data.user_id, data.pet_id];
  pool.query(MYSQLSTATMENT, VALUES, callback);
};

// Endpoint: GET /pet_activities/
// Retrieve all pet activities
module.exports.getAllPetActivities = (callback) => {
  const MYSQLSTATEMENT = `    
          SELECT 
          activity_id, user_id,
          pet_id, task_id, 
          DATE(completion_date) AS completion_date
          FROM PetActivities
          `;

  pool.query(MYSQLSTATEMENT, callback);
};

// Endpoint: POST pet_activities/
// Check Pet Belongs to User. Retrieve points from Task
module.exports.getPoints = (data, callback) => {
  const MYSQLSTATEMENT = `
        SELECT task_id, points AS exp_obtained
        FROM Task
        WHERE task_id = ?;
        `;

  const VALUES = [data.task_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Retrieve total exp obtained from tasks accomplished by pet
module.exports.getPetTotalExp = (data, callback) => {
  const MYSQLSTATEMENT = `
    SELECT 
    SUM(Task.points) AS 'total_exp'

    FROM Pets

    LEFT JOIN PetActivities
    ON Pets.pet_id = PetActivities.pet_id
    LEFT JOIN Task
    ON Task.task_id = PetActivities.task_id

    WHERE Pets.pet_id = ?;
    `;

  const VALUES = [data.pet_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Post user_id, pet_id, task_id, completion_date into PetActivities Table
module.exports.createActivity = (data, callback) => {
  const MYSQLSTATEMENT = `
      INSERT INTO PetActivities (user_id, pet_id, task_id, completion_date)
      VALUES (?, ?, ?, NOW());
      `;

  const VALUES = [data.user_id, data.pet_id, data.task_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// DELETE pet activities row(s) based on user and pet id
module.exports.deletePetActivities = (data, callback) => {
  const MYSQLSTATEMENT = `
      DELETE FROM PetActivities
      WHERE user_id = ? AND pet_id = ?;
      ALTER TABLE PetActivities AUTO_INCREMENT = 1;
  `;

  const VALUES = [data.user_id, data.pet_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};
