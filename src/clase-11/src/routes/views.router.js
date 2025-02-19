import express from "express";

const viewsRouter = express.Router();

viewsRouter.get("/", (request, response) => {
    response.render("index", {
        title: "chat"
    });
});

export default viewsRouter;