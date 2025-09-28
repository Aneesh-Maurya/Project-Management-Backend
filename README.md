Project Management Backend

This is the backend API for the Project Management Application.
It is built with Node.js, Express, and MongoDB and provides APIs for authentication, project management, and task tracking.

🚀 Features

🔐 Authentication with JWT + cookies (register, login, logout)

👥 User roles (User)

📋 Projects & Tasks – full CRUD, due dates, status tracking

📊 Dashboard analytics (total projects, active, completed)

🌱 Seeder scripts for demo data (users, projects, tasks)

🐳 Dockerized setup (API + MongoDB with docker-compose)

🌐 RESTful API design with CORS and error handling

📋 Table of Contents

Prerequisites

Local Setup

Running Seeders

Docker Setup

✅ Prerequisites

Node.js v20+

MongoDB v6.4+ (local or Atlas cloud)

Docker & Docker Compose ( container setup)

💻 Local Setup
1. Clone Repository
git clone https://github.com/<your-username>/Project-Management-Backend.git
cd Project-Management-Backend

2. Install Dependencies
npm install

3. Setup Environment Variables

Create a .env file:

PORT=5000
DB_URI=mongodb://localhost:27017/Project_Management
JWT_SECRET=supersecretkey

4. Start MongoDB

If installed locally:

mongod --dbpath /data/db


Or update .env with your MongoDB Atlas URI.

5. Run Server
npm run dev   # development mode


Backend API will be live at → http://localhost:5000

🌱 Running Seeders

Populate demo users, projects, and tasks:

npm run seed

🐳 Docker Setup
Build & Run Backend Only
docker build -t project-management-backend .
docker run -p 5000:5000 project-management-backend


API → http://localhost:5000
