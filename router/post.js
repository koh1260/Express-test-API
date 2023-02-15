const express = require("express");
const router = express.Router();
// const db = require("../db");
const { postsView, imageUpload } = require("../post/controllers");
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

router.post('/image', upload.single('postImage'), (req, res)=>{

})

router.get('/test', (req,res) => {
    postsView(req, res);
});

module.exports = router;
