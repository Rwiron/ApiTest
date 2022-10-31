const express = require("express");
const app = express();
const authRoute = require('./routes/auth');
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();


// connecting to database
mongoose.connect(
    process.env.DB_CONNECT,()=>
console.log('connected succeffullly to Database!'))
.catch((e)=>{
    console.log(e)
});

// middleware
app.use(express.json());

// routers for best pratice in middleware
app.use('/api/user',authRoute);

app.listen(2000, ()=>console.log('server running on port 2000'));
