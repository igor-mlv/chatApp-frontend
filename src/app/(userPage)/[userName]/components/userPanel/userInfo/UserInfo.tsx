import React from 'react'
import { SquareUserRound } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

function UserInfo() {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className='w-full h-full flex justify-center items-center space-x-5'>
            <SquareUserRound className='w-[30px] h-[30px]' />
            <p>{user.userName}</p>
        </div>
    )
}

export default UserInfo