const { Sequelize, DataTypes, Model, DatabaseError } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB_TEST_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

async function test() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// the defined model is the class itself
// console.log(User === sequelize.models.User); // true

// async function createTable() {
//   await User.sync({ alter:true });
//   await Post.sync({ alter:true });
//   await Comment.sync({ alter:true });
//   await CommentLikes.sync({alter:true});
//   await Follow.sync({alter:true});
//   await PostLikes.sync({alter:true});
//   await Image.sync({alter:true});

//   console.log("All models were synchronized successfully.");
// }


// async function dropUserTable() {
//   await User.drop();
//   console.log("User table dropped!");
// }
// async function dropAll() {
//   await sequelize.drop();
//   console.log("All tables dropped!");
// }
// // dropAll();
// createTable();
// // console.log(sequelize.models);

module.exports = sequelize;