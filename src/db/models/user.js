const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profileImage: {
        type: Sequelize.STRING,
      },      
    },
    {
      sequelize,
      createdAt: false,
      updatedAt: false,
      modelName: "User",
      tableName: "user",
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    }
    );
  }
  static associate(db){
    db.User.hasMany(db.Post, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      allowNull: false,
    });
    db.User.hasMany(db.Comment, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      allowNull: false
    })
    db.User.belongsToMany(db.Post, {
      through: 'postLike',
      foreignKey: 'userId'
    });
    db.User.belongsToMany(db.Comment, {
      through: 'commentLike',
      foreignKey: 'userId'
    });
  }
};

module.exports = User;