/*
    Name: Thiha Swan Htet

    File Name: taskRoutes.js

    Last Modified: 26/12/2023
*/

// Section A: Task

const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

// Endpoint 8: GET /tasks/{task_id}
router.get(
  "/:task_id",
  taskController.checkTaskValidationParams,
  taskController.selectTaskById
);

// Endpoint 7: GET /tasks
router.get("/", taskController.readAllTasks);

// Endpoint 6: POST /tasks
router.post("/", taskController.createNewTask);

// Endpoint 9: PUT /tasks/{task_id}
router.put(
  "/:task_id",
  taskController.checkTaskValidationParams,
  taskController.updateTaskById
);

// Endpoint 10: DELETE /tasks/{task_id}
router.delete(
  "/:task_id",
  taskController.checkTaskValidationParams,
  taskController.deleteTaskById
);

module.exports = router;
