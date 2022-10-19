require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const mongoose = require('mongoose');

const mongoAtlasUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`
const options = {useNewUrlParser: true, useUnifiedTopology: true};

try {
    mongoose.connect(
        mongoAtlasUri,
        options,
        () => console.log('connected to database'));
} catch (e) {
    console.log('could not connect', e);
}

const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

const cors = require('cors');
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

require("./services/user-service")(app)
require("./services/review-service")(app)
require("./services/favorite-service")(app)
require("./services/profile-service")(app)

app.listen(process.env.PORT || 3001)
console.log("node server is at service!")