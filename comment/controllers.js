const {Comment} = require('./models');

async function writingComment(req, res){
    const userId = req.session.userId;
    const postId = req.body.postId;
    const content = req.body.content;
    const parentId = req.body.parentId;

    const comment = await Comment.create(
        {
            userId: userId,
            postId: postId,
            content: content,
            parentId: parentId
        }
    );
    console.log(comment);
    return res.status(200).json(comment.toJSON());
}

module.exports = {
    writingComment,
}