// Import the socket.io-client library
import { io } from 'socket.io-client';

// Define the URL for the socket connection
const URL = process.env.SOCKET_URL || "http://localhost:3004";

// Create a socket instance with the specified URL and options
const socket = io(URL, {
    autoConnect: false // Disable automatic connection
});

// Set up an event listener for the "newChatCreated" event
socket.on("newChatCreated", (chatID: string) => {
    // When a new chat is created, emit a "joinChat" event with the chat ID
    socket.emit("joinChat", chatID);
});

export default socket;