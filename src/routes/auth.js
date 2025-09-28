const express   = require('express')
const authRouter = express.Router();

const { validateSignupData } = require('../utils/validation')
const User = require('../models/user')
const bcrypt = require("bcrypt")


authRouter.post('/signup', async (req, res) => {

    try {
        // validation of the data:
        validateSignupData(req);

        // encrypting:
        const { firstName, lastName, email, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10)

        // creating a new instancce of the user model
        const user = new User({ firstName, lastName, email, password: hashPassword, })
       
        const savedUser = await user.save();

         const token  = await savedUser.getJWT();
         res.cookie("token" , token ,{
            expires : new Date(Date.now() + 8 * 3600000)
         });


        res.json({ message : "USer Added successfully !" , data: savedUser});
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})


authRouter.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;

        //  we will check if the email is even present in our db
        const user = await User.findOne({ email: email })

        if (!user) {
            throw new Error("Invalid Credentials")
        }
          
        const isPasswordValid = await user.validatePassword(password);
         
                if (isPasswordValid) {

//  Create a JWT Token
                 const token = await user.getJWT();
                
                 res.cookie("token" , token, { 
                    expires: new Date(Date.now() + 8 * 3600000),
                    sameSite: "lax",
                    secure: false,
                    httpOnly: true
                 });
                    res.send(user);

                }
                else {
                    throw new Error("Invalid Credentials")
                }
    }
            catch (error) {
            res.status(400).send(error.message)
    }
})

authRouter.post('/logout' , async(req, res) =>{
    res.cookie("token", null, {expires: new Date(Date.now()), })
    res.send("User Logged out successfully !!!");

})



module.exports = authRouter;
