import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import getAllUsers from '../services/getAllUsers'
import { CircleUserRound } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setUsers, toggleSelection } from '@/redux/slices/newChatUsers';
import { NewChatUsersType } from '@/redux/slices/newChatUsers';


function UsersList() {
    const users = useSelector((state: RootState) => state.newChatUsers);
    const dispatch = useDispatch();

    React.useEffect(() => {
        //request all users from the server
        //will get array of objects: {id: string, userName: string}
        getAllUsers().then((usersList: NewChatUsersType[]) => {
            // Add isSelected property to each user object
            const usersWithSelection = usersList.map((user) => ({
                ...user,
                isSelected: false,
            }));
            dispatch(setUsers(usersWithSelection));
        });
    }, [dispatch]);

    const handleSelection = (user: NewChatUsersType) => {
        dispatch(toggleSelection(user.id))
    }

    return (
        <ScrollArea className="w-full h-[85%] flex flex-col justify-center items-center mt-[40px]">
            {users.map((user: NewChatUsersType) => (
                <div key={user.id} className='flex justify-between items-center bg-card border-b-4 border-background px-[20px] py-[10px] rounded-[20px]'>
                    <div className='flex justify-center items-center'>
                        <CircleUserRound size={50} />
                        <p className='text-[20px] bg-customGradient ml-[20px]'>{user.userName}</p>
                    </div>

                    <Checkbox
                        className='w-[30px] h-[30px]'
                        onCheckedChange={() => handleSelection(user)} />
                </div>
            ))}
        </ScrollArea>

    )
}

export default UsersList;