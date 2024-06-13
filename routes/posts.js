const express = require("express");
const router = express.Router();

const posts = require("../data/posts.js");
const error = require("../utilities/utilities.js");

router
    .route("/")
    .get((req, res) => {
        res.json(posts);
    })
    .post((req, res) => {
        if(req.body.userID && req.body.title && req.body.price && req.body.condition && req.body.description) {
            const post = {
                id: posts.length + 1,
                userID: req.body.userID,
                title: req.body.title,
                price: req.body.price,
                condition: req.body.condition,
                description: req.body.description
            };

            posts.push(post);
            res.json(posts[posts.length - 1]);
        } else
            next(error(400, "Insufficient data"));
    });

module.exports = router;