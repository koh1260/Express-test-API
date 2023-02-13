const express = require("express");
const router = express.Router();
// const db = require("../db");
const { postsView } = require("../post/controllers");

router.get('/test', (req,res) => {
    postsView(req, res);
});

module.exports = router;
