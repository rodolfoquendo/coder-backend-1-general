import express from "express";
import {engine} from "express-handlebars"
import router from "./routes/views.js"

const APP_PORT = 8080;
const APP_URL = `http://localhost:${APP_PORT}`;

const app = express();

app.use(express.json());
app.engine("handlebars",engine());
app.set("view engine", "handlebars");
app.set("views","./src/views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.use("/",router)


app.get("/time",(request, response) => {
    response.send(JSON.stringify({
        "time" : (new Date).toTimeString()
    }));
});

app.listen(APP_PORT, () => {
    console.log(`started at ${APP_URL}`);
});