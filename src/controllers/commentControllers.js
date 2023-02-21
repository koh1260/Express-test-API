const { _getIncludedAssociation } = require("sequelize/lib/model");
const { Comment } = require("./models");
const { User } = require("../user/models");

async function writingComment(req, res) {
  const userId = req.session.userId;
  const postId = req.body.postId;
  const content = req.body.content;
  const parentId = req.body.parentId;

  const comment = await Comment.create({
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
    const comment = await Comment.findAll({
      attributes: ["commentId", "content", "createAt", "parentId"],
      where:{
        postId: postId
      },
      include: {
        model: User,
        required: true,
      },
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