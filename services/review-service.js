module.exports = (app) => {
    const reviewService = require("../database/review/review-dao");

    const findAllReviews = (req, res) => {
        reviewService.findAllReviews()
            .then((reviews) => {
                res.send(reviews);
            });
    }

    const findReviewsBycocktail = (req, res) => {
        const cocktailId = req.params['cocktailId'];
        reviewService.findReviewsBycocktail(cocktailId)
            .then((reviews) => {
                res.send(reviews);
            });
    }

    const createReviewForcocktail = (req, res) => {
        const review = req.body;
        const cocktailId = review.cocktailId;
        const textArea = review.textArea;
        const username = review.username;
        const cocktailName = review.cocktailName;
        const cocktailImg = review.cocktailImg;
        const userId = review.userId;
        reviewService.createReviewForcocktail(cocktailId, textArea, username, cocktailName, cocktailImg, userId)
            .then(review => res.json(review));
    }

    const findReviewById = (req, res) => {
        const reviewId = req.params['reviewId'];
        reviewService.findReviewById(reviewId)
            .then(review => {
                res.json(review);
            });
    }

    const deleteReview = (req, res) => {
        const cocktailId = req.params["cocktailId"];
        const reviewId = req.params["reviewId"];
        reviewService.deleteReview(cocktailId, reviewId)
            .then(review => res.json(review));
    }

    const findReviewsByUsername = (req, res) => {
        const username = req.params["username"];
        reviewService.findReviewsByUsername(username)
            .then(reviews => res.json(reviews));
    }

    app.get("/api/reviews", findAllReviews);
    app.get("/api/reviews/:cocktailId", findReviewsBycocktail);
    app.post("/api/reviews/:cocktailId", createReviewForcocktail);
    app.get('/api/internal/reviews/:reviewId', findReviewById);
    app.get("/api/reviews/username/:username", findReviewsByUsername);
    app.delete("/api/reviews/:cocktailId/:reviewId", deleteReview);
}