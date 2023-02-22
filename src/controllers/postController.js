const Post = require('../db/models/post');
const Image = require('../db/models/image');
const Comment = require("../db/models/comment");
const User = require("../db/models/user");
const Follow = require('../db/models/follow');
const { Op } = require("sequelize");
const { getListObjectValue } = require("../service/postService");
require("dotenv").config();

async function postsView(req, res) {
  if (!req.session.isLogined) return res.status(401).send("로그인 해");
  const userId = req.session.userId;

  try {
    const followingsObj = await Follow.findAll({
      attributes: ["follower"],
      where: {
        following: userId,
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
// 게시글 생성
async function posting(req, res) {
  const userId = req.body.userId;
  const imageURL = `${process.env.BASE_URL}/${req.file.filename}`;
  const content = req.body.content;
  const post = await Post.create({
    userId: userId,
    content: content,
  });
  const image = await post.createImage({
    imageUrl: imageURL,
  });

  if (Object.keys(post).length === 0)
    return res.status(400).send("fail");
  return res.status(200).json(post.toJSON());
}

module.exports = {
  postsView,
  posting,
};
