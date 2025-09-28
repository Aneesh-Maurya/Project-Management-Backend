const Project = require("../Model/projectModel");


module.exports = {

  // ================= CREATE Project =================
  createProject: async (req, res) => {
    try {
      const { title, description, status } = req.body;
        const owner=req.userId.id
          
      if (!owner) {
        return res.status(400).json({ success: false, message: "owner fields are required" });
      }
      if (!title) {
        return res.status(400).json({ success: false, message: "title fields are required" });
      }
      const project = new Project({ title, description, status,owner });
      await project.save();

      res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: project,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // ================= GET ALL Projects =================
  getAllProjects: async (req, res) => {
    try {
      const owner=req.userId
      const projects = await Project.find({ owner: owner.id }).select('-owner');
      res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ================= GET Project BY ID =================
  getProjectById: async (req, res) => {
    try {

      const projectId = req.params.id;
      const project = await Project.findById(projectId)

      if (!project)
        return res.status(404).json({ success: false, message: "Project not found" });

      res.status(200).json({ success: true, data: project });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // ================= UPDATE Project =================
  updateProject: async (req, res) => {
    try {
      const { title, description, status } = req.body;

      const project = await Project.findByIdAndUpdate(
        req.params.id,
        { title, description, status },
        { new: true, runValidators: true }
      );

      if (!project)
        return res.status(404).json({ success: false, message: "Project not found" });

      res.status(200).json({ success: true, message: "Project updated successfully", data: project });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // ================= DELETE Project =================
  deleteProject: async (req, res) => {
    try {
      const projectId = req.params.id;
      if(!projectId){
        return res.status(400).json({ success: false, message: "Project ID is required" });
      }
      const project = await Project.findByIdAndDelete(projectId);

      if (!project)
        return res.status(404).json({ success: false, message: "Project not found" });

      res.status(200).json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
}
