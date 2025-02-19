const socket = io();
const chatWindow = document.getElementById('chat'),
    loginWindow = document.getElementById('login'),
    loginButton= document.getElementById('login-button'),
    usernameInput = document.getElementById('username'),
    sender = document.getElementById('send'),
    input = document.getElementById('message'),
    holder = document.getElementById('messages');
const toggleWindows = () => {
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
    loginWindow.style.display = loginWindow.style.display === 'none' ? 'block' : 'none';
}
const initChat = () => {
    if(localStorage.getItem('username') !== null){
        toggleWindows();
    }
}
loginButton.addEventListener('click', ()=>{
    if(loginButton.length == 0){
        return null;
    }
    localStorage.setItem('username', usernameInput.value);
    toggleWindows();
});
socket.on("chat-response", (message) => {
    holder.innerHTML += `<li>${message.username}: ${message.message}</li>`;
})

sender.addEventListener('click',() => {
    const username = localStorage.getItem('username');
    if(username === null){
        toggleWindows();
    }
    if(input.value.length > 0){
        socket.emit("chat-message",{
            message: input.value,
            username
        });
        input.value = '';
    }
})
sender.addEventListener('click',() => {
    if(input.value.length > 0){
        socket.emit("chat-message",{message: input.value});
        input.value = '';
    }
})

initChat();