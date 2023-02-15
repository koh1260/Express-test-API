const { Sequelize, DataTypes, Model, DatabaseError } = require("sequelize");
const dataTypes = require("sequelize/lib/data-types");
const { Post } = require("../post/models");
require("dotenv").config();
const sequelize = require("../sequelize/sequelize");

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
Follow.removeAttribute("id");

class Like extends Model {}
Like.init(
  {
    like: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    liked: {
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
    modelName: "Like",
    tableName: "like",
  }
);

// 1:N , User Post
User.hasMany(Post, {
  foreignKey: "userId",
  allowNull: false,
  onDelete: "cascade",
});
Post.belongsTo(User, {
  foreignKey: "userId",
});

// async function update(){
//   await User.sync({alter: true});
//   await Post.sync({alter: true});
// }
// update()

module.exports = {
  User,
  Follow,
};
