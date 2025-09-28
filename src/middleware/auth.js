const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userAuth  = async(req, res , next)  =>{

// Read the token from the req cookies

try {
     const { token } = req.cookies;
      if(!token){
   return res.status(401).send("Please Login ")
   }

   const decodedeObj = await jwt.verify(token , process.env.JWT_SECRET_KEY)

   const {_id} = decodedeObj;

   const user = await User.findById(_id);
   if(!user){
       throw new Error("User not found")
   }
    
   // attaching the user in the request part
   req.user = user
   next();

} 
   catch (error) {
   res.status(400).send(error.message)
}


}

module.exports = {userAuth ,}
