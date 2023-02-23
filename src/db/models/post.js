const Sequelize = require("sequelize");
const User = require("./user");

class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init(
      {
        postId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        content: {
          type: Sequelize.STRING,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: User
          }
        }
      },
      {
        sequelize,
        modelName: "Post",
        tableName: "post",
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    );
  }
  static associate(db){
    db.Post.belongsTo(db.User, {
        foreignKey: 'userId',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        allowNull:false
    });
    db.Post.hasMany(db.Comment, {
        foreignKey: 'postId',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
    db.Post.hasMany(db.Image, {
        foreignKey: 'postId',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
    db.Post.belongsToMany(db.User, {
        through: 'postLike',
        foreignKey: 'postId'
      });
  }
};
module.exports = Post;