const express = require("express");
const router = express.Router();
const { writingComment, commentView } = require("../controllers/commentControllers");

router.post("/writing", (req, res) => {
  writingComment(req, res);
});

router.get("/comment-view/:postId", (req, res) => {
    commentView(req, res);
})

module.exports = router;