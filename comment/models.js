const { Sequelize, DataTypes, Model, DatabaseError } = require("sequelize");
require("dotenv").config();
const sequelize = require('../sequelize/sequelize');
const User = require('../user/models');
const Post = require('../post/models');


class Comment extends Model{}
Comment.init(
  {
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'userId'
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: 'postId',
      }
    },
    content: {
      type:DataTypes.TEXT,
    },
    parentId: {
      type: DataTypes.INTEGER
    },
  },
  {
    sequelize,
    updatedAt:false,
    modelName: "Comment",
    tableName: "comment",
  }
)

class CommentLikes extends Model{}
CommentLikes.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Comment,
        key: "commentId",
      },
    },
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "CommentLikes",
    tableName: "commentLikes",
  }
);

CommentLikes.removeAttribute('id'); // id 삭제

module.exports = {
    Comment, 
}