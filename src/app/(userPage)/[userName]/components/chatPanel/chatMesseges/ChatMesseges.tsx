import socket from '@/lib/socket';
import { RootState } from '@/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';

interface Message {
    text: string;
    sender: string;
}

function ChatMesseges() {
    const user = useSelector((state: RootState) => state.user);
    const [messages, setMessages] = React.useState<Message[]>([]);

    React.useEffect(() => {
        // Listen for incoming chat messages
        socket.on('chatMessage', (msg: Message) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chatMessage');
        };
    }, []);

    return (
        <div className='w-full h-full flex flex-col justify-end bg-card/30 px-[20px] py-[20px] rounded-[20px]'>
            {messages.map((msg, index) => (
                msg.sender === user.userName ? (
                    <div key={index} className='w-full flex flex-row justify-end space-x-[10px]'>
                        <div className='flex flex-col items-end'>
                            <p className='text-[16px]'>{msg.sender}</p>
                            <p className='text-[20px]'>{msg.text}</p>
                        </div>
                    </div>
                ) : (
                    <div key={index} className='w-full flex flex-row justify-start space-x-[10px]'>
                        <div className='flex flex-col items-start'>
                            <p className='text-[16px]'>{msg.sender}</p>
                            <p className='text-[20px]'>{msg.text}</p>
                        </div>
                    </div>
                )
            ))}
        </div>
    )
}

export default ChatMesseges