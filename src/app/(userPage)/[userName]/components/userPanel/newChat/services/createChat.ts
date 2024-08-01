import { NewChatUsersType } from "@/redux/slices/newChatUsers";
import socket from "@/lib/socket";

// id: string,
// userName: string,
// isSelected?: boolean,
const createChat = async (users: NewChatUsersType[]) => {
    socket.emit('createChat', users);
    socket.on('joinChat', (chatId: string) => {
        console.log("it comes from io");
    });
}

export default createChat;