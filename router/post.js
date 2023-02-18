const express = require("express");
const router = express.Router();
// const db = require("../db");
const { postsView, posting } = require("../post/controllers");
const multer = require('multer');
const path = require('path');
const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
      }
    }),
  });

router.get('/test', (req,res) => {
    postsView(req, res);
});
// 게시글 업로드
router.post('/posting', upload.single('postImage'), (req, res)=> {
    posting(req, res);
})

module.exports = router;
