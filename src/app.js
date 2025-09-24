const express = require("express")
const connectDB = require('./config/database')
const app = express();

// ! RULES :  first connect to db then listen to api's;
 
connectDB().then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
        console.log("Server is successfully running on PORT 3000");
    });
}).catch((err) => {
    console.error("Database cant be connected");
});


