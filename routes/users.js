const express = require("express");
const router = express.Router();

const users = require("../data/users.js");
const error = require("../utilities/utilities.js");

router
    .route("/")
    .get("/", (req, res) => {
        res.json(users);
    })

module.exports = router;