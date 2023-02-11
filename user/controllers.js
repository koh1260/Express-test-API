const {Follow} = require('./models');

// userId 받아서 팔로잉 검색
async function followingView(req, res){
    const userId = req.body.user_id;
    console.log(userId);
    const following = await Follow.findAll({
        attributes:['follower'],
        where: {
            following: userId
        }
    });
    console.log(JSON.stringify(following, null, 2));
    return (JSON.stringify(following, null, 2));
}

module.exports = {
    followingView, 
}