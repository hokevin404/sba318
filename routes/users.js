const express = require("express");
const router = express.Router();

const users = require("../data/users.js");
const error = require("../utilities/utilities.js");

router
    .route("/")
    .get((req, res) => {
        res.json(users);
    })
    .post((req, res, next) => {
        if(req.body.first_name && req.body.last_name && req.body.username && req.body.email) {
            if(users.find((user) => user.username == req.body.username))
                next(error(409, "Username already exists"))
            if(users.find((user) => user.email == req.body.email))
                next(error(409, "Email already exists"))
        } else
            next(error(400, "Insufficient data"));
    });

module.exports = router;