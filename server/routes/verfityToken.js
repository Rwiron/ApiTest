const jwt =  require("jsonwebtoken");

// middleware function we can use for protecting the routes that we need

function auth (req,res,next)
{
const token = req.header('auth-token');
if(!token) return res.status(401).send('Access denied');
try{
   const verified = jwt.verify(token,process.env.TOKEN_SECRET);
   req.user = verified;
}
catch{
res.status(400).send('invalid token');
}
}