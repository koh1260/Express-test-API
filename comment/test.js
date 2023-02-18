const Comment = require('./models');

function writingComment(){
    const userId = 6
    const postId = 1;
    const content = 'test'

    const comment = Comment.build(
        {
            commentId: 1,
            userId: userId,
            postId: postId,
            content: content
        }
    );
    console.log(comment);
}

writingComment();