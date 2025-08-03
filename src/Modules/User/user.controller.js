import express from "express";
import { createUser } from "./user.service.js";
import { updateChecker } from "./user.service.js";
import { findUserByEmail } from "./user.service.js";
import { excludeRole } from "./user.service.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({
      message: "User created successfully",
      data: user
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create user",
      error: error.message
    });
  }
});


router.put("/:id",async(req,res)=>{
  try {
     
    const id = req.params.id;
    const data = req.body;

    const result = await updateChecker(id,data);

    return res.status(200).json({
      message:"User updated successfully",
      data:result
    })

  } catch (error) {
    return res.status(400).json({
      message:"Failed to update user",
      error:error.message
    })
  }
})


router.get("/email/:email",async(req,res)=>{

    try {
        const email = req.params.email;
        const result = await findUserByEmail(email);

        return res.status(200).json({
            message:"User found successfully",
            data:result
        })


    } catch (error) {
        return res.status(400).json({
            message:"Failed to find user",
            error:error.message
        })
    }

})
router.get("/excludeRole/:id",async(req,res)=>{

    try {
        
        const id = req.params.id;
        const result = await excludeRole(id);

        if(!result){
            return res.status(404).json({
                message:"User not found",
                error:"User not found"
            })
        }

        return res.status(200).json({
            message:"User found successfully",
            data:result
        })

    } catch (error) {
        return res.status(400).json({
            message:"Failed to find user",
            error:error.message
        })
    }

})
// نتةىةنم
export default router;
