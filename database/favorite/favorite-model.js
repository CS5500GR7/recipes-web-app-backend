const mongoose = require('mongoose');
const userSchema = require('./favorite-schema');

const favoriteSchema = mongoose.model('FavoriteModel', userSchema);

module.exports = favoriteSchema;