import React from 'react'
import UserInfo from './userInfo/UserInfo';
import Rooms from './rooms/Rooms';
import NewChat from './newChat/NewChat';

function UserPanel() {
    return (
        <div className='w-[60%] h-full flex flex-col'>
            <div className='h-[10%]'><UserInfo /></div>
            <div className='h-[80%]'><Rooms /></div>
            <div className='h-[10%]'><NewChat /></div>
        </div>
    )
}

export default UserPanel