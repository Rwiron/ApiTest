const mongoose = require("mongoose");

// schema gonna be like an object 
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max: 255
    },
    email:{
        type:String,
        required:true,
        max:255,
        min:6
      },
      password:{
        type:String,
        requred: true,
        max:1024,
        min:6
      },
      date:{
        type: Date,
        default: Date.now,
      }
});

module.exports = mongoose.model("User", userSchema);

