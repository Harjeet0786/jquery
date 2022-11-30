
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users')


// get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})
console.log("This is my username" + room)

const socket = io("http://localhost:3000/");

// socket.emit('message', "This is my message")


// Join chatroom
socket.emit('joinRoom', { username, room })

// get room and users

socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
})

// send message to server
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get message text
    const msg = e.target.elements.msg.value;

    outputMessage('outgoing', msg);


    // clear input 
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus();

    // emit mesage to server
    socket.emit('chatMessage', msg);



})

// output message to DOM

function outputMessage(type, message) {

    const div = document.createElement('div');
    // div.className = type
    div.classList.add(`${type}`);
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
                        <p class="text">
                            ${message.text}
                        </p>`
    document.querySelector('.chat-messages').appendChild(div)
}


function outputRoomName(room) {
    // roomName = document.getElementById("chat-form")
    roomName.innerText = room;
}

// add users to DOM

function outputUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}`;
}

// receive message from server
socket.on('message', message => {

    if (message.username != username) {
        outputMessage('incomming', message);
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
});