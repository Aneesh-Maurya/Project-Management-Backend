const Task = require("../Model/TaskModel");

module.exports = {
    // ================= CREATE Task =================
    createTask: async (req, res) => {
        try {
            
            const {  title, description,dueDate, status ,project } = req.body;

            if (!project || !title) {
                return res
                    .status(400)
                    .json({ success: false, message: "Project and Title are required" });
            }

            const task = new Task({ project, title, description, status, dueDate });
            await task.save();

            res.status(201).json({
                success: true,
                message: "Task created successfully",
                data: task,
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

  

    // ================= GET Task BY ID =================
    getTaskById: async (req, res) => {
        try {
            const taskId = req.params.id;
            
            const task = await Task.find({project:taskId});
            
            if (!task) {
                return res
                    .status(404)
                    .json({ success: false, message: "Task not found" });
            }

            res.json({ success: true, data: task });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // ================= UPDATE Task =================
    updateTask: async (req, res) => {
        try {
            
            const { title, description, status, dueDate } = req.body;

            const task = await Task.findByIdAndUpdate(
                req.params.id,
                { title, description, status, dueDate },
                { new: true, runValidators: true }
            );
              
            if (!task) {
                return res
                    .status(404)
                    .json({ success: false, message: "Task not found" });
            }

            res.json({
                success: true,
                message: "Task updated successfully",
                data: task,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // ================= DELETE Task =================
    deleteTask: async (req, res) => {
        try {
            const task = await Task.findByIdAndDelete(req.params.id);

            if (!task) {
                return res
                    .status(404)
                    .json({ success: false, message: "Task not found" });
            }

            res.json({ success: true, message: "Task deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
};
