import socket from '@/lib/socket';
import { RootState } from '@/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';

interface MessageType {
    chatID: string;
    text: string;
    sender: string;
}

interface StorageType {
    chatID: string;
    messages: { sender: string, text: string }[];
}

function ChatMesseges() {
    const displayedRoom = useSelector((state: RootState) => state.displayedRoom);
    const user = useSelector((state: RootState) => state.user);
    const [allMessages, setAllMessages] = React.useState<MessageType[]>([]);
    const [displayedRoomMessages, setDisplayedRoomMessages] = React.useState<MessageType[]>([]);

    React.useEffect(() => {
        setDisplayedRoomMessages(allMessages.filter((msg) => msg.chatID === displayedRoom));
    }, [displayedRoom, allMessages]);

    React.useEffect(() => {
        // Listen for incoming chat messages
        socket.on('chatMessage', (msg: MessageType) => {
            setAllMessages((prevMessages) => [...prevMessages, msg]);
        });
        console.log(allMessages);

        return () => {
            socket.off('chatMessage');
        };
    }, [allMessages]);

    return (
        <div className='w-full h-full flex flex-col justify-end bg-card/30 px-[20px] py-[20px] rounded-[20px]'>
            {displayedRoomMessages.map((msg, index) => (
                msg.sender === user.userName ? (
                    <div key={index} className='w-full flex flex-row justify-end space-x-[10px]'>
                        <div className='flex flex-col items-end bg-card px-[20px] py-[10px] rounded-[20px] my-[5px]'>
                            <p className='text-[16px]'>{msg.sender}</p>
                            <p className='text-[20px] max-w-[400px] break-words '>{msg.text}</p>
                        </div>
                    </div>
                ) : (
                    <div key={index} className='w-full flex flex-row justify-start space-x-[10px]'>
                        <div className='flex flex-col items-start bg-card px-[20px] py-[10px] rounded-[20px] my-[5px]'>
                            <p className='text-[16px]'>{msg.sender}</p>
                            <p className='text-[20px] max-w-[400px] break-words '>{msg.text}</p>
                        </div>
                    </div>
                )
            ))}
        </div>
    )
}

export default ChatMesseges