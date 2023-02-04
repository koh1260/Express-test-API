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
    let users = []
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
    }
  );
  res.send('ok');
});

app.listen(port, () => {
  console.log(`Run Server: ${port}`);
});
