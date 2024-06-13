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

            const user = {
                id: users.length + 1,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email
            }

            users.push(user);
            res.json(users[users.length - 1]);
        } else
            next(error(400, "Insufficient data"));
    });

router
    .route("/:id")
    .get((req, res, next) => {
        const user = users.find((user) => user.id == req.params.id);

        if(user)
            res.json(user);
        else
            next();
    })
    .patch((req, res, next) => {
        const user = users.find((user, i) => {
            if(user.id == req.params.id) {
                for(const key in req.body)
                    users[i][key] = req.body[key];
                
                return true;
            }
        })

        if(user)
            res.json(user);
        else
            next();
    })
    .delete((req, res, next) => {
        const user = users.find((user, i) => {
            if(user.id == req.params.id)
                users.splice(i, 1);

            return true;
        })

        if(user)
            res.json(user)
        else
            next();
    });

module.exports = router;