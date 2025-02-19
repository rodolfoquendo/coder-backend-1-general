const socket = io();
const sender = document.getElementById('send'),
    input = document.getElementById('message'),
    holder = document.getElementById('messages');

socket.on("chat-response", (message) => {
    holder.innerHTML += `<li>${message.client_id}: ${message.message}</li>`;
})

sender.addEventListener('click',() => {
    if(input.value.length > 0){
        socket.emit("chat-message",{message: input.value});
        input.value = '';
    }
})