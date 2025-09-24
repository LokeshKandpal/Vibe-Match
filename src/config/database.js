const mongoose = require("mongoose");

const connectDB = async()=>{
      mongoose.connect(
    "mongodb+srv://lokesh1208:loki%40121823@learnmongo.j9vyf2y.mongodb.net/devTinder "
)
};

module.exports = connectDB ;

