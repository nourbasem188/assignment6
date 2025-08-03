import Post from "../../DB/Models/post.model.js";
import User from "../../DB/Models/user.model.js";
import Comment from "../../DB/Models/comment.model.js";
import { Sequelize } from "sequelize";
export const createPost = async(data)=>{

    const post = new Post(data);

    await post.save();
    return post;
}   

export const deletePost = async(postId,userId)=>{

    const post = await Post.findByPk(postId);
    if(post.userId === userId){
        await post.destroy();
        return post;
    }else{
        throw new Error("You are not authorized to delete this post");
    }
}

export const retrivedInfo = async()=>{
    const info = await Post.findAll({
        attributes:["id","title"],
        include:[
            {
                "model":User,
                "attributes":["id","name"]
            },
            {
                "model":Comment,
                "attributes":["id","content"]
            }
        ]
    });

    return info;
}

export const commentCount = async()=>{
    const posts = await Post.findAll({
        attributes: {
          include: [
            [Sequelize.fn("COUNT", Sequelize.col("comments.id")), "commentCount"]
          ]
        },
        include: [
          {
            model: Comment,
            attributes: []
          }
        ],
        group: ["Post.id"]
      });
    
      return posts;
}