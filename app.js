const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const auth = require('./router/auth');
const post = require('./router/post');
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: 'http://localhost:3000',
  credential: true
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// auth
app.use('/auth', auth);
// post
app.use('/post', post);


function compare(row){
  
}

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Run Server`);
});
