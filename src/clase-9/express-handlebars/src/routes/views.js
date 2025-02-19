import express from "express";

const router = express.Router();
let users = [
    {
        name: "Luz",
        email: "asd@asd.asd",
        isAdmin: true,
    },
    {
        name: "Rodo",
        email: "dsa@asd.asd",
        isAdmin: false
    },
];

router.get("/",(request, response) => {
    const random = Math.floor(Math.random() * users.length);
    const user = users[random];
    response.render("index", {user, random, users, title: "Home", layout: "main"}); //layout is not required, title is used in the layout and user in the view
});

router.put("/",(request, response) => {
    const {name,email} = request.body;
    users.push({name, email});
    response.status(201).send(users);
})
export default router;