import express from "express";
import { createPost } from "./post.service.js";
import { deletePost } from "./post.service.js";
import { retrivedInfo } from "./post.service.js";
import { commentCount } from "./post.service.js";
const router = express.Router();


router.post("/createpost",async(req,res)=>{
    try {
        
        const post = await createPost(req.body);

        return res.status(201).json({
            message:"Post created successfully",
            data:post
        })
    } catch (error) {
        return res.status(400).json({
            message:"Failed to create post",
            error:error.message
        })
    }
})

router.delete("/:id",async(req,res)=>{

    try {
        const postId = req.params.id;
        const userId = req.body.userId;
        const post = await deletePost(postId,userId);

        return res.status(200).json({
            message:"Post deleted successfully",
            data:post
        })
    } catch (error) {
        return res.status(400).json({
            message:"Failed to delete post",
            error:error.message
        })
    }
})

router.get("/allPosts",async(req,res)=>{
    
    try {
        const retriveAll = await retrivedInfo();

        return res.status(200).json({
            message:"Posts retrieved successfully",
            data:retriveAll
        })
    } catch (error) {
        return res.status(400).json({
            message:"Failed to retrieve posts",
            error:error.message
        })
    }
})

router.get("/comment-count",async(req,res)=>{
    try {
        const posts = await commentCount();
        return res.status(200).json({
            message:"Comment count retrieved successfully",
            data:posts
        })
    } catch (error) {
        return res.status(400).json({
            message:"Failed to retrieve comment count",
            error:error.message
        })
    }
})
export default router;