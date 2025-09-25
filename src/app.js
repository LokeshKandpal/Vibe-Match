const express = require("express")
const app = express();
const connectDB = require('./config/database')
const User = require('./models/user')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { userAuth } = require('./middleware/auth')
const { validateSignupData } = require('./utils/validation')
const cookieParser = require("cookie-parser")


// Middleware : TO READ JSON 
app.use(express.json());
app.use(cookieParser());


// ! Creating singup APi
app.post('/signup', async (req, res) => {

    try {
        // validation of the data:
        validateSignupData(req);

        // encrypting:

        const { firstName, lastName, email, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10)

        // creating a new instancce of the user model
        const user = new User({ firstName, lastName, email, password: hashPassword, })
        await user.save();
        res.send("User added successfully")
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

// LOGIN :
app.post("/login", async (req, res) => {

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
            });
               res.send("Login Successful!!!");

        }
        else {
            throw new Error("Invalid Credentials")
        }
    }
    catch (error) {
        res.status(400).send(error.message)
    }
})

// Profile 

app.get("/profile", userAuth, async (req, res) => {

    try {

        const user = req.user;
        res.send(user);
    }
    catch (error) {
        res.status(400).send(error.message)
    }

})



app.post("/sendConnectionRequest", async (req, res) => {



})








// ! RULES :  first connect to db then listen to api's;
connectDB().then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
        console.log("Server is successfully running on PORT 3000");
    });
}).catch((err) => {
    console.error("Database cant be connected");
});
