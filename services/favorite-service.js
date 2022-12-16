module.exports = (app) => {
    const favoriteService = require('../database/favorite/favorite-dao');

    const isFavorite = (req, res) => {
        const userId = req.params.userId;
        const cocktailId = req.params.cocktailId;
        favoriteService.isFavorite(userId, cocktailId).then(count => {
            if (count <= 0) {
                res.send(false);
            } else {
                res.send(true);
            }
        });
    }

    const findFavoritesByUserId = (req, res) => {
        const userId = req.params.userId;
        favoriteService.findFavoritesByUserId(userId)
            .then(favorites => res.json(favorites));
    }

    const addFavorite = (req, res) => {
        const userId = req.body.userId;
        const cocktailId = req.body.cocktailId;
        const username = req.body.username;
        const cocktailName = req.body.cocktailName;
        const cocktailImg = req.body.cocktailImg;
        favoriteService.addFavorite(userId, cocktailId, username, cocktailName, cocktailImg)
            .then(favorite => res.json(favorite));
    }

    const removeFavorite = (req, res) => {
        const userId = req.body.userId;
        const cocktailId = req.body.cocktailId;
        favoriteService.removeFavorite(userId, cocktailId)
            .then(favorite => res.json(favorite));
    }

    const findAllFavorites = (req, res) => {
        favoriteService.findAllFavorites()
            .then((favorites) => {
                res.send(favorites);
            });
    }

    app.get('/api/favorite/:cocktailId/:userId', isFavorite);
    app.get('/api/favorite/:userId', findFavoritesByUserId);
    app.post('/api/favorite', addFavorite);
    app.delete('/api/favorite', removeFavorite);
    app.get('/api/favorite', findAllFavorites);
}