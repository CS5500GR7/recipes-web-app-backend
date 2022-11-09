const reviewModel = require("./review-model");

const findAllReviews = () => {
    return reviewModel.find().exec();
}

const findReviewsBycocktail = (cocktailId) => {
    // return reviewModel.find({cocktailId: cocktailId}).populate("users").exec();
    return reviewModel.find({cocktailId: cocktailId}).exec();
}

const createReviewForcocktail = (cocktailId, textArea, username, cocktailName, cocktailImg, userId) => {
    return reviewModel.create({cocktailId, textArea, username, cocktailName, cocktailImg, userId});
}

const findReviewById = (reviewId) => {
    return reviewModel.findById(reviewId);
}

const findReviewsByUsername = (username) => {
    if(username) {
        return reviewModel.find({username});
    }
}

const deleteReview = (cocktailId, reviewId) => {
    return reviewModel.deleteOne({cocktailId, _id: reviewId});
}

module.exports = {
    findAllReviews,
    findReviewsBycocktail,
    createReviewForcocktail,
    findReviewById,
    findReviewsByUsername,
    deleteReview,
}