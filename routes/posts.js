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


router
    .route("/:id")
    .get((req, res) => {
        const post = posts.find((post) => post.id == req.params.id);
        
        if(post)
            res.json(post);
        else
            next();
    })
    .patch((req, res) => {
        const post = posts.find((post, i) => {
            if(post.id == req.params.id) {
                for(const key in req.body)
                    posts[i][key] = req.body[key];

                return true;
            }
        })

        if(post)
            res.json(post);
        else
            next();
    })
    .delete((req, res, next) => {
        const post = posts.find((post, i) => {
            if(post.id  == req.params.id) {
                posts.splice(i, 1);
                return true;
            }
        })

        if(post)
            res.json(post);
        else
            next();
    });

module.exports = router;