const userSchema = require("./user-schema")
const mongoose = require("mongoose")
const userModel = mongoose.model("UserModel", userSchema)
module.exports = userModel