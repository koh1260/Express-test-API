const { Sequelize, DataTypes, Model, DatabaseError } = require("sequelize");
const {User} = require('../user/models');
const {Comment} = require('../comment/models');
require("dotenv").config();
const sequelize = require('../sequelize/sequelize');


class Post extends Model {}
Post.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    updatedAt: false,
    modelName: "Post",
    tableName: "post",
  }
);

class Image extends Model{}
Image.init(
  {
    imaegId: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull:false,
    },
  },
  {
    sequelize,
    createdAt:false,
    updatedAt:false,
    modelName: 'Image',
    tableName: 'image',
  }
)

class PostLikes extends Model{}
PostLikes.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: "postId",
      },
    },
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "PostLikes",
    tableName: "postLikes",
  }
);
PostLikes.removeAttribute('id'); // id 삭제

// 1:N, Post Image
Post.hasMany(Image, {
    foreignKey: 'postId',
    allowNull: false,
    onDelete: 'cascade'
})
Image.belongsTo(Post, {
    foreignKey: 'postId'
})

// 1:N, Post Comment
Post.hasMany(Comment, {
    foreignKey: 'postId',
    allowNull: false,
    onDelete: 'cascade'
})
Comment.belongsTo(Post, {
    foreignKey: 'postId'
})

// async function update(){
//     await Post.sync({alter: true});
//     await Image.sync({alter: true});
// }
// update();

module.exports = {
    Post, Image
};