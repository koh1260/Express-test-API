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

const {User, Follow} = require('../user/models');
const {Post} = require('../post/models');
console.log('sequelize User:',User);
console.log('sequelize Post:',Post);
// User.hasMany(Follow, {
//   foreignKey: 'following',
//   allowNull: false,
//   onDelete: 'cascade'
// });
// User.hasMany(Follow, {
//   foreignKey: 'follower',
//   allowNull: false,
//   onDelete: 'cascade'
// });
// Follow.belongsTo(User, {
//   foreignKey: 'following'
// });
// Follow.belongsTo(User, {
//   foreignKey: 'follower'
// });
// async function update(){
//   await User.sync();
//   await Follow.sync();
// }
// update()
// async function syncModel(){
//   await sequelize.sync({force:true});
// }
// syncModel();

module.exports = sequelize;