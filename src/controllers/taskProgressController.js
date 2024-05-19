/*
    Name: Thiha Swan Htet

    File Name: taskProgressController.js

    Last Modified: 30/12/2023
*/

// Section A: TaskProgress

const taskProgressModel = require("../models/taskProgressModel");

// Universal progress_id Validation Controller (for params)
module.exports.checkProgressValidationParams = (req, res, next) => {
  const { progress_id } = req.params;
  const data = {
    progress_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkProgressValidationParams",
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
    // Checks progress_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid progress_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.progress_id = results[0]; // store progress_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkProgressValidationParams", res.locals.progress_id);
      next();
    }
  };
  taskProgressModel.checkProgress(data, callback);
};

// Universal progress_id Validation Controller (for body)
module.exports.checkProgressValidationBody = (req, res, next) => {
  const { progress_id } = req.body;
  const data = {
    progress_id: parseInt(progress_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkprogressValidationBody",
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
    else if (!progress_id) {
      res.status(400).json({
        message: "Missing Required Data",
      });
      return;
    }

    // Status 404
    // Checks progress_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid progress_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.progress_id = results[0]; // store progress_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkProgressValidationBody", res.locals.progress_id);
      next();
    }
  };
  taskProgressModel.checkProgress(data, callback);
};

// Endpoint 12: GET /task_progress/{progress_id}
module.exports.selectTaskProgressById = (req, res, next) => {
  const { progress_id } = req.params;
  const data = {
    progress_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectTaskProgressById",
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
      // If user did not provide notes, provide "None" as alternative.
      results[0].notes === null
        ? (results[0].notes = "None")
        : results[0].notes;
      res.status(200).json(results[0]);
    }
  };
  taskProgressModel.selectTaskProgress(data, callback);
};

// Endpoint 11: POST /task_progress
module.exports.createNewTaskProgress = (req, res, next) => {
  const { user_id, task_id, completion_date, notes } = req.body;
  const data = {
    progress_id: null,
    user_id: parseInt(user_id),
    task_id: parseInt(task_id),
    completion_date,
    notes,
  };

  // Status 400
  if (!completion_date) {
    res.status(400).json({
      message: "Missing Required Data",
    });
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "createNewTaskProgress",
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
      data.progress_id = results.insertId;
      res.status(201).json(data);
    }
  };
  taskProgressModel.createTaskProgress(data, callback);
};

// Endpoint 13: PUT /task_progress/{progress_id}
module.exports.updateTaskProgressById = (req, res, next) => {
  const { progress_id } = req.params;
  const { notes } = req.body;
  const data = {
    progress_id,
    notes,
  };

  // Status 400
  if (!notes) {
    res.status(400).json({
      message: "Missing Required Data",
    });
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "updateTaskProgresById",
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

    // Passes on to the next function
    else {
      // log out to terminal to confirm update
      console.log("updateTaskProgressById", results);
      next();
    }
  };
  taskProgressModel.updateTaskProgress(data, callback);
};

// Endpoint 14: DELETE/task_progress/{progress_id}
module.exports.deleteTaskProgressById = (req, res, next) => {
  const { progress_id } = req.params;
  const data = {
    progress_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "deleteTaskProgressById",
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
      res.status(204).send();
    }
  };
  taskProgressModel.deleteTaskProgress(data, callback);
};

// Modify Endpoint: GET/task_progress/{user_id}
module.exports.selectTaskByUserIdTask = (req, res, next) => {
  const { user_id } = req.params;
  const { keyword } = req.query;
  const data = {
    user_id,
    keyword: `%${keyword}%`,
  };
  console.log(data.keyword);

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectTaskByUserIdTask",
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
      res
        .status(404)
        .json({
          message: `Task with keyword: ${keyword} done by user: ${user_id} not found.`,
        });
    } else {
      console.log(results);
      // Log only one if results.length is 1
      results.length > 1
        ? (res.status(200).json(results))
        : (res.status(200).json(results[0]))
    }
  };
  taskProgressModel.getTaskByUserTask(data, callback);
};
