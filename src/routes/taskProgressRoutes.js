/*
    Name: Thiha Swan Htet

    File Name: taskProgressRoutes.js

    Last Modified: 26/12/2023
*/

// Section A: TaskProgress

const express = require("express");
const router = express.Router();

const taskProgressController = require("../controllers/taskProgressController");
const userController = require("../controllers/userController");
const taskController = require("../controllers/taskController");

// Endpoint: GET /task_progress/getTask/{user_id}
router.get(
  "/get_task/:user_id/",
  userController.checkUserValidationParams,
  taskProgressController.selectTaskByUserIdTask
);

// Endpoint 12: GET /task_progress/{progress_id}
router.get(
  "/:progress_id",
  taskProgressController.checkProgressValidationParams,
  taskProgressController.selectTaskProgressById
);

// Endpoint 11: POST /task_progress
router.post(
  "/",
  userController.checkUserValidationBody,
  taskController.checkTaskValidationBody,
  taskProgressController.createNewTaskProgress
);

// Endpoint 13: PUT /task_progress/{progress_id}
router.put(
  "/:progress_id",
  taskProgressController.checkProgressValidationParams,
  taskProgressController.updateTaskProgressById,
  taskProgressController.selectTaskProgressById
);

// Endpoint 14: DELETE /task_progress/{progress_id}
router.delete(
  "/:progress_id",
  taskProgressController.checkProgressValidationParams,
  taskProgressController.deleteTaskProgressById
);

module.exports = router;
