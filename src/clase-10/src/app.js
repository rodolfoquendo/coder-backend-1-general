import express from "express";
import http from "http";
import {Server} from "socket.io";
import {engine} from "express-handlebars";

const app = express(),
    server = http.createServer(app),
    port = 8080,
    io = new Server(server);
let messages = [];
app.use(express.static("public"));
app.use(express.json());
app.engine("handlebars",engine());
app.set("view engine", "handlebars");
app.set("views","src/views");

app.get("/", (request, response) => {
    response.render("index",{
        title: "hola"
    });
})

io.on("connection", (socket) => {
    console.log(`connection has been made with id ${socket.id}`);
    messages.forEach(message => socket.emit("chat-response", message));
    io.emit("chat-response", {
        message: "connected",
        client_id : socket.id
    });
    socket.on("chat-message", (payload) => {
        let message = {
            message: payload.message,
            client_id : socket.id
        };
        messages.push(message);
        io.emit("chat-response", message);
    });
    socket.on("disconnect", (reason) => {
        let message = {
            message: `disconnected because: ${reason}`,
            client_id : socket.id
        };
        messages.push(message);
        io.emit("chat-response", message);
        
    })
});

server.listen(port, () => {
    console.log("server started");
})