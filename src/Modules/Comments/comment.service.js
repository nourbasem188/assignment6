import Comment from "../../DB/Models/comment.model.js";
import User from "../../DB/Models/user.model.js";
import Post from "../../DB/Models/post.model.js";
import { Op } from "sequelize";


export const createBulkComments = async(data)=>{
    const comment = await Comment.bulkCreate(data);
    return comment;
}

export const updatedComment = async (commentId,userId,{content})=>{
    const comment = await Comment.findByPk(commentId);

    if(comment.userId === userId){

        await comment.update({content});
        return comment;
    }else{
        throw new Error("You are not authorized to update this comment");
    }
}

export const findOrCreateComment = async (data) => {
    const [comment, created] = await Comment.findOrCreate({
      where: {
        userId: data.userId,
        postId: data.postId,
        content: data.content
      }
    });
  
    return { comment, created };
}

export const searchCommentsByWord = async (word) => {
  const result = await Comment.findAndCountAll({
    where: {
      content: {
        [Op.like]: `%${word}%`
      }
    }
  });

  return result;
};

export const retrivedComments = async(postId)=>{

    const comments = await Comment.findAll({
        where :{postId : postId},
        order : [["createdAt","desc"]],
        limit : 3
    });

    return comments;
}

export const getSpecificComment = async(commentId)=>{
    const comment = await Comment.findByPk(commentId,
        {include: [
            {
              model: User,
              attributes: ["id", "name", "email"]
            },
            {
              model: Post,
              attributes: ["id", "title", "content"]
            }
          ]}
    );
    return comment;
}