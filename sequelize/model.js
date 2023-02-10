const models = require("./sequelize");

// sequelize query test
async function createUser() {
  const hs = models.User.build({
    user_id: 2,
    name: "해성",
    email: "asd",
    nickname: "das",
    password: "asdasd",
  });

  console.log(hs.toJSON());
}

async function findAllUser() {
  const users = await models.User.findAll();
  console.log(users.every((user) => user instanceof models.User)); // true
  console.log("All users:", JSON.stringify(users, null, 2));
}

const {Op} = require('sequelize');

async function findUser() {
  const user = await models.User.findAll({
    attributes: ["email","name"], // 가져올 column
    where: {
      user_id: {
        [Op.or]: [3,4]
      }
    }
  });
  console.log(JSON.stringify(user, null, 2));
}
findUser();
