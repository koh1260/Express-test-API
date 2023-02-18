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

async function signUp(){
    const email = 'asssssd@gmail.com';
    const nickname = 'elephant';

    const emailCheck = await User.findOne({where: {email: email}});// 빈 값이면 null 반환
    if(emailCheck) return res.status(400).send('이미 존재하는 아이디');
    const nicknameCheck = await User.findOne({where:{nickname: nickname}});
    if(nicknameCheck) return res.status(400).send('이미 존재하는 닉네임');
    const newUser = await User.create(
        {
            name: 'test',
            password: '1234',
            email: email,
            nickname: nickname,
        }
    )
    console.log('가입 성공');
    console.log(newUser);
}

async function userInfo(){
    const userId = 11;
    
    const userInfo = await User.findOne({where: {userId: userId}})
    if(!userInfo) return console.log('업셪ㅇ');
    console.log(userInfo);
}


// userInfo();