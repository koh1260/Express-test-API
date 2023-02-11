const {User} = require('./models');

async function login(req, res){
    const email = req.body.email;
    const password = req.body.password

    const user = await User.findAll(
        {
            raw: true,
            where: {
                email: email
            }
        }
    )
    if(user.length === 0) return res.status(404).send('아이디 없음');
    if(password !== user[0].password) return res.status(400).send('비밀번호 틀림');
    req.session.is_logined = true;
    req.session.nickname = user[0].nickname;
    return res.status(200).json({"userId" : user[0].userId});
}

module.exports = {
    login, 
}