const validator = require("validator")

const validateSignupData = (req) => {

    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName) {
        throw new Eroor("Plese Enter the name")
    }

    else if (!validator.isEmail(email)) {
        throw new Error("Email is invalid")
    }

    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please Enter a strong password")
    }

};

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "email", "age", "gender", "about", "photoUrl", "skills",];

    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
    );

    return isEditAllowed;
}
module.exports = {
    validateSignupData,
    validateEditProfileData,
};