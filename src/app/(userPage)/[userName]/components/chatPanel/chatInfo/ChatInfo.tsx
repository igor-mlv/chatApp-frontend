import { RootState } from '@/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';
import { MessageCircleMore } from 'lucide-react';

function ChatInfo() {
    const displayedRoom = useSelector((state: RootState) => state.displayedRoom);
    return (
        <div className='w-full h-full flex justify-center items-center space-x-5'>
            <MessageCircleMore size={30} />
            <p className='text-[24px]'>{displayedRoom}</p>
        </div>
    )
}

export default ChatInfo