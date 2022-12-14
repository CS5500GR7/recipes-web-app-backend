const userService = require("../database/user/user-dao");
module.exports = (app) => {
    const userService = require("../database/user/user-dao");

    const register = (req, res) => {
        const credentials = req.body;
        console.log(credentials);
        userService.findUserByUsername(credentials.username, credentials.email)
            .then((actualUser) => {
                console.log("acutalUser is " + actualUser);
                if (actualUser) {
                    // send 0 if username already exists
                    res.send("0");

                } else if (
                    !userService.validateEmail(credentials.email)) {
                    res.send("1");
                } else if (isNaN(credentials.age)) {
                    res.send("2");
                } else if (Number(credentials.age) < 21) {
                    res.send("3");
                } else {
                    userService.register(credentials)
                        .then((newUser) => {
                            req.session['profile'] = newUser;
                            res.json(newUser);
                        });
                }
            });
    }

    const login = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        console.log(username);
        userService.findUserByCredentials(username, password)
            .then(user => {
                if (user) {
                    req.session['currentUser'] = user;
                    res.send(user);
                } else {
                    res.send("0");
                }
            });
    }

    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }


    app.post("/api/register", register);
    app.post("/api/login", login);
    app.post("/api/logout", logout);

}
