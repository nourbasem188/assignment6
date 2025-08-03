import { DataTypes, Model } from "sequelize";
import sequelize from "../../DB/connection.js";
import User from "./user.model.js";

class Post extends Model {}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false
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
  modelName: "Post",
  timestamps: true,
  paranoid: true
});

export default Post;
