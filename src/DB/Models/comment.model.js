import { DataTypes, Model } from "sequelize";
import sequelize from "../../DB/connection.js";
import User from "./user.model.js";
import Post from "./post.model.js";

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: "id"
    }
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  }

}, {
  sequelize,
  modelName: "Comment",
  timestamps: true
});

export default Comment;
