const reviewSchema = require("./review-schema")
const mongoose = require("mongoose")
const reviewModel = mongoose.model("reviewModel", reviewSchema)
module.exports = reviewModel