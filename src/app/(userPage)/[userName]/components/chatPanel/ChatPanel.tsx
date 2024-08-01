import React, { use } from 'react'
import ChatInfo from './chatInfo/ChatInfo'
import ChatMesseges from './chatMesseges/ChatMesseges'
import ChatInput from './chatInput/ChatInput'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

function ChatPanel() {
    const displayedRoom = useSelector((state: RootState) => state.displayedRoom);
    return (
        <>
            {displayedRoom !== '' ? (
                <div className='w-full h-full flex flex-col'>
                    <div className='h-[10%]'><ChatInfo /></div>
                    <div className='h-[80%]'><ChatMesseges /></div>
                    <div className='h-[10%]'><ChatInput /></div>
                </div>
            )
                :
                <div className='w-full h-full flex justify-center items-center'>
                    <p className='text-[20px]'>Pick Your Chat Room!</p>
                </div>}
        </>
    );
}

export default ChatPanel