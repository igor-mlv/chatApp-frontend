import { RootState } from '@/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';
import { MessageCircleMore } from 'lucide-react';

function ChatInfo() {
    const displayedRoom = useSelector((state: RootState) => state.displayedRoom);

    const roomsDatabase = useSelector((state: RootState) => state.roomsDatabase);

    const currentUser = useSelector((state: RootState) => state.user);

    const handleRoomName = (room: string) => {
        const usersInCurrentRoom = roomsDatabase.find((roomData) => roomData.id === room)?.users;
        if (usersInCurrentRoom) {
            const roomName = usersInCurrentRoom.filter((user) => user !== currentUser.userName);
            return roomName.join(", ");
        }
    }
    return (
        <div className='w-full h-full flex justify-center items-center space-x-5'>
            <MessageCircleMore size={30} />
            <p className='text-[24px]'>{handleRoomName(displayedRoom)}</p>
        </div>
    )
}

export default ChatInfo