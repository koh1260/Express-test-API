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
    req.session.user = {
        isLogined: true,
        email: email,
        nickname: user[0].nickname
    }
    req.session.save();
    console.log(req.session);
    return res.status(200).json({ userId: user[0].userId });
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

module.exports = {
  login,
  isLogined,
  signUp,
};
