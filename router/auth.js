const express = require("express");
const router = express.Router();
const db = require("../db");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

var options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

var sessionStore = new MySQLStore(options);
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

// user 조회
router.get("/user/:user_id", (req, res) => {
  const userId = req.params.user_id;
  db.query("SELECT * FROM user WHERE user_id = ?", userId, (err, row) => {
    console.log(row);
    if (err) console.log(err);
    if (row.length === 0) return res.status(400).send("존재하지 않는 user");
    return res.json(row[0]);
  });
});

// user 테이블에 데이터 삽입
router.post("/register", (req, res) => {
  const body = req.body;
  const params = [
    body.email,
    body.name,
    body.nickname,
    bcrypt.hashSync(body.password),
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
// 데이터 없음 400, 아이디 없음 404, 비밀번호 불일치 401
router.post("/login", (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;

  if (Object.keys(body).length === 0) return res.status(400).send("no data");
  
  db.query("SELECT * FROM user WHERE email = ?", email, (err, row) => {
    if (err) console.log(err);
    if (row.length === 0) return res.status(404).send("존재하지 않는 계정");
    if (row[0].password !== password)
      return res.status(401).send("비밀번호 불일치");
    req.session.is_logined = true;
    req.session.nickname = row[0].nickname;
    return res.status(200).json({"user_id" : row[0].user_id});
  });
});

// 로그아웃, 세션 삭제
router.get("/logout", (req, res) => {
  const session = req.session;

  if(!session) return res.status(400).send('no session');
  req.session.destroy((err) => {
    console.log(err);
  });
  return res.status(200).send('session destroy');
});

module.exports = router;
