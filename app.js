const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const db = require("./db");
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/users", (req, res) => {
  let users = [];
  db.query("SELECT * FROM user", (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    users = rows;
    res.json(users);
  });
});

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

//
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM user WHERE email = ?", email, (err, row) => {
    if (err) console.log(err);
    if(row.length === 0) return res.status(400).send('아이디 없음');
    if(row[0].password !== password) return res.status(400).send('비밀번호 불일치');
    return res.status(200).send('로그인 성공');
  });
});

app.listen(port, () => {
  console.log(`Run Server: ${port}`);
});
