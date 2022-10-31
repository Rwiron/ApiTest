const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const Joi = require('joi');
const jwt = require("jsonwebtoken");



const schema = Joi.object({
   name:Joi.string().min(4).required(),
   email:Joi.string().min(6).required().email(),
   password:Joi.string().min(6).required()
});

const login = Joi.object({
   email:Joi.string().min(6).required().email(),
   password:Joi.string().min(6).required()
});


router.post('/register', async (req, res) => {

   //let validate the data before making user 
   const {error} = schema.validate(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   //checking if user is already in database

   const emailExit = await User.findOne({email:req.body.email});
   if(emailExit) return res.status(400).send('Email already exists');

   //hashing a password

   const salt = await bcrypt.genSaltSync(10);
   const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

   //creation of new user
   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
   });
   try {
      const savedUser = await user.save();
      res.send({user:user._id});
   } catch (err) {
      res.status(400).send(err);
   }
});

router.post('/login',async (req,res)=>{
   const {error} = login.validate(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   //checking if email exist 
   const user = await User.findOne({email:req.body.email});
   if(!user) return res.status(400).send('Email or password is wrong try again');
   //password checkout 
   const validPass = await bcrypt.compare (req.body.password,user.password);
   if(!validPass) return res.status(400).send('invalid Passcode');

   // creating and assign webtoken  
   // in frontend in our code when we log id we have access to this id and we knwo that the user is logged in 
   const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
   res.header ('auth-token',token).send(token);

});

module.exports = router;