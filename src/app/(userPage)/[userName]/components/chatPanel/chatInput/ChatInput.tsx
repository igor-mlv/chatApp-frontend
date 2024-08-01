import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import socket from '@/lib/socket';
import { RootState } from '@/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';

function ChatInput() {
    const [typedValue, setTypedValue] = React.useState('');
    const handleOnChange = (event: { target: { value: string; }; }) => {
        setTypedValue(event.target.value);
    };

    const user = useSelector((state: RootState) => state.user);
    const displayedRoom = useSelector((state: RootState) => state.displayedRoom);

    const handleOnSend = () => {
        if (typedValue.trim()) {
            const messageData = {
                text: typedValue,
                sender: user.userName,
                chatID: displayedRoom,
            };
            // Send chat message
            socket.emit('chatMessage', messageData);
            setTypedValue('');
        }
    }
    return (
        <div className='w-full h-full flex flex-row justify-between items-center'>
            <Input
                placeholder="Type your message ..."
                value={typedValue}
                onChange={handleOnChange}
                className="w-full max-w-[600px] text-[18px]"
            />

            <Button className='w-[150px] text-[18px]'
                onClick={handleOnSend}>
                Send
            </Button>
        </div>
    )
}

export default ChatInput