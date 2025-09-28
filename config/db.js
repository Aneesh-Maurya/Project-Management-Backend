const mongoose = require('mongoose');


mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
}).then(()=>{
    console.log('Database connected successfully');
}).catch((err)=>{
    console.log('Database connection error: ', err);
})