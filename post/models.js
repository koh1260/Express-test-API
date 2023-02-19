const { Sequelize, DataTypes, Model, DatabaseError } = require("sequelize");
const {User, Follow} = require('../user/models');
const {Comment, CommentLikes} = require('../comment/models');
require("dotenv").config();
const sequelize = require('../sequelize/sequelize');

console.log('posts User: ',User);
console.log('posts Comment: ',Comment);

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

// class Image extends Model{}
// Image.init(
//   {
//     // postId: {
//     //   type: DataTypes.INTEGER,
//     //   references: {
//     //     model: Post,
//     //     key: 'postId'
//     //   }
//     // },
//     imaegId: {
//       type:DataTypes.INTEGER,
//       primaryKey:true,
//       autoIncrement: true,
//     },
//     imageUrl: {
//       type: DataTypes.STRING,
//       allowNull:false,
//     },
//   },
//   {
//     sequelize,
//     createdAt:false,
//     updatedAt:false,
//     modelName: 'Image',
//     tableName: 'image',
//   }
// )

// class PostLikes extends Model{}
// PostLikes.init(
//   {
//     // userId: {
//     //   type: DataTypes.INTEGER,
//     //   references: {
//     //     model: User,
//     //     key: "userId",
//     //   },
//     // },
//     // postId: {
//     //   type: DataTypes.INTEGER,
//     //   references: {
//     //     model: Post,
//     //     key: "postId",
//     //   },
//     // },
//   },
//   {
//     sequelize,
//     createdAt: false,
//     updatedAt: false,
//     modelName: "PostLikes",
//     tableName: "postLikes",
//   }
// );
// PostLikes.removeAttribute('id'); // id 삭제

// // 1:N, Post Image
// Post.hasMany(Image, {
//     foreignKey: 'postId',
//     allowNull: false,
//     onDelete: 'cascade'
// });
// User.hasMany(Post, {
//   foreignKey: "userId",
//   allowNull: false,
//   onDelete: "cascade",
// });
// Post.belongsTo(User, {
//   foreignKey: 'userId'
// });
// PostLikes.belongsTo(User, {
//   foreignKey:'userId'
// });
// PostLikes.belongsTo(Post, {
//   foreignKey: 'postId'
// });

// Image.belongsTo(Post, {
//     foreignKey: 'postId'
// })

// 1:N, Post Comment
// Post.hasMany(Comment, {
//     foreignKey: 'postId',
//     allowNull: false,
//     onDelete: 'cascade'
// })




// async function update(){
//   await Post.sync({force: true});
//   // await PostLikes.sync({force: true});
// }
// update()

module.exports = {
    Post,
};