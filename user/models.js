const { Sequelize, DataTypes, Model, DatabaseError } = require("sequelize");
const dataTypes = require("sequelize/lib/data-types");
const { Post, PostLikes } = require("../post/models");
const {CommentLikes, Comment} = require('../comment/models');
require("dotenv").config();
const sequelize = require("../sequelize/sequelize");

console.log('users Post: ',Post);

class User extends Model {}
User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "User",
    tableName: "user",
  }
);

class Follow extends Model {}
Follow.init(
  {

  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "Follow",
    tableName: "follow",
  }
);
Follow.removeAttribute("id");


// 1:N , User Post

// User.hasMany(Comment, {
//   foreignKey: 'userId',
//   allowNull: false,
//   onDelete: 'cascade'
// });
// User.hasMany(CommentLikes, {
//   foreignKey: 'following',
//   allowNull:false,
//   onDelete: 'cascade'
// });
// User.hasMany(CommentLikes, {
//   foreignKey: 'follower',
//   allowNull:false,
//   onDelete: 'cascade'
// });
// User.hasMany(PostLikes, {
//   foreignKey: 'userId'
// });

// Post.belongsTo(User, {
//   foreignKey: "userId",
// });




module.exports = {
  User,
  Follow,
};
