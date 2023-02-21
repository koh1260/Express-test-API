const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const auth = require('./router/auth');
const post = require('./router/post');
const comment = require('./router/comment');
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
require("dotenv").config();
const {sequelize} = require('./db/models');

sequelize.sync({force: false})
  .then(() => {
    console.log('연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });


const dbOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_TEST_NAME,
};

const sessionStore = new MySQLStore(dbOptions);

// use
// app.use(cookieParser());
app.use(express.static('uploads'));
app.use(
  session({
    key: "session_cookie_name",
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// // auth
// app.use('/auth', auth);
// // post
// app.use('/post', post);
// // comment
// app.use('/comment', comment);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Run Server`);
});
