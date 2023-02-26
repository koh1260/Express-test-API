const Comment = require("../db/models/comment");
const User = require("../db/models/user");
const db = require("../db/models/index");

async function writingComment(req, res) {
  const userId = req.session.userId;
  const postId = req.body.postId;
  const content = req.body.content;
  const parentId = req.body.parentId;

  const comment = await db.Comment.create({
    userId: userId,
    postId: postId,
    content: content,
    parentId: parentId,
  });
  console.log(comment);
  return res.status(200).json(comment.toJSON());
}

async function commentView(req, res) {
  const postId = req.params.postId;

  try {
    const comment = await db.Comment.findAll({
      attributes: ["commentId", "content", "createdAt", "parentId"],
      where: {
        postId: postId,
      },
      include: [
        {
          model: db.User,
          attributes: ['nickname', 'profileImage'],
          required: true,
        },
      ],
    });
    return res.status(200).json(comment);
  } catch (err) {
    return res.status(500).send(err);
  }
}
module.exports = {
  writingComment,
  commentView,
};
