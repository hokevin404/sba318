const express = require("express");
const router = express.Router();

const reviews = require("../data/reviews.js");
const error = require("../utilities/utilities.js");

router
    .route("/")
    .get((req, res) => {
        const review = reviews.filter((review) => review.toUserID == req.query.account)
        // })
        res.json(review);
        
    });

module.exports = router;