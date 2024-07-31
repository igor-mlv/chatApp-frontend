import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import getAllUsers from '../services/getAllUsers'
import { CircleUserRound } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"


interface UserType {
    id: string,
    userName: string,
    isSelected?: boolean,
}

function UsersList() {
    const [users, setUsers] = React.useState<UserType[]>([]);

    React.useEffect(() => {
        getAllUsers().then((usersList: UserType[]) => {
            // Add isSelected property to each user object
            const usersWithSelection = usersList.map((user) => ({
                ...user,
                isSelected: false,
            }));
            setUsers(usersWithSelection);
        });
    }, []);

    const handleSelection = (user: UserType) => {
        console.log(user);
        user.isSelected = !user.isSelected;
    }

    return (
        <ScrollArea className="w-full h-[85%] flex flex-col justify-center items-center mt-[40px]">
            {users.map((user: UserType) => (
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