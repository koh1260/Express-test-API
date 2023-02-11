const {Post, Image} = require("./models");
const { Follow } = require("../user/models");
const {Op} = require("sequelize");
const { getListObjectValue } = require("./service");
// 유저 아이디 받음, 그 아이디로 팔로잉 검색, 팔로잉 의 게시물 전체 조회.

async function postsView(req, res) {
  const userId = req.body.user_id;
  const followingsObj = await Follow.findAll({
    attributes: ["follower"],
    where: {
      following: userId,
    },
  });
  const followingsArray = followingsObj.map(follow => follow.toJSON());
  const followings = getListObjectValue(followingsArray);
  const postsObject = await Post.findAll({
    where: {
      userId: {
        [Op.or]: followings,
      },
    },
    include: [
        {model:Image}
    ]
  });
  const postsArray = postsObject.map(post => post.toJSON());
  res.status(200).json(postsArray);
}

module.exports = {
  postsView,
};
