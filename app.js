const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const auth = require('./router/auth');
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: 'http://localhost:3001',
  credential: true
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// auth
app.use('/auth', auth);

// 게시글 리스트 조회
app.get("/post", (req, res) => {
  db.query("SELECT * FROM post", (err, rows) => {
    if (err) console.log(err);
    return res.status(200).json(rows);
  });
});

function compare(row){
  
}

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Run Server`);
});
