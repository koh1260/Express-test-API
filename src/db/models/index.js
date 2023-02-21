'use strict';

const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Follow = require('./follow');
const Image = require('./image');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = User;
db.Post = Post;
db.Comment = Comment;
db.Follow = Follow;
db.Image = Image;

User.initiate(sequelize);
Post.initiate(sequelize);
Comment.initiate(sequelize);
Follow.initiate(sequelize);
Image.initiate(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
Image.associate(db);


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
