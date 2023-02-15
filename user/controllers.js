const { User } = require("./models");
const bcrypt = require("bcrypt");

// 로그인
async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findAll({
      raw: true,
      where: {
        email: email,
      },
    });
    if (user.length === 0) return res.status(404).send("아이디 없음");
    if (!bcrypt.compareSync(password, user[0].password))
      return res.status(400).send("비밀번호 틀림");
    if (req.session.user === undefined) {
      req.session.isLogined = true;
      req.session.userId = user[0].userId;
    }
    req.session.save(() => {
      return res.status(200).send('로그인 성공');
    });
  } catch (err) {
    console.log(err);
  }
}

function isLogined(req, res, next) {
  return req.session.isLogined;
}

// 회원가입
async function signUp(req, res) {
  const body = req.body;
  const signUpData = {
    email: body.email,
    name: body.name,
    nickname: body.nickname,
    password: body.password,
    profileImage: body.profileImage,
  };

  try {
    const emailCheck = await User.findOne({
      where: { email: signUpData.email },
    }); // 빈 값이면 null 반환
    if (emailCheck) return res.status(400).send("이미 존재하는 아이디");
    const nicknameCheck = await User.findOne({
      where: { nickname: signUpData.nickname },
    });
    if (nicknameCheck) return res.status(400).send("이미 존재하는 닉네임");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(signUpData.password, salt);
    await User.create({
      email: signUpData.email,
      name: signUpData.name,
      nickname: signUpData.nickname,
      password: hash,
      profileImage: signUpData.profileImage,
    });
    return res.status(200).send(newUser);
  } catch (err) {
    console.log(err);
  }
}

// 로그아웃
function logout(req, res) {
    req.session.destroy((err) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send("세션 삭제 완료");
    });
}

// 단일 회원 정보 조회
async function loginedUserInfo(req, res){
  const userId = req.session.userId;
  
  const userInfo = await User.findOne({where: {userId: userId}})
  if(!userInfo) return res.status(404).send('존재하지 않는 정보');
  return res.status(200).json(userInfo.toJSON());
}

async function userInfo(req, res){
  const userId = req.session.userId;
  
  const userInfo = await User.findOne({where: {userId: userId}})
  if(!userInfo) return res.status(404).send('존재하지 않는 정보');
  return res.status(200).json(userInfo.toJSON());
}

async function userInfo(req, res){
  const userId = req.params.userId;

  const userInfo = await User.findOne({where: {userId: userId}});
  if(!userInfo) return res.status(404).send('존재하지 않는 정보');
  return res.status(200).json(userInfo.toJSON());
}

module.exports = {
  login,
  isLogined,
  signUp,
  logout,
  loginedUserInfo,
  userInfo,
};
