const express = require("express")
require('dotenv').config();
const app = express();
const connectDB = require('./config/database')
const cookieParser = require("cookie-parser")
const cors = require("cors")



// Middleware : TO READ JSON 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());


const authRouter = require('./routes/auth')
const requestRouter = require('./routes/request');
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");

app.use("/", authRouter)
app.use("/", profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)

// ! RULES :  first connect to db then listen to api's;
connectDB().then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
        console.log("Server is successfully running on PORT 3000");
    });
}).catch((err) => {
    console.error("Database cant be connected");
});
