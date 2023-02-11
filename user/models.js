const { Sequelize, DataTypes, Model, DatabaseError } = require("sequelize");
const {Post} = require('../post/models');
require("dotenv").config();
const sequelize = require('../sequelize/sequelize');


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
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "User",
    tableName: "user",
  }
);

class Follow extends Model{}
Follow.init(
  {
    following: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    follower: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "Follow",
    tableName: "follow",
  }
);
Follow.removeAttribute('id');

User.hasMany(Post, {
  foreignKey: 'userId',
  allowNull: false,
  onDelete: 'cascade'
})
Post.belongsTo(User, {
  foreignKey: 'userId'
})

// async function update(){
//   await User.sync({alter: true});
//   await Post.sync({alter: true});
// }
// update()

module.exports = {
    User, Follow,
};