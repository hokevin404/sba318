// Import module and initialize router
const express = require("express");
const router = express.Router();

// Import listings data
const posts = require("../data/posts.js");
const error = require("../utilities/utilities.js");

// Route for GET and POST
router
    .route("/")
    // GET route for all listings
    .get((req, res) => {
        res.json(posts);
    })
    // POST route to create new listing
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


// ROUTE to GET, PATCH, and DELETE specific listing ID
router
    .route("/:id")
    // GET route for a specific lising
    .get((req, res) => {
        const post = posts.find((post) => post.id == req.params.id);
        
        if(post)
            res.json(post);
        else
            next();
    })
    // PATCH route to update specific listing by id
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
    // DELETE route to remove listing by specific posting ID
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