import express from "express";
import cors from "cors";
import router from "./routes/users.js";
const APP_PORT = 8080;
const APP_URL = `http://localhost:${APP_PORT}`;

const app = express();

var whitelist = ['http://localhost','http://localhost:8080', 'http://insignia.local','localhost','localhost:8080'];
var corsOptions = {
  // origin:  (origin, callback) => whitelist.indexOf(origin) !== -1 ? callback(null, true) : callback(new Error('Not allowed by CORS'))
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));



app.use("/api/users",router)

app.get("/time",(request, response) => {
    response.send(JSON.stringify({
        "time" : (new Date).toTimeString()
    }));
});

app.listen(APP_PORT, () => {
    console.log(`started at ${APP_URL}`);
});