const express = require("express");
const router = express.Router();
// const db = require("../db");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
// controllers
const { login, signUp, isLogined } = require("../user/controllers");

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_TEST_NAME,
};

const sessionStore = new MySQLStore(options);
// use
router.use(
  session({
    key: "session_cookie_name",
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
  })
);

// 로그인
router.post("/login", (req, res) => {
  login(req, res);
});
// 회원가입
router.post("/sign_up", (req, res) => {
  signUp(req, res);
});

module.exports = router;