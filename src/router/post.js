const express = require("express");
const router = express.Router();
const { postsView, posting, loginedPost } = require("../controllers/postController");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

try {
	fs.readdirSync('uploads'); // 폴더 확인
} catch(err) {
	console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync('uploads'); // 폴더 생성
}

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

router.get('/posts-view', (req,res) => {
  postsView(req, res);
});
// 게시글 업로드
router.post('/posting', upload.single('postImage'), (req, res)=> {
  console.log(req.file);  
    posting(req, res);
});
router.get('/logined-post', (req, res) => {
  loginedPost(req, res);
});

module.exports = router;
