const express=require('express');
const bodyParser=require('body-parser');
const dotenv=require('dotenv').config();
const cors=require('cors');
const cookieParser= require('cookie-parser')
const app=express();

require('./config/db')
const userRoute=require('./Router/UserRouter')
const projectRoute=require('./Router/projectRouter')
const taskRoute=require('./Router/taskRouter')
const port=process.env.PORT || 3000
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/users',userRoute)
app.use('/api/v1/projects',projectRoute)
app.use('/api/v1/tasks',taskRoute)



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});