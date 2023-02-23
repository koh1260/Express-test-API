const Sequelize = require("sequelize");

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init(
      {
        commentId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        //   userId
        //   postId
          content: {
            type:Sequelize.TEXT,
          },
          parentId: {
            type: Sequelize.INTEGER
          },
      },
      {
        sequelize,
        modelName: "Comment",
        tableName: "comment",
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    );
  }
  static associate(db){
    db.Comment.belongsTo(db.Post, {
        foreignKey: 'postId',
    });
    db.Comment.belongsTo(db.User, {
      foreignKey: 'userId'
    });
    db.Comment.belongsToMany(db.User, {
        through: 'commentLike',
        foreignKey: 'commentId'
      });
  }
};
module.exports = Comment;