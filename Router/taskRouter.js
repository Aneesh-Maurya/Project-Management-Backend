const express = require("express");
const TaskController = require("../Controller/TaskController");
const {verifyToken} = require("../Middleware/auth"); // if you want to protect routes

const router = express.Router();

// ================= CREATE Task =================
router.post("/create-task", verifyToken, TaskController.createTask);

// ================= GET Task BY ID =================
router.get("/get-task-details/:id", verifyToken, TaskController.getTaskById);

// ================= UPDATE Task =================
router.put("/update-task/:id", verifyToken, TaskController.updateTask);

// ================= DELETE Task =================
router.delete("/delete-task/:id", verifyToken, TaskController.deleteTask);

module.exports = router;
