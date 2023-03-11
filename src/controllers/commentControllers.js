const Comment = require("../db/models/comment");
const User = require("../db/models/user");
const db = require("../db/models/index");
const { count } = require("../db/models/comment");

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
    const comments = await db.Comment.findAll({
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
    const commentsList = comments.map((comment) => comment.toJSON());
    // 날짜 순으로 내림차순 정렬
    commentsList.sort((a, b) => {
        new Date(a.createdAt) - new Date(b.createdAt);
    }).reverse();

    return res.status(200).json(commentsList);
  } catch (err) {
    return res.status(500).send(err);
  }
}

async function commentCounts(req, res){
  const postId = req.params.postId;

  try{
    const count = await db.Comment.count({
      where: {postId: postId}
    });
    return res.status(200).json(count);
  }catch(err){
    console.log(err);
  }
}


module.exports = {
  writingComment,
  commentView,
  commentCounts
};
