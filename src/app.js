const express = require("express")
const connectDB = require('./config/database')
const User = require('./models/user')
const app = express();

app.use(express.json());



// ! Creating singup APi
app.post('/signup', async (req, res) => {

    // creating a new instancce of the user model
    const user = new User({
        firstName: "virat",
        lastName: "Kohli",
        email: "virat@18.com",
        password: "virat@123"
    })

    try {
        await user.save();
        res.send("User added successfully")
    } catch (err) {
        res.status(400).send(err.message);
    }

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
