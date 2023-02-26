const { Op } = require('sequelize');
const db = require('../db/models/index');

async function userInfo(){
    const userId = 2;

    const post = await db.Post.findAll(
        {
            where: {
                userId: {
                    [Op.or]: [2]
                }
            }
        }
    )
    console.log(post);
}
  userInfo();