const express = require("express")
const app = express();
const connectDB = require('./config/database')
const cookieParser = require("cookie-parser")
// const User = require('./models/user')/


// Middleware : TO READ JSON 
app.use(express.json());
app.use(cookieParser());


const authRouter = require('./routes/auth')
const profile = require('./routes/profile')
const requestRouter = require('./routes/request');
const profileRouter = require("./routes/profile");

app.use("/", authRouter)
app.use("/", profileRouter)
app.use('/', requestRouter)

// ! RULES :  first connect to db then listen to api's;
connectDB().then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
        console.log("Server is successfully running on PORT 3000");
    });
}).catch((err) => {
    console.error("Database cant be connected");
});
