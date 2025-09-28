const express = require("express");
const ProjectController = require("../Controller/projectController");
const {verifyToken} = require("../Middleware/auth"); // Middleware for JWT auth

const router = express.Router();

// ================= CREATE Project =================
router.post("/create-project", verifyToken, ProjectController.createProject);

// ================= GET ALL Projects =================
router.get("/get-all-project", verifyToken, ProjectController.getAllProjects);

// ================= GET Project BY ID =================
router.get(
  "/get-project-details/:id",
  verifyToken,
  ProjectController.getProjectById
);

// ================= UPDATE Project =================
router.put(
  "/update-project/:id",
  verifyToken,
  ProjectController.updateProject
);

// ================= DELETE Project =================
router.delete(
  "/delete-project/:id",
  verifyToken,
  ProjectController.deleteProject
);

module.exports = router;
