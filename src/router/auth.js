const express = require("express");
const router = express.Router();
const { login, signUp, loginedUserInfo, logout, userInfo, userInfoByNickname } = require("../controllers/userController");


// 로그인
router.post("/login", (req, res) => {
  login(req, res);
});
// 회원가입
router.post("/sign-up", (req, res) => {
  signUp(req, res);
});
// 로그아웃
router.get("/logout", (req, res) => {
  logout(req, res);
})
// 유저 정보 조회
router.get("/logined-user", (req, res) => {
  loginedUserInfo(req, res);
})
router.get("/user/:userId", (req, res) => {
  userInfo(req, res);
})
router.get("/user-nickname/:nickname", (req, res) => {
  userInfoByNickname(req, res);
})

module.exports = router;