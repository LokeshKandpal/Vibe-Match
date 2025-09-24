const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
});


// ! Crating a model
const User = mongoose.model("User" , userSchema);

module.export = User;