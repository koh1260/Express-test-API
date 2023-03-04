const { Op } = require('sequelize');
const db = require('../db/models/index');

async function commentView() {
    const postId = 1;
  
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
        // 날짜로 정렬한 배열을 만들고
        // 정렬할 배열의 날짜와 그 날짜를 비교해서 같으면 해당 인덱스에 정렬할 배열의 데이터를 대입
        const comments = comment.map((comment) => comment.toJSON());
        comments.sort((a, b) => {
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }).reverse();

        for(let i =0; i < comments.length; i++){
            console.log(comments[i].createdAt);
        }
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  commentView();