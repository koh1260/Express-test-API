const express = require("express");
const router = express.Router();
const { writingComment } = require("../comment/controllers");

router.post("/writing", (req, res) => {
  writingComment(req, res);
});

module.exports = router;