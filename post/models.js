const { Sequelize, DataTypes, Model, DatabaseError } = require("sequelize");
require("dotenv").config();
const sequelize = require('../sequelize/sequelize');
const User = require('../user/models');


class Post extends Model {}
Post.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
      allowNull: false,
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
    imaeg_id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true,
    },
    postId: {
      type:DataTypes.INTEGER,
      references: {
        model: Post,
        key: 'postId',
      }
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

// async function test(){
//     const post = await Post.create(
//         {
//             userId: 1,
//             content: 'test'
//         }
//     );
//     console.log(post.toJSON());
// }
// test()

module.exports = Post;