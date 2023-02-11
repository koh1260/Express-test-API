const {User} = require('./models');

// findAll 데이터가 없으면 빈 배열 반환
async function login(){
    // const email = req.body.email;
    // const password = req.body.password
    const email = 'a001206@naver.com';
    const password = '1234';

    const user = await User.findAll(
        {
            raw: true,
            where: {
                email: email
            }
        }
    )
    if(user.length === 0) return console.log('아이디 없음');
    if(password !== user[0].password) return console.log('비밀번호 틀림');
    return console.log('로그인 성공');
}

login();