const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const db = require("./db");
const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);
require("dotenv").config();

var options = {
  host: '127.0.0.1',
  port: 3306,
  user: "hs",
  password: "root",
  database: "instagram",
};

var sessionStore = new MySQLStore(options);
// use
app.use(session({
	key: 'session_cookie_name',
	secret: process.env.SESSION_SECRET,
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// user 조회
app.get("/user/:user_id", (req, res) => {
  const userId = req.params.user_id;
  console.log(userId);
  db.query("SELECT * FROM user WHERE user_id = ?", userId, (err, row) => {
    console.log(row);
    if (err) console.log(err);
    if (row.length === 0) return res.status(400).send("존재하지 않는 user");
    return res.json(row[0]);
  });
});

// user 테이블에 데이터 삽입
app.post("/register", (req, res) => {
  const params = [
    req.body.email,
    req.body.name,
    req.body.nickname,
    req.body.password,
  ];

  db.query(
    "INSERT INTO user(email,  name, nickname, password) VALUE(?,?,?,?)",
    params,
    (err, row) => {
      if (err) console.log(err);
      res.sendStatus(400).send("Bad Request");
    }
  );
  res.sendStatus(200).send("Success");
});

// 로그인, 세션 생성
app.post("/login", (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;

  db.query("SELECT * FROM user WHERE email = ?", email, (err, row) => {
    if (err) console.log(err);
    if (row.length === 0) return res.status(400).send("아이디 없음");
    if (row[0].password !== password)
      return res.status(400).send("비밀번호 불일치");
    req.session.is_logined = true;
    req.session.nickname = row[0].nickname;
    return res.status(200).send("로그인 성공");
  });
});



// 게시글 리스트 조회
app.get("/post", (req, res) => {
  db.query("SELECT * FROM post", (err, rows) => {
    if (err) console.log(err);
    return res.status(200).json(rows);
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Run Server`);
});
