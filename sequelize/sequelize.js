const { Sequelize, DataTypes, Model, DatabaseError } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB_TEST_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

async function test() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

class User extends Model {}
User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "User",
    tableName: "user",
  }
);

class Post extends Model {}
Post.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    updatedAt: false,
    modelName: "Post",
    tableName: "post",
  }
);

class Comment extends Model{}
Comment.init(
  {
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'userId'
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: 'postId',
      }
    },
    content: {
      type:DataTypes.TEXT,
    },
    parentId: {
      type: DataTypes.INTEGER
    },
  },
  {
    sequelize,
    updatedAt:false,
    modelName: "Comment",
    tableName: "comment",
  }
)

class CommentLikes extends Model{}
CommentLikes.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Comment,
        key: "commentId",
      },
    },
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "CommentLikes",
    tableName: "commentLikes",
  }
);
CommentLikes.removeAttribute('id'); // id 삭제

class Follow extends Model{}
Follow.init(
  {
    following: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    follower: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "Follow",
    tableName: "follow",
  }
);
Follow.removeAttribute('id');

class Image extends Model{}
Image.init(
  {
    imaeg_id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true,
    },
    postId: {
      type:DataTypes.INTEGER,
      references: {
        model: Post,
        key: 'postId',
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull:false,
    },
  },
  {
    sequelize,
    createdAt:false,
    updatedAt:false,
    modelName: 'Image',
    tableName: 'image',
  }
)

class PostLikes extends Model{}
PostLikes.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: "postId",
      },
    },
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: "PostLikes",
    tableName: "postLikes",
  }
);
PostLikes.removeAttribute('id'); // id 삭제

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

async function createTable() {
  await User.sync({ alter:true });
  await Post.sync({ alter:true });
  await Comment.sync({ alter:true });
  await CommentLikes.sync({alter:true});
  await Follow.sync({alter:true});
  await PostLikes.sync({alter:true});
  await Image.sync({alter:true});

  console.log("All models were synchronized successfully.");
}


async function dropUserTable() {
  await User.drop();
  console.log("User table dropped!");
}
async function dropAll() {
  await sequelize.drop();
  console.log("All tables dropped!");
}
// dropAll();
createTable();
// console.log(sequelize.models);

module.exports = sequelize.models;