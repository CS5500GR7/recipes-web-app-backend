const favoriteModel = require('./favorite-model');

const isFavorite = (userId, cocktailId) => {
    return favoriteModel.countDocuments({userId, cocktailId});
}

const findFavoritesByUserId = (userId) => {
    return favoriteModel.find({userId});
}

const addFavorite = (userId, cocktailId, username, cocktailName, cocktailImg) => {
    return favoriteModel.create({userId, cocktailId, username, cocktailName, cocktailImg});
}

const removeFavorite = (userId, cocktailId) => {
    return favoriteModel.deleteOne({userId, cocktailId});
}

const findAllFavorites = () => {
    return favoriteModel.find();
}

module.exports = {
    isFavorite,
    findFavoritesByUserId,
    addFavorite,
    removeFavorite,
    findAllFavorites,
}