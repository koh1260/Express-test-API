const { Post, Image } = require("./models");
const { Comment } = require("../comment/models");
const { User, Follow } = require("../user/models");
const { Op } = require("sequelize");
const { getListObjectValue } = require("./service");
const { sequelize } = require("sequelize/lib/model");

async function postsView(req, res) {
  if(!req.session.isLogined) return res.status(401).send('로그인 해');
  const userId = req.session.userId;

  try {
    const followingsObj = await Follow.findAll({
      attributes: ["follower"],
      where: {
        following: userId
      },
    });
    if (followingsObj.length === 0) return res.status(200).json([]);
    const followingsArray = followingsObj.map((follow) => follow.toJSON());
    const followings = getListObjectValue(followingsArray);
    const postsObject = await Post.findAll({
      where: {
        userId: {
          [Op.or]: followings,
        },
      },
      include: [
        { model: Image, required: true, attributes: ["imageUrl"] },
        { model: Comment },
        {
          model: User,
          required: true,
          attributes: ["userId", "nickname", "name", "profileImage"],
        },
      ],
    });
    const postsArray = postsObject.map((post) => post.toJSON());
    res.status(200).json(postsArray);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  postsView,
};
