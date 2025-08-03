import express from "express";
import { createBulkComments } from "./comment.service.js";
import { updatedComment } from "./comment.service.js";
import { findOrCreateComment } from "./comment.service.js";
import { searchCommentsByWord } from "./comment.service.js";
import { retrivedComments } from "./comment.service.js";
import { getSpecificComment } from "./comment.service.js";
const router = express.Router();

router.post("/",async(req,res)=>{
    try {

        const comment = await createBulkComments(req.body);

        return res.status(201).json({
            message:"Comments created successfully",
            data:comment
        })


    } catch (error) {
        return res.status(400).json({
            message:"Failed to create comments",
            error:error.message
        })
    }
})

router.patch("/:commentId",async(req,res)=>{

    try {
        const commentId = req.params.commentId;
        const { userId , content } = req.body;

        const updated = await updatedComment(commentId,userId,{content});

        return res.status(200).json({
            message:"Comment updated successfully",
            data:updated
        })
    } catch (error) {
        return res.status(400).json({
            message:"Failed to update comment",
            error:error.message
        })
    }
})

router.post("/find-or-create", async (req, res) => {
    try {
      const { userId, postId, content } = req.body;
  
      const { comment, created } = await findOrCreateComment({ userId, postId, content });
  
      res.status(created ? 201 : 200).json({
        message: created ? "Comment created" : "Comment already exists",
        data: comment
      });
  
    } catch (error) {
      res.status(400).json({
        message: "Failed to find or create comment",
        error: error.message
      });
    }
})

router.get("/search", async (req, res) => {
  try {
    const { word } = req.query;

    if (!word) {
      return res.status(400).json({ message: "You must provide a search word" });
    }

    const result = await searchCommentsByWord(word);

    res.status(200).json({
      message: "Comments retrieved successfully",
      count: result.count,
      data: result.rows
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to search comments",
      error: error.message
    });
  }
});

router.get("/retrive/:postId",async(req,res)=>{
    try {
        const postId = req.params.postId;
        const retrive3Comments = await retrivedComments(postId);

        return res.status(200).json({
            message:"Comments retrieved successfully",
            data:retrive3Comments
        })
    } catch (error) {
        return res.status(400).json({
            message:"Failed to retrieve comments",
            error:error.message
        })
    }
})

router.get("/specific/:id",async(req,res)=>{
    try {
        const commentId = req.params.id;
        const comment = await getSpecificComment(commentId)
        return res.status(200).json({
            message:"Comment retrieved successfully",
            data:comment
        })
    } catch (error) {
        return res.status(400).json({
            message:"Failed to retrieve comment",
            error:error.message
        })
    }
})
export default router;