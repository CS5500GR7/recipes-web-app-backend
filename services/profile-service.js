module.exports = (app) => {
    const userService = require("../database/user/user-dao");

    const findUser = (req, res) => {
        const currentUser = req.session['currentUser'];
        if (currentUser) {
            res.json(currentUser);
        } else {
            res.sendStatus(204);
        }
    }

    const findUserById = (req, res) => {
        const targetId = req.params['uid'];
        userService.findUserById(targetId)
            .then((user) => {
                res.send(user);
            })
            .catch(err => console.error(`user not login, findUserById error: ${err}`));
    }

    const findUserByUsername = (req, res) => {
        const targetUser = req.params['username'];
        userService.findUserByUsername(targetUser)
            .then((user) => {
                res.send(user);
            })
            .catch(err => console.error(`user not exit, findUserByUsername error: ${err}`));
    }

    const findAllUsers = (req, res) => {
        userService.findAllUsers()
            .then((users) => {
                res.send(users);
            });
    }

    const deleteUserById = (req, res) => {
        const targetId = req.params['uid'];
        userService.deleteUser(targetId)
            .then((profile) => {
                res.json("delete user: " + targetId);
            });
    }

    const updateUser = (req, res) => {
        const updatedUser = req.body;
        userService.updateUser(updatedUser)
            .then((newUser) => {
                res.json("update user: " + updatedUser._id);
                req.session['currentUser'] = updatedUser;
                req.session.save();
            });
    }

    app.get("/api/profile", findUser);
    app.get("/api/profiles/:uid", findUserById);
    app.get("/api/profiles/username/:username", findUserByUsername);
    app.get("/api/profiles", findAllUsers);
    app.delete("/api/profiles/:uid", deleteUserById);
    app.put("/api/profile", updateUser);
}