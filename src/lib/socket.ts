import { io } from 'socket.io-client';
const URL = "http://localhost:3001";

const socket = io(URL, {
    autoConnect: false
});

socket.on("newChatCreated", (chatID: string) => {
    socket.emit("joinChat", chatID);
});

export default socket;