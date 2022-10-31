const userModel = require("./user-model");

const register = (user) => {
    return userModel.create(user);
}

const findUserByCredentials = (username, password) => {
    return userModel.findOne({username, password});
}

const findUserByUsername = (username) => {
    return userModel.find({username: username});
}

const findUserById = (uid) => {
    return userModel.findById(uid);
}

const findAllUsers = () => {
    return userModel.find();
}

const deleteUser = (uid) => {
    return userModel.deleteOne({_id: uid});
}

const updateUser = (user) => {
    return userModel.updateOne({_id: user._id}, {$set: user});
}

module.exports = {
    register,
    findUserByCredentials,
    findUserByUsername,
    findUserById,
    findAllUsers,
    deleteUser,
    updateUser,
}