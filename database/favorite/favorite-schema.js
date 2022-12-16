const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    username: String,
    cocktailId: String,
    cocktailName: String,
    cocktailImg: String
}, {collection: 'favorite'});

module.exports = favoriteSchema;