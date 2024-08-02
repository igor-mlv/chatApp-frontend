import { NewChatUsersType } from "@/redux/slices/newChatUsers";
import socket from "@/lib/socket";

// id: string,
// userName: string,
// isSelected?: boolean,
const createChat = async (users: NewChatUsersType[]) => {
    socket.emit('createChat', users);
}

export default createChat;