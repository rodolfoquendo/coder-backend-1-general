import express from "express";
import http from "http";
import {engine} from "express-handlebars";
import {Server} from "socket.io";
import viewsRouter from "./routes/views.router.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const APP_PORT = 8080;

let messages = [];

let clients = {};

app.use(express.static("public"));
app.use(express.json());
app.engine("handlebars",engine());
app.set("view engine", "handlebars");
app.set("views","src/views");


app.use(express.static("public"));
app.use(express.json());
app.engine("handlebars",engine());
app.set("view engine", "handlebars");

app.use("/", viewsRouter);


io.on("connection", (socket) => {
    console.log(`connection has been made with id ${socket.id}`);
    messages.forEach(message => socket.emit("chat-response", message));
    socket.on("chat-message", (payload) => {
        let message = {
            message: payload.message,
            client_id : socket.id,
            username: payload.username
        };
        if(typeof clients[socket.id] === typeof undefined){
            clients[socket.id] = payload.username;
        }
        
        messages.push(message);
        io.emit("chat-response", message);
    });
    socket.on("disconnect", (reason) => {
        let message = {
            message: `disconnected because: ${reason}`,
            client_id : socket.id
        };

        if(typeof clients[socket.id] !== typeof undefined){
            message.username = clients[socket.id];
        }
        messages.push(message);
        io.emit("chat-response", message);
        
    })
});

server.listen(APP_PORT, ()=> {
    console.log("server started");
})