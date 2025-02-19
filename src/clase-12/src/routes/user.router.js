import express from "express";
import User from "../models/user.model.js";
import {userAddMiddleware, userEditMiddleware, userDeleteMiddleware} from "../middlewares/user.middleware.js";

const userRouter = express.Router();

userRouter.get("/", async (request, response) => {
    try{
        const users = await User.find();
        return response.status(200).send({
            status: 200,
            success: true,
            payload: users
        });
    }catch(error){
        response.status(500).send({
            status: 500,
            success: false,
            errors: [error.message()]
        });
    }
});

userRouter.put("/", userAddMiddleware, async (request,response) => {
    try{
        const {first_name, last_name, email} = request.body; 
        const user = await User.insertOne({
            first_name,
            last_name, 
            email
        });
        return response.status(201).send({
            success: true,
            status: 201,
            payload: user
        })
    }catch(error){
        response.status(500).send({
            status: 500,
            success: false,
            errors: [error.message]
        });
    }
});

userRouter.patch("/:id", userEditMiddleware, async (request,response) => {
    try{
        const {first_name, last_name, email} = request.body; 
        const {id} = request.params; 
        const user = await User.updateOne({_id: id},{
            first_name,
            last_name, 
            email
        });
        return response.status(200).send({
            success: true,
            status: 200,
            payload: user
        })
    }catch(error){
        response.status(500).send({
            status: 500,
            success: false,
            errors: [error.message]
        });
    }
});

userRouter.delete("/:id", userDeleteMiddleware, async (request,response) => {
    try{
        const {id} = request.params; 
        const user = await User.deleteOne({_id: id});
        const success = user.deletedCount == 1,
            status = success ? 200 : 500 ;
        return response.status(status).send({
            success,
            status
        })
    }catch(error){
        return response.status(500).send({
            status: 500,
            success: false,
            errors: [error.message]
        });
    }
});

export default userRouter;