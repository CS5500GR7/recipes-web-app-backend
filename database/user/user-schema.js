const mongoose = require("mongoose")
const Schema = require("mongoose");
const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    phone: String,
    address: String,
    email: String,
    role: {type: String, enum: ["ADMIN", "USER"]},
    avatar: String,
    about: String
}, {collection: "users", timestamps: true})

module.exports = userSchema