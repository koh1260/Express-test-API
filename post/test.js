const {Post, Image} = require("./models");
const {Comment} = require('../comment/models');
const {User, Follow } = require("../user/models");
const {Op} = require("sequelize");
const { getListObjectValue } = require("./service");
const { create } = require("sequelize/lib/model");

// async function postsView() {
//     const userId = 1
//     const followingsObj = await Follow.findAll({
//       attributes: ["follower"],
//       where: {
//         following: userId,
//       },
//     });
//     const followingsArray = followingsObj.map(follow => follow.toJSON());
//     const followings = getListObjectValue(followingsArray);
//     const postsObject = await Post.findAll({
//       where: {
//         userId: {
//           [Op.or]: followings,
//         },
//       },
//       include: [
//         { model: Image, required: true, attributes: ["imageUrl"] },
//         { model: Comment },
//         {
//           model: User,
//           required: true,
//           attributes: ["userId", "nickname", "name", "profileImage"],
//         },
//       ],
//     });
//     const postsArray = postsObject.map(post => post.toJSON());
//   }
  

  async function posting(){
    const userId = 6;
    const imageURL = 'asdasd';
    const content = 'test content';

    const post = Post.build({
      postId: 9,
      userId: userId,
      content: content,
      Image: [
        {imageUrl: imageURL}
      ]
    },{
      include: [Image],
    }
    )
    
    console.log(post);
  }

  // posting();