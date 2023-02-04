const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const db = require("./db");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
    let users = []
  db.query("SELECT * FROM user", (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(rows);
    users = rows;
  });
  res.send(users[0]);
});

app.post("/register", (req, res) => {
  const params = [
    req.body.user_id,
    req.body.email,
    req.body.phone,
    req.body.name,
    req.body.nickname,
    req.body.password,
  ];

  db.query(
    "INSERT INTO user(user_id, email, phone, name, nickname, password) VALUE(?,?,?,?,?,?)",
    params,
    (err, row) => {
      if (err) console.log(err);
    }
  );
  res.end();
});

app.listen(port, () => {
  console.log(`Run Server: ${port}`);
});
