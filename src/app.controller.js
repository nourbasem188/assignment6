
import { connectDB, syncDB } from "./DB/connection.js";
import userRouter from "./Modules/User/user.controller.js";
import postRouter from "./Modules/Posts/post.controller.js";
import commentRouter from "./Modules/Comments/comment.controller.js";
import authRouter from "./Modules/Auth/auth.controller.js";
import User from "./DB/Models/user.model.js";
import Post from "./DB/Models/post.model.js";
import Comment from "./DB/Models/comment.model.js";

export const bootstrap = async (app, express) => {
    app.use(express.json());
    
    await connectDB();
    await syncDB();

    User.hasMany(Post,{foreignKey:"userId"});
    Post.belongsTo(User,{foreignKey:"userId"});
    
    Post.hasMany(Comment,{foreignKey:"postId"});
    Comment.belongsTo(Post,{foreignKey:"postId"});

    User.hasMany(Comment,{foreignKey:"userId"});
    Comment.belongsTo(User,{foreignKey:"userId"});

    app.use("/user", userRouter);
    app.use("/posts", postRouter);
    app.use("/comments", commentRouter);
    app.use("/auth", authRouter);
    
};
