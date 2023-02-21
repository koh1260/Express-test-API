const Sequelize = require("sequelize");

class Image extends Sequelize.Model {
  static initiate(sequelize) {
    Image.init(
      {
        imageId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Image",
        tableName: "image",
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    );
  }
  static associate(db){
    db.Image.belongsTo(db.Post, {
        foreignKey: 'postId',
    })
  }
};
module.exports = Image;