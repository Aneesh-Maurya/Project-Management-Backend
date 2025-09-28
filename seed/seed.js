// backend/src/seed/seed.ts
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../Model/userModel');
const Project = require('../Model/projectModel');
const Task = require('../Model/TaskModel');
require('dotenv').config();
async function run() {
  try {
    // Connect to MongoDB

    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("MongoDB connected"))
      .catch(err => console.error("DB error:", err));
    // Drop existing database
    await mongoose.connection.dropDatabase();
    console.log('Database cleared');

    // Create user
    const password = await bcrypt.hash('Test@123', 10);
    const user = await User.create({ name: 'Test User', email: 'test@example.com', password });

    // Create projects
    const project1 = await Project.create({
      title: 'Project One',
      description: 'Seed project one description',
      status: 'active',
      owner: user._id
    });

    const project2 = await Project.create({
      title: 'Project Two',
      description: 'Seed project two description',
      status: 'active',
      owner: user._id
    });

    // Create tasks for project1
    await Task.create([
      { project: project1._id, title: 'Task 1', description: 'Task 1 description', dueDate: new Date(), status: 'todo' },
      { project: project1._id, title: 'Task 2', description: 'Task 2 description', dueDate: new Date(), status: 'in-progress' },
      { project: project1._id, title: 'Task 3', description: 'Task 3 description', dueDate: new Date(), status: 'done' }
    ]);

    // Create tasks for project2
    await Task.create([
      { project: project2._id, title: 'Task A', description: 'Task A description', dueDate: new Date(), status: 'todo' },
      { project: project2._id, title: 'Task B', description: 'Task B description', dueDate: new Date(), status: 'in-progress' },
      { project: project2._id, title: 'Task C', description: 'Task C description', dueDate: new Date(), status: 'done' }
    ]);

    console.log('Seed complete!');
    process.exit(0);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
