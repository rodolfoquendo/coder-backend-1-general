import express from "express";
import cors from "cors";

import {router as userRouter} from "./routes/users.js"

const APP_PORT = 8080;
const APP_URL = `http://localhost:${APP_PORT}`;

const app = express();

var whitelist = ['http://localhost', 'http://insignia.local'];
var corsOptions = {
  origin:  (origin, callback) => whitelist.indexOf(origin) !== -1 ? callback(null, true) : callback(new Error('Not allowed by CORS'))
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.get("/",(request, response) => {
    response.send("hello world")
});

app.get("/test",(request, response) => {
    response.send(`<h1 style="color:blue">Hello world</h1>`);
});

app.get("/user/:id",(request, response) => {
    const id = request.params.id;
    const {name = null, email = null} = request.query;
    response.send(`<h1 style="color:blue">Hello ${id}, ${name !== null ? name : ''}</h1>`);
});

app.get("/time",(request, response) => {
    response.send(JSON.stringify({
        "time" : (new Date).toTimeString()
    }));
});

app.listen(APP_PORT, () => {
    console.log(`started at ${APP_URL}`);
});