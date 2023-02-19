const { Sequelize, DataTypes, Model, DatabaseError } = require("sequelize");
require("dotenv").config();
const sequelize = require('../sequelize/sequelize');
const {User} = require('../user/models');
const {Post} = require('../post/models');

console.log('comments Post: ', Post);
console.log('comments User: ', User);
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

// Comment.belongsTo(Post, {
//   foreignKey: 'postId'
// });
// Comment.belongsTo(User,{
//   foreignKey: 'userId'
// });
// Comment.hasMany(CommentLikes, {
//   foreignKey: 'commentId'
// });
// CommentLikes.belongsTo(User, {
//   foreignKey: 'userId'
// });
// CommentLikes.belongsTo(Comment, {
//   foreignKey: 'commentId'
// });

module.exports = {
    Comment, 
    CommentLikes
}