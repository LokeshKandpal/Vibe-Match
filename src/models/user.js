const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt    = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20,
    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address")
            }
        },

    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password isnt strong enough")
            }
        },
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid")
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://i.pinimg.com/originals/f6/d5/b4/f6d5b458bf7aa0276c81a666c916de18.jpg`",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL address")
            }
        },
    },
    about: {
        type: String,
        default: "this is the default description of the user"
    },

    skills: {
        type: [String],
    }
}, 
  { 
    timestamps: true,
  },

);
        userSchema.methods.getJWT = async function () {  
                const user = this;
                const token = jwt.sign({ _id: user._id }, "DEVTINDER@$18", { expiresIn: "1d", });
                return token;
              } ,

    userSchema.methods.validatePassword = async function( passwordInputByUser){
                const user = this;
                const hashPassword = user.password ;
                const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashPassword)
                return isPasswordValid;
            }
        
// ! Crating a model
const User = mongoose.model("User", userSchema);

module.exports = User;
