const { Op } = require('sequelize');
const {Follow} = require('../user/models');



async function test() {
    const userId = 1;
    const following = await Follow.findAll(
        {
            attributes: ['follower',],
            where: {
                following: userId
            }
        }
    );
    console.log(JSON.stringify(following, null, 2));
}
