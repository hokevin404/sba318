const express = require("express");
const router = express.Router();

const users = require("../data/users.js");
const reviews = require("../data/reviews.js");
const error = require("../utilities/utilities.js");

router
    .route("/")
    .get((req, res, next) => {
        if(req.query.account <= users.length) {
            const review = reviews.filter((review) => review.toUserID == req.query.account);
            res.json(review);
        } else
            next(error(404, "Data not found"));
    });

module.exports = router;