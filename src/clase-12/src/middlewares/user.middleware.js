import express from "express";
import User from "../models/user.model.js";

const checkRequest = request => {
    const {first_name, last_name, email} = request.body;
    let errors = [];
    if(!first_name){
        errors.push("first_name is needed");
    }
    if(!last_name){
        errors.push("last_name is needed");
    }
    if(!email){
        errors.push("email is needed");
    }
    return errors;
}
export const userAddMiddleware = async (request, response, next) => {
    let errors = checkRequest(request);
    const {email} = request.body; 
    let userCheck = await User.findOne({email})
    if(userCheck !== null){
        errors.push("user already exists with that email");
    }
    if(errors.length > 0){
        return response.status(422).send({
            status: 422, 
            success: false, 
            errors
        });
    }
    next();
}

export const userEditMiddleware = async (request, response, next) => {
    let errors = checkRequest(request);
    const {email} = request.body,
        {id} = request.params; 
    let userCheckID = await User.findById(id);
    if(userCheckID === null){
        errors.push("user does not exists");
    }
    let userCheckEmail = await User.findOne({email});
    if(userCheckID !== null && userCheckEmail !== null &&  userCheckID.id !== userCheckEmail.id){
        errors.push(`user already exists with that email ${userCheckID.id} - ${userCheckEmail.id}`);
    }
    if(errors.length > 0){
        return response.status(422).send({
            status: 422, 
            success: false, 
            errors
        });
    }
    next();
}

export const userDeleteMiddleware = async (request, response, next) => {
    const {id} = request.params; 
    let userCheckID = await User.findById(id);
    if(userCheckID === null){
        return response.status(422).send({
            status: 422, 
            success: false, 
            errors : ["user does not exists"]
        });
    }
    next();
}
