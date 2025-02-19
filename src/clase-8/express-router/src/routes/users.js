import express from "express";
import fs from "fs";
import User from "../Services/User.js";
import uploader from "../Services/Files.js";

const router = express.Router();

const middlewarePutUser = (request,response, next) => {
    const {email, name, password} = request.body;
    if(!email || !name || !password) return response.status(422).send({
        error: "need more data"
    })
    let user = User.findByEmail(email);
    if(typeof user === typeof User){
        return response.status(422).send({
            error: "an user with that email already exists"
        });
    }
    next();
};

router.get("/",(request, response) => response.status(200).send(User.items));
router.put("/", middlewarePutUser, (request, response) => {
    const {email, name, password} = request.body;
    let user = new User(null, name, email,password);
    const success = user.save();
    return response.status(success ? 201 : 422).send(success ? User.findByEmail(email) : false)
});
router.put("/profile/image", uploader.single("file"), (request, response) => {
    if(!request.file){
        return response.status(422).send({
            error: "the image does not exists"
        });
    }
    return response.status(201).send(fs.existsSync("/img/" + request.file.originalname))
});

export default router;