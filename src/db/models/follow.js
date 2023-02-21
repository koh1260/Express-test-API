const Sequelize = require("sequelize");
const User = require("./user");

class Follow extends Sequelize.Model {
  static initiate(sequelize) {
    Follow.init(
      {
        following: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'userId'
            }
        },
        follower: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'userId'
            }
        },
      },
      {
        sequelize,
        timestamps:false,
        modelName: "Follow",
        tableName: "follow",
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    );
  }
};

module.exports = Follow;