import socket from '@/lib/socket';
import { RootState } from '@/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';

interface MessageType {
    chatID: string;
    text: string;
    sender: string;
}

function ChatMesseges() {
    // Get the current displayed chat room from the Redux store
    const displayedRoom = useSelector((state: RootState) => state.displayedRoom);

    // Get the current user information from the Redux store
    const user = useSelector((state: RootState) => state.user);

    // State to store all messages
    const [allMessages, setAllMessages] = React.useState<MessageType[]>([]);


    // State to store messages for the current chat room
    const [displayedRoomMessages, setDisplayedRoomMessages] = React.useState<MessageType[]>([]);

    // Update displayedRoomMessages when displayedRoom or allMessages changes
    React.useEffect(() => {
        setDisplayedRoomMessages(allMessages.filter((msg) => msg.chatID === displayedRoom));
    }, [displayedRoom, allMessages]);

    // Listen for new chat messages
    React.useEffect(() => {
        // Listen for incoming chat messages
        socket.on('chatMessage', (msg: MessageType) => {
            setAllMessages((prevMessages) => [...prevMessages, msg]);
        });

        // Cleanup listener on unmount
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