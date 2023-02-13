const express = require("express");
const router = express.Router();
// const db = require("../db");
// controllers
const { login, signUp, isLogined, logout } = require("../user/controllers");


// 로그인
router.post("/login", (req, res) => {
  login(req, res);
});
// 회원가입
router.post("/sign_up", (req, res) => {
  signUp(req, res);
});
// 로그아웃
router.get("/logout", (req, res) => {
  logout(req, res);
})

module.exports = router;